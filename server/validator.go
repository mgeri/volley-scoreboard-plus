package server

import (
	"github.com/mgeri/volley-scoreboard-plus/pkg/api"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

func ValidateScoreboardStatus(m *api.ScoreboardStatus) error {
	return validation.ValidateStruct(m,
		validation.Field(&m.Home.Points, validation.Min(0), validation.Max(99)),
		validation.Field(&m.Home.Sets, validation.Min(0), validation.Max(9)),
		validation.Field(&m.Home.Timeouts, validation.Min(0), validation.Max(2)),
		validation.Field(&m.Home.VideoChecks, validation.Min(0), validation.Max(2)),
		validation.Field(&m.Away.Points, validation.Min(0), validation.Max(99)),
		validation.Field(&m.Away.Sets, validation.Min(0), validation.Max(9)),
		validation.Field(&m.Away.Timeouts, validation.Min(0), validation.Max(2)),
		validation.Field(&m.Away.VideoChecks, validation.Min(0), validation.Max(2)),
	)
}

func ValidateScoreboardPrefs(m *api.ScoreboardPrefs) error {
	return validation.ValidateStruct(m,
		validation.Field(&m.Bg, validation.Required, is.HexColor),
		validation.Field(&m.Fg, validation.Required, is.HexColor),
		validation.Field(&m.SetName, validation.Required),
		validation.Field(&m.SetBg, validation.Required, is.HexColor),
		validation.Field(&m.SetFg, validation.Required, is.HexColor),
		validation.Field(&m.TimeoutName, validation.Required),
		validation.Field(&m.TimeoutBg, validation.Required, is.HexColor),
		validation.Field(&m.PointBg, validation.Required, is.HexColor),
		validation.Field(&m.PointFg, validation.Required, is.HexColor),
		validation.Field(&m.HomeName, validation.Required),
		validation.Field(&m.HomeBg, validation.Required, is.HexColor),
		validation.Field(&m.HomeFg, validation.Required, is.HexColor),
		validation.Field(&m.AwayName, validation.Required),
		validation.Field(&m.AwayBg, validation.Required, is.HexColor),
		validation.Field(&m.AwayFg, validation.Required, is.HexColor),
	)
}
