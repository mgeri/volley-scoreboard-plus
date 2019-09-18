package server

import (
	"github.com/mgeri/volley-scoreboard-plus/pkg/api"

	validation "github.com/go-ozzo/ozzo-validation"
	"github.com/go-ozzo/ozzo-validation/is"
)

func ValidateScoreboardTeamStatus(m *api.ScoreboardTeamStatus) error {
	return validation.ValidateStruct(m,
		validation.Field(&m.Points, validation.Min(0), validation.Max(99)),
		validation.Field(&m.Sets, validation.Min(0), validation.Max(9)),
		validation.Field(&m.Timeouts, validation.Min(0), validation.Max(2)),
		validation.Field(&m.VideoChecks, validation.Min(0), validation.Max(2)),
	)
}

func ValidateScoreboardStatus(m *api.ScoreboardStatus) error {
	if err := ValidateScoreboardTeamStatus(&m.Home); err != nil {
		return err
	}
	if err := ValidateScoreboardTeamStatus(&m.Away); err != nil {
		return err
	}
	return nil
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
