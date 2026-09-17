-- HubspotAuth SDK exists test

local sdk = require("hubspot-auth_sdk")

describe("HubspotAuthSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
