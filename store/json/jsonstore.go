package jsonstore

import (
	"log"

	"github.com/mgeri/volley-scoreboard-plus/pkg/api"
	"github.com/mgeri/volley-scoreboard-plus/store"

	"github.com/schollz/jsonstore"
)

type jsonScoreboardStatusStore struct {
	ks       *jsonstore.JSONStore
	filename string
}

// NewJsonScoreboardStatusStore will create an object that represent the store.ScoreboardStatusStore interface
func NewJSONScoreboardStatusStore(filename string) store.ScoreboardStatusStore {
	var ks *jsonstore.JSONStore
	if filename != "" {
		var err error
		ks, err = jsonstore.Open(filename)
		if err != nil {
			log.Printf("Error opening JSON Scoreboard Status: %s", err)
		}
	}
	if ks == nil {
		ks = new(jsonstore.JSONStore)
		// create default
		//ks.Set("status", status)
	}

	return &jsonScoreboardStatusStore{ks, filename}
}

func (m *jsonScoreboardStatusStore) Get(status *api.ScoreboardStatus) error {
	return m.ks.Get("status", status)
}

func (m *jsonScoreboardStatusStore) Update(status *api.ScoreboardStatus) error {
	err := m.ks.Set("status", status)
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
}

// NewJsonScoreboardPrefsStore will create an object that represent the store.ScoreboardPrefsStore interface
func NewJSONScoreboardPrefsStore(filename string) store.ScoreboardPrefsStore {
	var ks *jsonstore.JSONStore
	if filename != "" {
		var err error
		ks, err = jsonstore.Open(filename)
		if err != nil {
			log.Printf("Error opening JSON Scoreboard Prefs: %s", err)
		}

	}
	if ks == nil {
		ks = new(jsonstore.JSONStore)
		// create default
		//ks.Set("status", status)
	}

	return &jsonScoreboardPrefsStore{ks, filename}
}

func (m *jsonScoreboardPrefsStore) Get(prefs *api.ScoreboardPrefs) error {
	return m.ks.Get("prefs", prefs)
}

func (m *jsonScoreboardPrefsStore) Update(prefs *api.ScoreboardPrefs) error {
	err := m.ks.Set("prefs", prefs)
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
