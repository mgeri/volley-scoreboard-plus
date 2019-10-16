package server

import (
	"net/http"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/spf13/viper"

	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
)

// RegisterHandlers adds each server route to the EchoRouter using JWT middleware when required
func (app *application) registerHandlersAPI(router runtime.EchoRouter) {
	wrapper := api.ServerInterfaceWrapper{
		Handler: app,
	}

	// if jwt is invalid return always 401
	jwtMiddleware := middleware.JWTWithConfig(middleware.JWTConfig{
		SigningKey: []byte(viper.GetString("server.jwtSigningKey")),
		ErrorHandlerWithContext: func(err error, ctx echo.Context) error {
			return ctx.NoContent(http.StatusUnauthorized)
		},
	})

	router.POST("/session", wrapper.SessionPost)
	router.GET("/ping", wrapper.PingGet)
	router.GET("/logo", wrapper.LogoGet)
	router.GET("/scoreboard/prefs", wrapper.ScoreboardPrefsGet)
	router.PUT("/scoreboard/prefs", wrapper.ScoreboardPrefsPut, jwtMiddleware)
	router.GET("/scoreboard/prefs/default", wrapper.ScoreboardPrefsDefaultGet)
	router.DELETE("/scoreboard/prefs", wrapper.ScoreboardPrefsDelete, jwtMiddleware)
	router.GET("/scoreboard/status", wrapper.ScoreboardStatusGet)
	router.PUT("/scoreboard/status", wrapper.ScoreboardStatusPut, jwtMiddleware)
}
