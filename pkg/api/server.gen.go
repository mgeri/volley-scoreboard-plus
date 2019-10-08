// Package api provides primitives to interact the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen DO NOT EDIT.
package api

import (
	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/labstack/echo/v4"
)

// ServerInterface represents all server handlers.
type ServerInterface interface {
	// Get the main logo image// (GET /logo)
	LogoGet(ctx echo.Context) error
	// Server heartbeat operation// (GET /ping)
	PingGet(ctx echo.Context) error
	// Return the scoreboard preferences (colors, team names).// (GET /scoreboard/prefs)
	ScoreboardPrefsGet(ctx echo.Context) error
	// Update scoreboard Prefs.// (PUT /scoreboard/prefs)
	ScoreboardPrefsPut(ctx echo.Context) error
	// Return the scoreboard status (points, set, timeouts).// (GET /scoreboard/status)
	ScoreboardStatusGet(ctx echo.Context) error
	// Update scoreboard status (points, set, timeouts).// (PUT /scoreboard/status)
	ScoreboardStatusPut(ctx echo.Context) error
	// Login by username and password returning session with JWT token.// (POST /session)
	SessionPost(ctx echo.Context) error
}

// ServerInterfaceWrapper converts echo contexts to parameters.
type ServerInterfaceWrapper struct {
	Handler ServerInterface
}

// LogoGet converts echo context to params.
func (w *ServerInterfaceWrapper) LogoGet(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.LogoGet(ctx)
	return err
}

// PingGet converts echo context to params.
func (w *ServerInterfaceWrapper) PingGet(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.PingGet(ctx)
	return err
}

// ScoreboardPrefsGet converts echo context to params.
func (w *ServerInterfaceWrapper) ScoreboardPrefsGet(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.ScoreboardPrefsGet(ctx)
	return err
}

// ScoreboardPrefsPut converts echo context to params.
func (w *ServerInterfaceWrapper) ScoreboardPrefsPut(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.ScoreboardPrefsPut(ctx)
	return err
}

// ScoreboardStatusGet converts echo context to params.
func (w *ServerInterfaceWrapper) ScoreboardStatusGet(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.ScoreboardStatusGet(ctx)
	return err
}

// ScoreboardStatusPut converts echo context to params.
func (w *ServerInterfaceWrapper) ScoreboardStatusPut(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.ScoreboardStatusPut(ctx)
	return err
}

// SessionPost converts echo context to params.
func (w *ServerInterfaceWrapper) SessionPost(ctx echo.Context) error {
	var err error

	// Invoke the callback with all the unmarshalled arguments
	err = w.Handler.SessionPost(ctx)
	return err
}

// RegisterHandlers adds each server route to the EchoRouter.
func RegisterHandlers(router runtime.EchoRouter, si ServerInterface) {

	wrapper := ServerInterfaceWrapper{
		Handler: si,
	}

	router.GET("/logo", wrapper.LogoGet)
	router.GET("/ping", wrapper.PingGet)
	router.GET("/scoreboard/prefs", wrapper.ScoreboardPrefsGet)
	router.PUT("/scoreboard/prefs", wrapper.ScoreboardPrefsPut)
	router.GET("/scoreboard/status", wrapper.ScoreboardStatusGet)
	router.PUT("/scoreboard/status", wrapper.ScoreboardStatusPut)
	router.POST("/session", wrapper.SessionPost)

}
