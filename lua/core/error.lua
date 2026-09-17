-- HubspotAuth SDK error

local HubspotAuthError = {}
HubspotAuthError.__index = HubspotAuthError


function HubspotAuthError.new(code, msg, ctx)
  local self = setmetatable({}, HubspotAuthError)
  self.is_sdk_error = true
  self.sdk = "HubspotAuth"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HubspotAuthError:error()
  return self.msg
end


function HubspotAuthError:__tostring()
  return self.msg
end


return HubspotAuthError
