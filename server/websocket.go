package server

import (
	"encoding/json"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"

	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
)

const BroadcastStatus = "status"
const BroadcastPrefs = "prefs"

var (
	upgrader  = websocket.Upgrader{}
	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan string)
)

func (app *application) BroadcastStatusUpdate() {
	broadcast <- BroadcastStatus
}

func (app *application) BroadcastPrefsUpdate() {
	broadcast <- BroadcastPrefs
}

func (app *application) wsHandler(ctx echo.Context) error {

	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		ctx.Logger().Warnf("Error opening websocket: %v", err)
		return err
	}

	// register client
	clients[ws] = true

	return nil
}

func (app *application) wsBroadcast() {
	for {
		m := <-broadcast

		scoreboardMessage := new(api.ScoreboardMessage)

		switch m {
		case BroadcastStatus:
			scoreboardMessage.Status = new(api.ScoreboardStatus)
			if err := app.statusStore.Get(scoreboardMessage.Status); err != nil {
				app.logger.Warnf("Websocket JSON get status from store error: %v", err)
				continue
			}
		case BroadcastPrefs:
			scoreboardMessage.Prefs = new(api.ScoreboardPrefs)
			if err := app.prefsStore.Get(scoreboardMessage.Prefs); err != nil {
				app.logger.Warnf("Websocket JSON get prefs from store error: %v", err)
				continue
			}
		}

		b, err := json.Marshal(scoreboardMessage)
		if err != nil {
			app.logger.Warnf("Websocket JSON marshal error: %v", err)
			continue
		}

		// send to every client that is currently connected
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, b)
			if err != nil {
				app.logger.Warnf("Websocket error (closing): %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}

func (app *application) registerHandlersWS(router runtime.EchoRouter) {
	router.GET("/ws", app.wsHandler)
	go app.wsBroadcast()
}
