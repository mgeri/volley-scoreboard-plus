package main

import "github.com/mgeri/volley-scoreboard-plus/cmd"

//go:generate ./scripts/oapi-codegen-go.sh

func main() {
	cmd.Execute()
}
