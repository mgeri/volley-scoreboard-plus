// Package api provides primitives to interact the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen DO NOT EDIT.
package api

// Credentials defines model for Credentials.
type Credentials struct {
	Password string `json:"password"`
	Username string `json:"username"`
}

// Error defines model for Error.
type Error struct {
	Code     int     `json:"code"`
	Internal *string `json:"internal,omitempty"`
	Message  string  `json:"message"`
	Subcode  int     `json:"subcode"`
}

// ErrorResponse defines model for ErrorResponse.
type ErrorResponse struct {
	Error Error `json:"error"`
}

// ScoreboardMessage defines model for ScoreboardMessage.
type ScoreboardMessage struct {
	Prefs  *ScoreboardPrefs  `json:"prefs,omitempty"`
	Status *ScoreboardStatus `json:"status,omitempty"`
}

// ScoreboardPrefs defines model for ScoreboardPrefs.
type ScoreboardPrefs struct {
	AwayBg         string `json:"awayBg"`
	AwayFg         string `json:"awayFg"`
	AwayName       string `json:"awayName"`
	Bg             string `json:"bg"`
	Fg             string `json:"fg"`
	HomeBg         string `json:"homeBg"`
	HomeFg         string `json:"homeFg"`
	HomeName       string `json:"homeName"`
	PointBg        string `json:"pointBg"`
	PointFg        string `json:"pointFg"`
	SetBg          string `json:"setBg"`
	SetFg          string `json:"setFg"`
	SetName        string `json:"setName"`
	ShowHeader     bool   `json:"showHeader"`
	TimeoutBg      string `json:"timeoutBg"`
	TimeoutName    string `json:"timeoutName"`
	VideoCheckBg   string `json:"videoCheckBg"`
	VideoCheckName string `json:"videoCheckName"`
}

// ScoreboardStatus defines model for ScoreboardStatus.
type ScoreboardStatus struct {
	Away       ScoreboardTeamStatus `json:"away"`
	BallOwner  TeamBallOwner        `json:"ballOwner"`
	Home       ScoreboardTeamStatus `json:"home"`
	ShowWinner bool                 `json:"showWinner"`
}

// ScoreboardTeamStatus defines model for ScoreboardTeamStatus.
type ScoreboardTeamStatus struct {
	Points      int `json:"points"`
	Sets        int `json:"sets"`
	Timeouts    int `json:"timeouts"`
	VideoChecks int `json:"videoChecks"`
}

// Session defines model for Session.
type Session struct {
	ExpiresIn *int   `json:"expiresIn,omitempty"`
	Token     string `json:"token"`
	Username  string `json:"username"`
}

// TeamBallOwner defines model for TeamBallOwner.
type TeamBallOwner string

// scoreboardPrefsPutJSONBody defines parameters for ScoreboardPrefsPut.
type scoreboardPrefsPutJSONBody ScoreboardPrefs

// scoreboardStatusPutJSONBody defines parameters for ScoreboardStatusPut.
type scoreboardStatusPutJSONBody ScoreboardStatus

// sessionPostJSONBody defines parameters for SessionPost.
type sessionPostJSONBody Credentials

// ScoreboardPrefsPutRequestBody defines body for ScoreboardPrefsPut for application/json ContentType.
type ScoreboardPrefsPutJSONRequestBody scoreboardPrefsPutJSONBody

// ScoreboardStatusPutRequestBody defines body for ScoreboardStatusPut for application/json ContentType.
type ScoreboardStatusPutJSONRequestBody scoreboardStatusPutJSONBody

// SessionPostRequestBody defines body for SessionPost for application/json ContentType.
type SessionPostJSONRequestBody sessionPostJSONBody
