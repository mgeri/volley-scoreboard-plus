package cmd

import (
	"fmt"

	"github.com/mgeri/volley-scoreboard-plus/conf"

	"github.com/spf13/cobra"
)

// Version command
func init() { // nolint: gochecknoinits
	rootCmd.AddCommand(&cobra.Command{
		Use:   "version",
		Short: "Show version",
		Long:  "Show version",
		Run: func(cmd *cobra.Command, args []string) {
			fmt.Println(conf.Executable + " - " + conf.Version)
		},
	})
}
