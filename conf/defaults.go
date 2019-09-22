package conf

import (
	"github.com/spf13/viper"
	"github.com/thanhpk/randstr"
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
		viper.SetDefault("server.username", "admin")
		viper.SetDefault("server.password", "*")
		viper.SetDefault("server.jwtSigningKey", randstr.String(1024))
		viper.SetDefault("server.webAppDir", "./web/dist/volley-gui")
		viper.SetDefault("server.storeDir", "./tmp")
		viper.SetDefault("server.debug", false)

		return struct{}{}
	}()
)
