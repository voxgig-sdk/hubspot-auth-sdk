package core

type HubspotAuthError struct {
	IsHubspotAuthError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHubspotAuthError(code string, msg string, ctx *Context) *HubspotAuthError {
	return &HubspotAuthError{
		IsHubspotAuthError: true,
		Sdk:              "HubspotAuth",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HubspotAuthError) Error() string {
	return e.Msg
}
