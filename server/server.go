package server

import (
	"net/http"
	"os"
	"strings"

	"github.com/mgeri/volley-scoreboard-plus/store"
	jsonstore "github.com/mgeri/volley-scoreboard-plus/store/json"

	"github.com/labstack/gommon/log"
	"github.com/spf13/viper"
	"gopkg.in/natefinch/lumberjack.v2"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type application struct {
	logger      echo.Logger
	statusStore store.ScoreboardStatusStore
	prefsStore  store.ScoreboardPrefsStore
}

func noContentEchoErrorHandler(err error, ctx echo.Context) {
	he, ok := err.(*echo.HTTPError)
	if ok {
		if he.Internal != nil {
			if herr, ok := he.Internal.(*echo.HTTPError); ok {
				he = herr
			}
		}
	} else {
		he = &echo.HTTPError{
			Code: http.StatusInternalServerError,
		}
	}

	// Send response
	if !ctx.Response().Committed {
		err = ctx.NoContent(he.Code)
		if err != nil {
			ctx.Logger().Error(err)
		}
	}
}

// ListenAndServe run Volley Scoreboard server
func ListenAndServe() {

	e := echo.New()

	// middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		//		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

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

	// check for debug mode
	e.Debug = viper.GetBool("server.debug")
	if !e.Debug {
		// custom error handler to avoid default echo JSON message response
		e.HTTPErrorHandler = noContentEchoErrorHandler
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

	storeDir := viper.GetString("server.storeDir")

	// create store dir if not exist
	if _, err := os.Stat(storeDir); os.IsNotExist(err) {
		err = os.MkdirAll(storeDir, os.ModePerm)
		if err != nil {
			e.Logger.Fatalf("Error creating store dir %s: %s", storeDir, err)
		}
	}

	// Initialize a new instance of application containing the dependencies.
	app := &application{
		logger:      e.Logger,
		statusStore: jsonstore.NewJSONScoreboardStatusStore(storeDir, e.Logger),
		prefsStore:  jsonstore.NewJSONScoreboardPrefsStore(storeDir, e.Logger),
	}

	// server address
	s := &http.Server{
		Addr: viper.GetString("server.address"),
	}

	// static web ui
	e.Static("/", viper.GetString("server.webAppDir"))

	// Register handlers
	app.registerHandlersAPI(e.Group("/api/v1"))
	app.registerHandlersWS(e.Group("/ws/v1"))

	// start
	e.Logger.Fatal(e.StartServer(s))
}
