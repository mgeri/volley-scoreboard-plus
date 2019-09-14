package conf

import (
	"github.com/spf13/viper"
)

// Initialize defaults parameters values
var (
	_ = func() struct{} {
		// Logger Defaults
		viper.SetDefault("logger.level", "DEBUG")
		// if no file is specified, log on standard output
		viper.SetDefault("logger.file", "")

		// Pidfile
		viper.SetDefault("pidfile", "")

		// Server Configuration
		viper.SetDefault("server.address", ":4000")
		viper.SetDefault("server.webAppDir", "./web/bin")

		return struct{}{}
	}()
)
