package server

import (
	"net/http"
	"strings"

	"github.com/labstack/gommon/log"
	"github.com/spf13/viper"
	"gopkg.in/natefinch/lumberjack.v2"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// ListenAndServe run Volley Scoreboard server
func ListenAndServe() {

	e := echo.New()

	// middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// log level
	switch strings.ToUpper(viper.GetString("logger.level")) {
	case "DEBUG":
		e.Logger.SetLevel(log.DEBUG)
	case "INFO":
		e.Logger.SetLevel(log.INFO)
	case "WARN":
		e.Logger.SetLevel(log.WARN)
	case "ERROR":
		e.Logger.SetLevel(log.ERROR)
	case "OFF":
		e.Logger.SetLevel(log.OFF)
	default:
		e.Logger.SetLevel(log.DEBUG)
	}

	// log file
	if viper.GetString("logger.file") != "" {
		logWriter := &lumberjack.Logger{
			Filename:   viper.GetString("logger.file"),
			MaxSize:    100, // megabytes
			MaxBackups: 3,
			MaxAge:     28, // days
		}
		e.Logger.SetOutput(logWriter)
	}

	// server address
	s := &http.Server{
		Addr: viper.GetString("server.address"),
	}

	// register handler
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})

	// start
	e.Logger.Fatal(e.StartServer(s))
}
