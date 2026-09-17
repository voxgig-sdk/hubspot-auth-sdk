# HubspotAuth SDK feature factory

from hubspotauth_sdk.feature.base_feature import HubspotAuthBaseFeature
from hubspotauth_sdk.feature.debug_feature import HubspotAuthDebugFeature
from hubspotauth_sdk.feature.idempotency_feature import HubspotAuthIdempotencyFeature
from hubspotauth_sdk.feature.metrics_feature import HubspotAuthMetricsFeature
from hubspotauth_sdk.feature.paging_feature import HubspotAuthPagingFeature
from hubspotauth_sdk.feature.ratelimit_feature import HubspotAuthRatelimitFeature
from hubspotauth_sdk.feature.retry_feature import HubspotAuthRetryFeature
from hubspotauth_sdk.feature.test_feature import HubspotAuthTestFeature
from hubspotauth_sdk.feature.timeout_feature import HubspotAuthTimeoutFeature


_FEATURES = {
    "base": lambda: HubspotAuthBaseFeature(),
    "debug": lambda: HubspotAuthDebugFeature(),
    "idempotency": lambda: HubspotAuthIdempotencyFeature(),
    "metrics": lambda: HubspotAuthMetricsFeature(),
    "paging": lambda: HubspotAuthPagingFeature(),
    "ratelimit": lambda: HubspotAuthRatelimitFeature(),
    "retry": lambda: HubspotAuthRetryFeature(),
    "test": lambda: HubspotAuthTestFeature(),
    "timeout": lambda: HubspotAuthTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
