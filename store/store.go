package store

import (
	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
)

// ScoreboardStatusStore is the persistent store of scoreboard status
type ScoreboardStatusStore interface {
	Update(status *api.ScoreboardStatus) error
	Get(status *api.ScoreboardStatus) error
}

// ScoreboardPrefsStore is the persistent store of scoreboard preferences
type ScoreboardPrefsStore interface {
	Update(prefs *api.ScoreboardPrefs) error
	Get(prefs *api.ScoreboardPrefs) error
}
