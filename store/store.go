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

func NewScoreboardStatus() *api.ScoreboardStatus {
	// default init to 0
	return &api.ScoreboardStatus{BallOwner: "none"}
}

func NewScoreboardPrefs() *api.ScoreboardPrefs {
	return &api.ScoreboardPrefs{
		Bg:             "#102030",
		Fg:             "#FFFFFF",
		ShowHeader:     true,
		SetName:        "Set",
		SetBg:          "#0B3060",
		SetFg:          "#FFFFFF",
		TimeoutName:    "Timeout",
		TimeoutBg:      "#FF0000",
		VideoCheckName: "Video Check",
		VideoCheckBg:   "#FF0000",
		PointBg:        "#0B3060",
		PointFg:        "#FFFFFF",
		HomeName:       "HOME",
		HomeBg:         "#10B090",
		HomeFg:         "#FFFFFF",
		AwayName:       "AWAY",
		AwayBg:         "#20C0F0",
		AwayFg:         "#EEFF88",
	}
}
