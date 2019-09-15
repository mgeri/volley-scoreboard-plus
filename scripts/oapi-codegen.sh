#!/bin/bash

go get github.com/deepmap/oapi-codegen/cmd/oapi-codegen
oapi-codegen --generate types --o ./pkg/api/types.gen.go --package api ./api/volleyscoreboard.yaml
oapi-codegen --generate server --o ./pkg/api/server.gen.go --package api ./api/volleyscoreboard.yaml
oapi-codegen --generate client --o ./pkg/api/client.gen.go --package api ./api/volleyscoreboard.yaml
