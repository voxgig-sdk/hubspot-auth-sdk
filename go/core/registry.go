package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewDebugFeatureFunc func() Feature

var NewIdempotencyFeatureFunc func() Feature

var NewMetricsFeatureFunc func() Feature

var NewPagingFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAdvancedEntityFunc func(client *HubspotAuthSDK, entopts map[string]any) HubspotAuthEntity

var NewOauthTokenInfoResponseBaseIfEntityFunc func(client *HubspotAuthSDK, entopts map[string]any) HubspotAuthEntity

var NewOauthTokenResponseIfEntityFunc func(client *HubspotAuthSDK, entopts map[string]any) HubspotAuthEntity

