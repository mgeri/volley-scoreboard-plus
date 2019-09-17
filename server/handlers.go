package server

import (
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/labstack/echo/v4"
	"github.com/spf13/viper"

	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
)

const SessionErrorCode = 10

// jwtCustomClaims are custom claims extending default ones.
type jwtCustomClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// Login by username and password returning session with JWT token.// (POST /session)
func (app *application) SessionPost(ctx echo.Context) error {

	c := new(api.Credentials)
	if err := ctx.Bind(c); err != nil {
		ctx.Logger().Warn("Error binding Creadentials")
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: SessionErrorCode, Subcode: 1,
			Message: "Invalid username or password"}})
	}

	if c.Username != viper.GetString("server.username") || c.Password != viper.GetString("server.password") {
		ctx.Logger().Warnf("Invalid username or password [%s][%s]", c.Username, c.Password)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: SessionErrorCode, Subcode: 1,
			Message: "Invalid username or password"}})
	}

	// Set custom claims
	claims := &jwtCustomClaims{
		c.Username,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 8).Unix(),
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Generate encoded token and send it as response.
	t, err := token.SignedString([]byte(viper.GetString("server.jwtSigningKey")))
	if err != nil {
		ctx.Logger().Errorf("JWT code generation error: %f", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: SessionErrorCode, Subcode: 2,
			Message: "Server error"}})
	}

	expireIn := int(time.Hour * 8 / time.Second)

	return ctx.JSON(http.StatusOK, api.Session{Username: c.Username, Token: t, ExpiresIn: &expireIn})
}

// Server heartbeat operation// (GET /ping)
func (app *application) PingGet(ctx echo.Context) error {
	return ctx.NoContent(http.StatusNoContent)
}

// Return the scoreboard status (points, set, timeouts).// (GET /scoreboard/status)
func (app *application) ScoreboardStatusGet(ctx echo.Context) error {
	var status = new(api.ScoreboardStatus)
	err := app.statusStore.Get(status)
	if err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, status)
}

// Update scoreboard status (points, set, timeouts).// (PUT /scoreboard/status)
func (app *application) ScoreboardStatusPut(ctx echo.Context) error {
	panic("not implemented")
}

// Return the scoreboard Prefs (colors, team names).// (GET /scoreboard/Prefs)
func (app *application) ScoreboardPrefsGet(ctx echo.Context) error {
	var prefs = new(api.ScoreboardPrefs)
	err := app.prefsStore.Get(prefs)
	if err != nil {
		return err
	}
	return ctx.JSON(http.StatusOK, prefs)
}

// Update scoreboard Prefs.// (PUT /scoreboard/Prefs)
func (app *application) ScoreboardPrefsPut(ctx echo.Context) error {
	panic("not implemented")
}
