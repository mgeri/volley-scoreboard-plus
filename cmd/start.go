package cmd

import (
	"github.com/mgeri/volley-scoreboard-plus/conf"
	"github.com/mgeri/volley-scoreboard-plus/server"

	"github.com/spf13/cobra"
)

// Version command
func init() { // nolint: gochecknoinits
	rootCmd.AddCommand(&cobra.Command{
		Use:   "start",
		Short: "Start " + conf.Executable,
		Long:  "Start " + conf.Executable,
		Run: func(cmd *cobra.Command, args []string) {
			server.ListenAndServe()
		},
	})
}
