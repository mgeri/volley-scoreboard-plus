package cmd

import (
	"fmt"
	"os"
	"strings"

	"github.com/mgeri/volley-scoreboard-plus/conf"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

// Config and global logger
var configFile string
var pidFile string

// The Root Cobra Handler
var rootCmd = &cobra.Command{
	Version: conf.Version,
	Use:     conf.Executable,
	// Run: func(cmd *cobra.Command, args []string) {
	// 	server.ListenAndServe(&logger)
	// },
	PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
		// Create Pid File
		pidFile = viper.GetString("pidfile")
		if pidFile != "" {
			file, err := os.OpenFile(pidFile, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0666)
			if err != nil {
				return fmt.Errorf("could not create pid file: %s Error:%v", pidFile, err)
			}
			defer file.Close()
			_, err = fmt.Fprintf(file, "%d\n", os.Getpid())
			if err != nil {
				return fmt.Errorf("could not create pid file: %s Error:%v", pidFile, err)
			}
		}
		return nil
	},
	PersistentPostRun: func(cmd *cobra.Command, args []string) {
		// Remove Pid file
		if pidFile != "" {
			os.Remove(pidFile)
		}
	},
}

// This is the main initializer handling cli, config and log
func init() { // nolint: gochecknoinits
	// Initialize configuration
	cobra.OnInitialize(initConfig)
	rootCmd.PersistentFlags().StringVarP(&configFile, "config", "c", "", "Config file")
}

// Execute starts the program
func Execute() {
	// Run the program
	if err := rootCmd.Execute(); err != nil {
		fmt.Fprintf(os.Stderr, "%s\n", err.Error())
	}
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {

	// Sets up the config file, environment etc
	viper.SetEnvPrefix(strings.ToUpper(conf.Executable))
	// If a default value is []string{"a"} an environment variable of "a b" will end up []string{"a","b"}
	viper.SetTypeByDefaultValue(true)
	// Automatically use environment variables where available
	viper.AutomaticEnv()
	// Environment variables use underscores instead of periods
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	// If a config file is found, read it in.
	if configFile != "" {
		viper.SetConfigFile(configFile)
		err := viper.ReadInConfig()
		if err != nil {
			fmt.Fprintf(os.Stderr, "Could not read config file: %s ERROR: %s\n", configFile, err.Error())
			os.Exit(1)
		}
	} else {
		viper.SetConfigName("config")
		viper.AddConfigPath("./")
		viper.AddConfigPath("$HOME/." + conf.Executable)
		err := viper.ReadInConfig()
		if err != nil {
			fmt.Fprintf(os.Stdout, "Using default config values\n")
		}
	}

}
