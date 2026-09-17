# HubspotAuth SDK utility: make_context

from projectname_sdk.core.context import HubspotAuthContext


def make_context_util(ctxmap, basectx):
    return HubspotAuthContext(ctxmap, basectx)
