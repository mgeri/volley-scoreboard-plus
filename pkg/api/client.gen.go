// Package api provides primitives to interact the openapi HTTP API.
//
// Code generated by github.com/deepmap/oapi-codegen DO NOT EDIT.
package api

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"net/url"
	"path"
	"strings"
)

// RequestEditorFn  is the function signature for the RequestEditor callback function
type RequestEditorFn func(req *http.Request, ctx context.Context) error

// Doer performs HTTP requests.
//
// The standard http.Client implements this interface.
type HttpRequestDoer interface {
	Do(req *http.Request) (*http.Response, error)
}

// Client which conforms to the OpenAPI3 specification for this service.
type Client struct {
	// The endpoint of the server conforming to this interface, with scheme,
	// https://api.deepmap.com for example.
	Server string

	// Doer for performing requests, typically a *http.Client with any
	// customized settings, such as certificate chains.
	Client HttpRequestDoer

	// A callback for modifying requests which are generated before sending over
	// the network.
	RequestEditor RequestEditorFn
}

// ClientOption allows setting custom parameters during construction
type ClientOption func(*Client) error

// Creates a new Client, with reasonable defaults
func NewClient(server string, opts ...ClientOption) (*Client, error) {
	// create a client with sane default values
	client := Client{
		Server: server,
	}
	// mutate client and add all optional params
	for _, o := range opts {
		if err := o(&client); err != nil {
			return nil, err
		}
	}
	// create httpClient, if not already present
	if client.Client == nil {
		client.Client = http.DefaultClient
	}
	return &client, nil
}

// WithHTTPClient allows overriding the default Doer, which is
// automatically created using http.Client. This is useful for tests.
func WithHTTPClient(doer HttpRequestDoer) ClientOption {
	return func(c *Client) error {
		c.Client = doer
		return nil
	}
}

// WithRequestEditorFn allows setting up a callback function, which will be
// called right before sending the request. This can be used to mutate the request.
func WithRequestEditorFn(fn RequestEditorFn) ClientOption {
	return func(c *Client) error {
		c.RequestEditor = fn
		return nil
	}
}

// The interface specification for the client above.
type ClientInterface interface {
	// LogoGet request
	LogoGet(ctx context.Context) (*http.Response, error)

	// PingGet request
	PingGet(ctx context.Context) (*http.Response, error)

	// ScoreboardCommandPost request  with any body
	ScoreboardCommandPostWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error)

	ScoreboardCommandPost(ctx context.Context, body ScoreboardCommandPostJSONRequestBody) (*http.Response, error)

	// ScoreboardPrefsDelete request
	ScoreboardPrefsDelete(ctx context.Context) (*http.Response, error)

	// ScoreboardPrefsGet request
	ScoreboardPrefsGet(ctx context.Context) (*http.Response, error)

	// ScoreboardPrefsPut request  with any body
	ScoreboardPrefsPutWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error)

	ScoreboardPrefsPut(ctx context.Context, body ScoreboardPrefsPutJSONRequestBody) (*http.Response, error)

	// ScoreboardPrefsDefaultGet request
	ScoreboardPrefsDefaultGet(ctx context.Context) (*http.Response, error)

	// ScoreboardStatusGet request
	ScoreboardStatusGet(ctx context.Context) (*http.Response, error)

	// ScoreboardStatusPut request  with any body
	ScoreboardStatusPutWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error)

	ScoreboardStatusPut(ctx context.Context, body ScoreboardStatusPutJSONRequestBody) (*http.Response, error)

	// SessionPost request  with any body
	SessionPostWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error)

	SessionPost(ctx context.Context, body SessionPostJSONRequestBody) (*http.Response, error)
}

func (c *Client) LogoGet(ctx context.Context) (*http.Response, error) {
	req, err := NewLogoGetRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) PingGet(ctx context.Context) (*http.Response, error) {
	req, err := NewPingGetRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardCommandPostWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error) {
	req, err := NewScoreboardCommandPostRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardCommandPost(ctx context.Context, body ScoreboardCommandPostJSONRequestBody) (*http.Response, error) {
	req, err := NewScoreboardCommandPostRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardPrefsDelete(ctx context.Context) (*http.Response, error) {
	req, err := NewScoreboardPrefsDeleteRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardPrefsGet(ctx context.Context) (*http.Response, error) {
	req, err := NewScoreboardPrefsGetRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardPrefsPutWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error) {
	req, err := NewScoreboardPrefsPutRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardPrefsPut(ctx context.Context, body ScoreboardPrefsPutJSONRequestBody) (*http.Response, error) {
	req, err := NewScoreboardPrefsPutRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardPrefsDefaultGet(ctx context.Context) (*http.Response, error) {
	req, err := NewScoreboardPrefsDefaultGetRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardStatusGet(ctx context.Context) (*http.Response, error) {
	req, err := NewScoreboardStatusGetRequest(c.Server)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardStatusPutWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error) {
	req, err := NewScoreboardStatusPutRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) ScoreboardStatusPut(ctx context.Context, body ScoreboardStatusPutJSONRequestBody) (*http.Response, error) {
	req, err := NewScoreboardStatusPutRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) SessionPostWithBody(ctx context.Context, contentType string, body io.Reader) (*http.Response, error) {
	req, err := NewSessionPostRequestWithBody(c.Server, contentType, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

func (c *Client) SessionPost(ctx context.Context, body SessionPostJSONRequestBody) (*http.Response, error) {
	req, err := NewSessionPostRequest(c.Server, body)
	if err != nil {
		return nil, err
	}
	req = req.WithContext(ctx)
	if c.RequestEditor != nil {
		err = c.RequestEditor(req, ctx)
		if err != nil {
			return nil, err
		}
	}
	return c.Client.Do(req)
}

// NewLogoGetRequest generates requests for LogoGet
func NewLogoGetRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/logo"))

	req, err := http.NewRequest("GET", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewPingGetRequest generates requests for PingGet
func NewPingGetRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/ping"))

	req, err := http.NewRequest("GET", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewScoreboardCommandPostRequest calls the generic ScoreboardCommandPost builder with application/json body
func NewScoreboardCommandPostRequest(server string, body ScoreboardCommandPostJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewScoreboardCommandPostRequestWithBody(server, "application/json", bodyReader)
}

// NewScoreboardCommandPostRequestWithBody generates requests for ScoreboardCommandPost with any type of body
func NewScoreboardCommandPostRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/command"))

	req, err := http.NewRequest("POST", queryUrl.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)
	return req, nil
}

// NewScoreboardPrefsDeleteRequest generates requests for ScoreboardPrefsDelete
func NewScoreboardPrefsDeleteRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/prefs"))

	req, err := http.NewRequest("DELETE", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewScoreboardPrefsGetRequest generates requests for ScoreboardPrefsGet
func NewScoreboardPrefsGetRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/prefs"))

	req, err := http.NewRequest("GET", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewScoreboardPrefsPutRequest calls the generic ScoreboardPrefsPut builder with application/json body
func NewScoreboardPrefsPutRequest(server string, body ScoreboardPrefsPutJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewScoreboardPrefsPutRequestWithBody(server, "application/json", bodyReader)
}

// NewScoreboardPrefsPutRequestWithBody generates requests for ScoreboardPrefsPut with any type of body
func NewScoreboardPrefsPutRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/prefs"))

	req, err := http.NewRequest("PUT", queryUrl.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)
	return req, nil
}

// NewScoreboardPrefsDefaultGetRequest generates requests for ScoreboardPrefsDefaultGet
func NewScoreboardPrefsDefaultGetRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/prefs/default"))

	req, err := http.NewRequest("GET", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewScoreboardStatusGetRequest generates requests for ScoreboardStatusGet
func NewScoreboardStatusGetRequest(server string) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/status"))

	req, err := http.NewRequest("GET", queryUrl.String(), nil)
	if err != nil {
		return nil, err
	}

	return req, nil
}

// NewScoreboardStatusPutRequest calls the generic ScoreboardStatusPut builder with application/json body
func NewScoreboardStatusPutRequest(server string, body ScoreboardStatusPutJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewScoreboardStatusPutRequestWithBody(server, "application/json", bodyReader)
}

// NewScoreboardStatusPutRequestWithBody generates requests for ScoreboardStatusPut with any type of body
func NewScoreboardStatusPutRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/scoreboard/status"))

	req, err := http.NewRequest("PUT", queryUrl.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)
	return req, nil
}

// NewSessionPostRequest calls the generic SessionPost builder with application/json body
func NewSessionPostRequest(server string, body SessionPostJSONRequestBody) (*http.Request, error) {
	var bodyReader io.Reader
	buf, err := json.Marshal(body)
	if err != nil {
		return nil, err
	}
	bodyReader = bytes.NewReader(buf)
	return NewSessionPostRequestWithBody(server, "application/json", bodyReader)
}

// NewSessionPostRequestWithBody generates requests for SessionPost with any type of body
func NewSessionPostRequestWithBody(server string, contentType string, body io.Reader) (*http.Request, error) {
	var err error

	queryUrl, err := url.Parse(server)
	if err != nil {
		return nil, err
	}
	queryUrl.Path = path.Join(queryUrl.Path, fmt.Sprintf("/session"))

	req, err := http.NewRequest("POST", queryUrl.String(), body)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", contentType)
	return req, nil
}

// ClientWithResponses builds on ClientInterface to offer response payloads
type ClientWithResponses struct {
	ClientInterface
}

// NewClientWithResponses creates a new ClientWithResponses, which wraps
// Client with return type handling
func NewClientWithResponses(server string, opts ...ClientOption) (*ClientWithResponses, error) {
	client, err := NewClient(server, opts...)
	if err != nil {
		return nil, err
	}
	return &ClientWithResponses{client}, nil
}

// WithBaseURL overrides the baseURL.
func WithBaseURL(baseURL string) ClientOption {
	return func(c *Client) error {
		if !strings.HasSuffix(baseURL, "/") {
			baseURL += "/"
		}
		newBaseURL, err := url.Parse(baseURL)
		if err != nil {
			return err
		}
		c.Server = newBaseURL.String()
		return nil
	}
}

type logoGetResponse struct {
	Body         []byte
	HTTPResponse *http.Response
}

// Status returns HTTPResponse.Status
func (r logoGetResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r logoGetResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type pingGetResponse struct {
	Body         []byte
	HTTPResponse *http.Response
}

// Status returns HTTPResponse.Status
func (r pingGetResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r pingGetResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardCommandPostResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON400      *ErrorResponse
}

// Status returns HTTPResponse.Status
func (r scoreboardCommandPostResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardCommandPostResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardPrefsDeleteResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *ScoreboardPrefs
}

// Status returns HTTPResponse.Status
func (r scoreboardPrefsDeleteResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardPrefsDeleteResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardPrefsGetResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *ScoreboardPrefs
}

// Status returns HTTPResponse.Status
func (r scoreboardPrefsGetResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardPrefsGetResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardPrefsPutResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *ScoreboardPrefs
	JSON400      *ErrorResponse
}

// Status returns HTTPResponse.Status
func (r scoreboardPrefsPutResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardPrefsPutResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardPrefsDefaultGetResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *ScoreboardPrefs
}

// Status returns HTTPResponse.Status
func (r scoreboardPrefsDefaultGetResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardPrefsDefaultGetResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardStatusGetResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *ScoreboardStatus
}

// Status returns HTTPResponse.Status
func (r scoreboardStatusGetResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardStatusGetResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type scoreboardStatusPutResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON200      *ScoreboardStatus
	JSON400      *ErrorResponse
}

// Status returns HTTPResponse.Status
func (r scoreboardStatusPutResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r scoreboardStatusPutResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

type sessionPostResponse struct {
	Body         []byte
	HTTPResponse *http.Response
	JSON201      *Session
	JSON400      *ErrorResponse
}

// Status returns HTTPResponse.Status
func (r sessionPostResponse) Status() string {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.Status
	}
	return http.StatusText(0)
}

// StatusCode returns HTTPResponse.StatusCode
func (r sessionPostResponse) StatusCode() int {
	if r.HTTPResponse != nil {
		return r.HTTPResponse.StatusCode
	}
	return 0
}

// LogoGetWithResponse request returning *LogoGetResponse
func (c *ClientWithResponses) LogoGetWithResponse(ctx context.Context) (*logoGetResponse, error) {
	rsp, err := c.LogoGet(ctx)
	if err != nil {
		return nil, err
	}
	return ParselogoGetResponse(rsp)
}

// PingGetWithResponse request returning *PingGetResponse
func (c *ClientWithResponses) PingGetWithResponse(ctx context.Context) (*pingGetResponse, error) {
	rsp, err := c.PingGet(ctx)
	if err != nil {
		return nil, err
	}
	return ParsepingGetResponse(rsp)
}

// ScoreboardCommandPostWithBodyWithResponse request with arbitrary body returning *ScoreboardCommandPostResponse
func (c *ClientWithResponses) ScoreboardCommandPostWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*scoreboardCommandPostResponse, error) {
	rsp, err := c.ScoreboardCommandPostWithBody(ctx, contentType, body)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardCommandPostResponse(rsp)
}

func (c *ClientWithResponses) ScoreboardCommandPostWithResponse(ctx context.Context, body ScoreboardCommandPostJSONRequestBody) (*scoreboardCommandPostResponse, error) {
	rsp, err := c.ScoreboardCommandPost(ctx, body)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardCommandPostResponse(rsp)
}

// ScoreboardPrefsDeleteWithResponse request returning *ScoreboardPrefsDeleteResponse
func (c *ClientWithResponses) ScoreboardPrefsDeleteWithResponse(ctx context.Context) (*scoreboardPrefsDeleteResponse, error) {
	rsp, err := c.ScoreboardPrefsDelete(ctx)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardPrefsDeleteResponse(rsp)
}

// ScoreboardPrefsGetWithResponse request returning *ScoreboardPrefsGetResponse
func (c *ClientWithResponses) ScoreboardPrefsGetWithResponse(ctx context.Context) (*scoreboardPrefsGetResponse, error) {
	rsp, err := c.ScoreboardPrefsGet(ctx)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardPrefsGetResponse(rsp)
}

// ScoreboardPrefsPutWithBodyWithResponse request with arbitrary body returning *ScoreboardPrefsPutResponse
func (c *ClientWithResponses) ScoreboardPrefsPutWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*scoreboardPrefsPutResponse, error) {
	rsp, err := c.ScoreboardPrefsPutWithBody(ctx, contentType, body)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardPrefsPutResponse(rsp)
}

func (c *ClientWithResponses) ScoreboardPrefsPutWithResponse(ctx context.Context, body ScoreboardPrefsPutJSONRequestBody) (*scoreboardPrefsPutResponse, error) {
	rsp, err := c.ScoreboardPrefsPut(ctx, body)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardPrefsPutResponse(rsp)
}

// ScoreboardPrefsDefaultGetWithResponse request returning *ScoreboardPrefsDefaultGetResponse
func (c *ClientWithResponses) ScoreboardPrefsDefaultGetWithResponse(ctx context.Context) (*scoreboardPrefsDefaultGetResponse, error) {
	rsp, err := c.ScoreboardPrefsDefaultGet(ctx)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardPrefsDefaultGetResponse(rsp)
}

// ScoreboardStatusGetWithResponse request returning *ScoreboardStatusGetResponse
func (c *ClientWithResponses) ScoreboardStatusGetWithResponse(ctx context.Context) (*scoreboardStatusGetResponse, error) {
	rsp, err := c.ScoreboardStatusGet(ctx)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardStatusGetResponse(rsp)
}

// ScoreboardStatusPutWithBodyWithResponse request with arbitrary body returning *ScoreboardStatusPutResponse
func (c *ClientWithResponses) ScoreboardStatusPutWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*scoreboardStatusPutResponse, error) {
	rsp, err := c.ScoreboardStatusPutWithBody(ctx, contentType, body)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardStatusPutResponse(rsp)
}

func (c *ClientWithResponses) ScoreboardStatusPutWithResponse(ctx context.Context, body ScoreboardStatusPutJSONRequestBody) (*scoreboardStatusPutResponse, error) {
	rsp, err := c.ScoreboardStatusPut(ctx, body)
	if err != nil {
		return nil, err
	}
	return ParsescoreboardStatusPutResponse(rsp)
}

// SessionPostWithBodyWithResponse request with arbitrary body returning *SessionPostResponse
func (c *ClientWithResponses) SessionPostWithBodyWithResponse(ctx context.Context, contentType string, body io.Reader) (*sessionPostResponse, error) {
	rsp, err := c.SessionPostWithBody(ctx, contentType, body)
	if err != nil {
		return nil, err
	}
	return ParsesessionPostResponse(rsp)
}

func (c *ClientWithResponses) SessionPostWithResponse(ctx context.Context, body SessionPostJSONRequestBody) (*sessionPostResponse, error) {
	rsp, err := c.SessionPost(ctx, body)
	if err != nil {
		return nil, err
	}
	return ParsesessionPostResponse(rsp)
}

// ParselogoGetResponse parses an HTTP response from a LogoGetWithResponse call
func ParselogoGetResponse(rsp *http.Response) (*logoGetResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &logoGetResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	}

	return response, nil
}

// ParsepingGetResponse parses an HTTP response from a PingGetWithResponse call
func ParsepingGetResponse(rsp *http.Response) (*pingGetResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &pingGetResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	}

	return response, nil
}

// ParsescoreboardCommandPostResponse parses an HTTP response from a ScoreboardCommandPostWithResponse call
func ParsescoreboardCommandPostResponse(rsp *http.Response) (*scoreboardCommandPostResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardCommandPostResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 400:
		response.JSON400 = &ErrorResponse{}
		if err := json.Unmarshal(bodyBytes, response.JSON400); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsescoreboardPrefsDeleteResponse parses an HTTP response from a ScoreboardPrefsDeleteWithResponse call
func ParsescoreboardPrefsDeleteResponse(rsp *http.Response) (*scoreboardPrefsDeleteResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardPrefsDeleteResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		response.JSON200 = &ScoreboardPrefs{}
		if err := json.Unmarshal(bodyBytes, response.JSON200); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsescoreboardPrefsGetResponse parses an HTTP response from a ScoreboardPrefsGetWithResponse call
func ParsescoreboardPrefsGetResponse(rsp *http.Response) (*scoreboardPrefsGetResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardPrefsGetResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		response.JSON200 = &ScoreboardPrefs{}
		if err := json.Unmarshal(bodyBytes, response.JSON200); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsescoreboardPrefsPutResponse parses an HTTP response from a ScoreboardPrefsPutWithResponse call
func ParsescoreboardPrefsPutResponse(rsp *http.Response) (*scoreboardPrefsPutResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardPrefsPutResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		response.JSON200 = &ScoreboardPrefs{}
		if err := json.Unmarshal(bodyBytes, response.JSON200); err != nil {
			return nil, err
		}

	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 400:
		response.JSON400 = &ErrorResponse{}
		if err := json.Unmarshal(bodyBytes, response.JSON400); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsescoreboardPrefsDefaultGetResponse parses an HTTP response from a ScoreboardPrefsDefaultGetWithResponse call
func ParsescoreboardPrefsDefaultGetResponse(rsp *http.Response) (*scoreboardPrefsDefaultGetResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardPrefsDefaultGetResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		response.JSON200 = &ScoreboardPrefs{}
		if err := json.Unmarshal(bodyBytes, response.JSON200); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsescoreboardStatusGetResponse parses an HTTP response from a ScoreboardStatusGetWithResponse call
func ParsescoreboardStatusGetResponse(rsp *http.Response) (*scoreboardStatusGetResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardStatusGetResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		response.JSON200 = &ScoreboardStatus{}
		if err := json.Unmarshal(bodyBytes, response.JSON200); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsescoreboardStatusPutResponse parses an HTTP response from a ScoreboardStatusPutWithResponse call
func ParsescoreboardStatusPutResponse(rsp *http.Response) (*scoreboardStatusPutResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &scoreboardStatusPutResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 200:
		response.JSON200 = &ScoreboardStatus{}
		if err := json.Unmarshal(bodyBytes, response.JSON200); err != nil {
			return nil, err
		}

	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 400:
		response.JSON400 = &ErrorResponse{}
		if err := json.Unmarshal(bodyBytes, response.JSON400); err != nil {
			return nil, err
		}

	}

	return response, nil
}

// ParsesessionPostResponse parses an HTTP response from a SessionPostWithResponse call
func ParsesessionPostResponse(rsp *http.Response) (*sessionPostResponse, error) {
	bodyBytes, err := ioutil.ReadAll(rsp.Body)
	defer rsp.Body.Close()
	if err != nil {
		return nil, err
	}

	response := &sessionPostResponse{
		Body:         bodyBytes,
		HTTPResponse: rsp,
	}

	switch {
	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 201:
		response.JSON201 = &Session{}
		if err := json.Unmarshal(bodyBytes, response.JSON201); err != nil {
			return nil, err
		}

	case strings.Contains(rsp.Header.Get("Content-Type"), "json") && rsp.StatusCode == 400:
		response.JSON400 = &ErrorResponse{}
		if err := json.Unmarshal(bodyBytes, response.JSON400); err != nil {
			return nil, err
		}

	}

	return response, nil
}
