#!/bin/bash

# requires GOOS and GOARCH parameter
if [ ${#@} == 0 ]; then
    echo "Usage: $0 GOOS GOARCH"
    echo "* GOOS: GOOS valid operating system"
    echo "* GOARCH: GOARCH valid architecture"
    echo ""
    echo "Sample for Raspberry Pi: $0 linux arm"
    exit 1
fi

# remove previous bin
rm -rf bin/$1-$2/scoreboard-plus

# create bin folder and bin binary
mkdir -p bin/$1-$2/scoreboard-plus
env GOOS=$1 GOARCH=$2 GOARM=7 go build -o bin/$1-$2/scoreboard-plus/scoreboard-plus

# data folder 
mkdir -p bin/$1-$2/scoreboard-plus/data

# log folder 
mkdir -p bin/$1-$2/scoreboard-plus/log

# conf file
mkdir -p bin/$1-$2/scoreboard-plus/conf
cp config.sample.yml ./bin/$1-$2/scoreboard-plus/conf/config.yml
cp build/tar/scoreboard-plus.service ./bin/$1-$2/scoreboard-plus/conf/scoreboard-plus.service

# logo file
cp logo.svg ./bin/$1-$2/scoreboard-plus/data/logo.svg

# build angular web ui
cd ./web
npm ci
npx ng build --prod
cp -R ./dist/volley-gui/ ../bin/$1-$2/scoreboard-plus/web/

# make tar gz
cd ..
cd bin
rm -f scoreboard-plus-$1-$2.tar.gz
tar -zcvf scoreboard-plus-$1-$2.tar.gz $1-$2/scoreboard-plus
cd ..



