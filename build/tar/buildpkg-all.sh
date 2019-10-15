#!/bin/bash

DIR="$(cd "$(dirname "$0")" && pwd)"

$DIR/buildpkg.sh linux arm
$DIR/buildpkg.sh linux amd64
$DIR/buildpkg.sh windows amd64
