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
const ScoreboardStatusErrorCode = 20
const ScoreboardPrefsErrorCode = 30

// jwtCustomClaims are custom claims extending default ones.
type jwtCustomClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// Login by username and password returning session with JWT token.// (POST /session)
func (app *application) SessionPost(ctx echo.Context) error {
	c := new(api.Credentials)
	if err := ctx.Bind(c); err != nil {
		ctx.Logger().Warnf("Error binding Creadentials: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: SessionErrorCode, Subcode: 1,
			Message: "Invalid username or password"}})
	}

	if (viper.GetString("server.username") != "" && c.Username != viper.GetString("server.username")) ||
		c.Password != viper.GetString("server.password") {
		ctx.Logger().Warnf("Invalid username or password [%s][%s]", c.Username, c.Password)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: SessionErrorCode, Subcode: 1,
			Message: "Invalid credetials"}})
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
		ctx.Logger().Errorf("JWT code generation error: %v", err)
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

func (app *application) LogoGet(ctx echo.Context) error {
	return ctx.File(viper.GetString("server.logoFile"))
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
	status := new(api.ScoreboardStatus)
	if err := ctx.Bind(status); err != nil {
		ctx.Logger().Warnf("Error binding ScoreboardStatus: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: ScoreboardStatusErrorCode, Subcode: 1,
			Message: "Invalid status"}})
	}

	if err := ValidateScoreboardStatus(status); err != nil {
		ctx.Logger().Warnf("Error validating ScoreboardStatus: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: ScoreboardStatusErrorCode, Subcode: 1,
			Message: err.Error()}})
	}

	if err := app.statusStore.Update(status); err != nil {
		ctx.Logger().Warnf("Error Updating ScoreboardStatus: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: ScoreboardStatusErrorCode, Subcode: 1,
			Message: err.Error()}})
	}

	// websocket broadcast
	app.BroadcastStatusUpdate()

	return ctx.JSON(http.StatusOK, status)

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
	prefs := new(api.ScoreboardPrefs)
	if err := ctx.Bind(prefs); err != nil {
		ctx.Logger().Warnf("Error binding ScoreboardPrefs: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: ScoreboardPrefsErrorCode, Subcode: 1,
			Message: "Invalid status"}})
	}

	if err := ValidateScoreboardPrefs(prefs); err != nil {
		ctx.Logger().Warnf("Error validating ScoreboardPrefs: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: ScoreboardPrefsErrorCode, Subcode: 1,
			Message: err.Error()}})
	}

	if err := app.prefsStore.Update(prefs); err != nil {
		ctx.Logger().Warnf("Error Updating ScoreboardPrefs: %v", err)
		return ctx.JSON(http.StatusBadRequest, api.ErrorResponse{Error: api.Error{Code: ScoreboardPrefsErrorCode, Subcode: 1,
			Message: err.Error()}})
	}

	// websocket broadcast
	app.BroadcastPrefsUpdate()

	return ctx.JSON(http.StatusOK, prefs)

}
