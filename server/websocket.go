package server

import (
	"encoding/json"
	"net/http"

	"github.com/deepmap/oapi-codegen/pkg/runtime"
	"github.com/gorilla/websocket"
	"github.com/labstack/echo/v4"

	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
)

const BroadcastStatus = "status"
const BroadcastPrefs = "prefs"

var (
	upgrader = websocket.Upgrader{
		//		ReadBufferSize:  1024,
		//		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
	clients   = make(map[*websocket.Conn]bool)
	broadcast = make(chan string)
	unicast   = make(chan *websocket.Conn)
	command   = make(chan *api.ScoreboardCommand)
)

func (app *application) BroadcastStatusUpdate() {
	broadcast <- BroadcastStatus
}

func (app *application) BroadcastPrefsUpdate() {
	broadcast <- BroadcastPrefs
}

func (app *application) BroadcastCommand(cmd *api.ScoreboardCommand) {
	command <- cmd
}

func (app *application) wsHandler(ctx echo.Context) error {
	ws, err := upgrader.Upgrade(ctx.Response(), ctx.Request(), nil)
	if err != nil {
		ctx.Logger().Warnf("Error opening websocket: %v", err)
		return err
	}

	ctx.Logger().Infof("New websocket from %v", ctx.Request().RemoteAddr)

	unicast <- ws

	return nil
}

func (app *application) wsService() {
	for {
		select {
		case m := <-broadcast:
			// broadcast to connected scoreboard
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
			for c := range clients {
				err := c.WriteMessage(websocket.TextMessage, b)
				if err != nil {
					app.logger.Warnf("Websocket error (closing): %v", err)
					c.Close()
					delete(clients, c)
				}
			}
		case c := <-command:
			// broadcast command to connected scoreboard
			scoreboardMessage := new(api.ScoreboardMessage)

			scoreboardMessage.Command = c

			b, err := json.Marshal(scoreboardMessage)
			if err != nil {
				app.logger.Warnf("Websocket JSON marshal error: %v", err)
				continue
			}

			// send to every client that is currently connected
			for c := range clients {
				err := c.WriteMessage(websocket.TextMessage, b)
				if err != nil {
					app.logger.Warnf("Websocket error (closing): %v", err)
					c.Close()
					delete(clients, c)
				}
			}
		case c := <-unicast:
			// send status and prefs to new conntected scoreboard
			clients[c] = true

			scoreboardMessage := new(api.ScoreboardMessage)

			scoreboardMessage.Status = new(api.ScoreboardStatus)
			if err := app.statusStore.Get(scoreboardMessage.Status); err != nil {
				app.logger.Warnf("Unicast Websocket JSON get status from store error: %v", err)
				continue
			}

			scoreboardMessage.Prefs = new(api.ScoreboardPrefs)
			if err := app.prefsStore.Get(scoreboardMessage.Prefs); err != nil {
				app.logger.Warnf("Unicast Websocket JSON get prefs from store error: %v", err)
				continue
			}

			b, err := json.Marshal(scoreboardMessage)
			if err != nil {
				app.logger.Warnf("Unicast Websocket JSON marshal error: %v", err)
				continue
			}

			err = c.WriteMessage(websocket.TextMessage, b)
			if err != nil {
				app.logger.Warnf("Unicast Websocket error (closing): %v", err)
				c.Close()
				delete(clients, c)
			}
		}
	}
}

func (app *application) registerHandlersWS(router runtime.EchoRouter) {
	router.GET("", app.wsHandler)

	go app.wsService()
}
