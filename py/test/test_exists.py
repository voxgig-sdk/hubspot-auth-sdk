# HubspotAuth SDK exists test

import pytest
from hubspotauth_sdk import HubspotAuthSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = HubspotAuthSDK.test(None, None)
        assert testsdk is not None
