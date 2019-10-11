package jsonstore

import (
	"path/filepath"

	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
	"github.com/mgeri/volley-scoreboard-plus/store"

	"github.com/labstack/echo"
	"github.com/schollz/jsonstore"
)

const statusKey = "status"
const prefsKey = "prefs"

type jsonScoreboardStatusStore struct {
	ks       *jsonstore.JSONStore
	filename string
	logger   echo.Logger
}

// NewJsonScoreboardStatusStore will create an object that represent the store.ScoreboardStatusStore interface
func NewJSONScoreboardStatusStore(storeDir string, logger echo.Logger) store.ScoreboardStatusStore {
	var filename string
	var ks *jsonstore.JSONStore

	if storeDir != "" {
		var err error

		filename = filepath.Join(storeDir, "status.json")
		ks, err = jsonstore.Open(filename)
		if err != nil {
			logger.Errorf("Error opening JSON Scoreboard Status: %s", err)
		}
	}
	if ks == nil {
		ks = new(jsonstore.JSONStore)
		// create default
		status := store.NewScoreboardStatus()
		err := ks.Set(statusKey, status)
		if err != nil {
			logger.Errorf("Error setting JSON Scoreboard Status: %s", err)
		}
	}

	logger.Infof("JSON Scoreboard Status init: %s", filename)

	return &jsonScoreboardStatusStore{ks, filename, logger}
}

func (m *jsonScoreboardStatusStore) Get(status *api.ScoreboardStatus) error {
	return m.ks.Get(statusKey, status)
}

func (m *jsonScoreboardStatusStore) Update(status *api.ScoreboardStatus) error {
	err := m.ks.Set(statusKey, status)
	if err != nil {
		return err
	}
	return m.save()
}

func (m *jsonScoreboardStatusStore) save() error {
	if m.filename != "" {
		return jsonstore.Save(m.ks, m.filename)
	}
	return nil
}

type jsonScoreboardPrefsStore struct {
	ks       *jsonstore.JSONStore
	filename string
	logger   echo.Logger
}

// NewJsonScoreboardPrefsStore will create an object that represent the store.ScoreboardPrefsStore interface
func NewJSONScoreboardPrefsStore(storeDir string, logger echo.Logger) store.ScoreboardPrefsStore {
	var filename string
	var ks *jsonstore.JSONStore

	if storeDir != "" {
		var err error

		filename = filepath.Join(storeDir, "prefs.json")

		ks, err = jsonstore.Open(filename)
		if err != nil {
			logger.Errorf("Error opening JSON Scoreboard Prefs: %s", err)
		}

	}
	if ks == nil {
		ks = new(jsonstore.JSONStore)

		// create default
		prefs := store.NewScoreboardPrefs()
		err := ks.Set(prefsKey, prefs)
		if err != nil {
			logger.Errorf("Error setting JSON Scoreboard Prefs: %s", err)
		}
	}

	logger.Infof("JSON Scoreboard Prefs init: %s", filename)

	return &jsonScoreboardPrefsStore{ks, filename, logger}
}

func (m *jsonScoreboardPrefsStore) Get(prefs *api.ScoreboardPrefs) error {
	return m.ks.Get(prefsKey, prefs)
}

func (m *jsonScoreboardPrefsStore) Update(prefs *api.ScoreboardPrefs) error {
	err := m.ks.Set(prefsKey, prefs)
	if err != nil {
		return err
	}
	return m.save()
}

func (m *jsonScoreboardPrefsStore) Reset() error {
	prefs := store.NewScoreboardPrefs()
	err := m.ks.Set(prefsKey, prefs)
	if err != nil {
		return err
	}
	return m.save()
}

func (m *jsonScoreboardPrefsStore) save() error {
	if m.filename != "" {
		return jsonstore.Save(m.ks, m.filename)
	}
	return nil
}
