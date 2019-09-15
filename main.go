package main

import "github.com/mgeri/volley-scoreboard-plus/cmd"

//go:generate ./scripts/oapi-codegen.sh

func main() {
	cmd.Execute()
}
