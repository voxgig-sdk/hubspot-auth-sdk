
const envlocal = __dirname + '/../../../.env.local'
require('../../utility').loadEnvLocal(envlocal)

const Path = require('node:path')
const Fs = require('node:fs')

const { test, describe, afterEach } = require('node:test')
const assert = require('node:assert')
const { createLiveTransport } = require('../../live-runner')
const { runLiveEntity } = require('../../live-entity')


const { HubspotAuthSDK, BaseFeature, stdutil, config } = require('../../..')

const {
  envOverride,
  liveClientOptions,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
} = require('../../utility')


describe('OauthTokenResponseIfEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_AUTH_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_AUTH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotAuthSDK.test()
    const ent = testsdk.OauthTokenResponseIf()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"oauth_token_response_if","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /oauth/2026-09/token","json":"{\"operationId\":\"post-/oauth/2026-09/token_/oauth/v3/token\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"client_assertion\":{\"example\":null,\"type\":\"string\"},\"client_assertion_type\":{\"example\":null,\"type\":\"string\"},\"client_id\":{\"example\":null,\"type\":\"string\"},\"client_secret\":{\"example\":null,\"type\":\"string\"},\"code\":{\"example\":null,\"type\":\"string\"},\"code_verifier\":{\"example\":null,\"type\":\"string\"},\"grant_type\":{\"enum\":[\"authorization_code\",\"client_credentials\",\"refresh_token\"],\"example\":null,\"type\":\"string\"},\"redirect_uri\":{\"example\":null,\"type\":\"string\"},\"refresh_token\":{\"example\":null,\"type\":\"string\"},\"scope\":{\"example\":null,\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"oneOf\":[{\"example\":null,\"properties\":{\"access_token\":{\"description\":\"A string representing the access token that allows access to the API.\",\"example\":null,\"type\":\"string\"},\"expires_in\":{\"description\":\"An integer in int64 format indicating the duration in seconds until the access token expires.\",\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"hub_id\":{\"description\":\"An integer representing the unique identifier of the HubSpot account (hub) associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"},\"id_token\":{\"description\":\"A string representing the ID token, which is an optional part of the response.\",\"example\":null,\"type\":\"string\"},\"refresh_token\":{\"description\":\"A string representing the refresh token, which can be used to obtain a new access token.\",\"example\":null,\"type\":\"string\"},\"scopes\":{\"description\":\"An array of strings specifying the scopes that are granted with the access token.\",\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"token_type\":{\"description\":\"A string indicating the type of token issued.\",\"example\":null,\"type\":\"string\"},\"token_use\":{\"default\":\"access_token\",\"description\":\"Indicates the usage of the token, which is 'access_token' by default. It is a string with a fixed value of 'access_token'.\",\"enum\":[\"access_token\"],\"example\":null,\"type\":\"string\"},\"user_id\":{\"description\":\"An integer representing the unique identifier of the user associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"access_token\",\"expires_in\",\"refresh_token\",\"token_type\",\"token_use\"],\"type\":\"object\"},{\"example\":null,\"properties\":{\"access_token\":{\"description\":\"A string representing the access token issued.\",\"example\":null,\"type\":\"string\"},\"expires_in\":{\"description\":\"An integer indicating the number of seconds until the token expires, in int64 format.\",\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"hub_id\":{\"description\":\"An integer representing the HubSpot account ID associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"},\"id_token\":{\"description\":\"A string representing the ID token, if applicable.\",\"example\":null,\"type\":\"string\"},\"scopes\":{\"description\":\"An array of strings representing the scopes granted by the token.\",\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"token_type\":{\"description\":\"A string indicating the type of the token.\",\"example\":null,\"type\":\"string\"},\"token_use\":{\"default\":\"client_credentials\",\"description\":\"Indicates the usage of the token, which is 'client_credentials' by default.\",\"enum\":[\"client_credentials\"],\"example\":null,\"type\":\"string\"},\"user_id\":{\"description\":\"An integer representing the user ID associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"access_token\",\"expires_in\",\"token_type\",\"token_use\"],\"type\":\"object\"}],\"properties\":{}}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"*/*\":{\"example\":null,\"schema\":{\"description\":\"Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.\",\"example\":{\"category\":\"VALIDATION_ERROR\",\"correlationId\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"links\":{\"knowledge-base\":\"https://www.hubspot.com/products/service/knowledge-base\"},\"message\":\"Invalid input (details will vary based on the error)\"},\"properties\":{\"category\":{\"description\":\"The error category\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{invalidPropertyName=[propertyValue], missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"correlationId\":{\"description\":\"A unique identifier for the request. Include this value with any error reports or support tickets\",\"example\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"format\":\"uuid\",\"type\":\"string\"},\"errors\":{\"description\":\"further information about the error\",\"example\":null,\"items\":{\"description\":\"Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.\",\"example\":null,\"properties\":{\"code\":{\"description\":\"The status code associated with the error detail\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"in\":{\"description\":\"The name of the field or parameter in which the error was found.\",\"example\":null,\"type\":\"string\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":null,\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A map of link names to associated URIs containing documentation about the error or recommended remediation steps\",\"example\":null,\"type\":\"object\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":\"An error occurred\",\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"category\",\"correlationId\",\"message\"],\"type\":\"object\"}}},\"description\":\"\"}},\"securitySchemes\":{\"developer_hapikey\":{\"in\":\"query\",\"name\":\"hapikey\",\"type\":\"apiKey\"},\"oauth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://app.hubspot.com/oauth/authorize\",\"scopes\":{},\"tokenUrl\":\"https://api.hubapi.com/oauth/v1/token\"}},\"type\":\"oauth2\"},\"private_apps\":{\"in\":\"header\",\"name\":\"private-app\",\"type\":\"apiKey\"},\"private_apps_legacy\":{\"in\":\"header\",\"name\":\"private-app-legacy\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/oauth/2026-09/token","segments":[{"lit":"oauth"},{"lit":"2026-09"},{"lit":"token"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"oauth_token_response_if","name__orig":"oauth_token_response_if","Name":"OauthTokenResponseIf","name_":"oauth_token_response_if","name-":"oauth-token-response-if","NAME":"OAUTH_TOKEN_RESPONSE_IF","index$":2}, {"active":true,"entity":"oauth_token_response_if","key$":"BasicOauthTokenResponseIfFlow","kind":"basic","name":"BasicOauthTokenResponseIfFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"oauth_token_response_if_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'OauthTokenResponseIf')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const oauth_token_response_if_ref01_ent = client.OauthTokenResponseIf()
    let oauth_token_response_if_ref01_data = setup.data.new.oauth_token_response_if['oauth_token_response_if_ref01']

    oauth_token_response_if_ref01_data = (await oauth_token_response_if_ref01_ent.create(oauth_token_response_if_ref01_data)).data()
    assert(null != oauth_token_response_if_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/oauth_token_response_if/OauthTokenResponseIfTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HubspotAuthSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['oauth_token_response_if01','oauth_token_response_if02','oauth_token_response_if03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID': idmap,
    'HUBSPOT_AUTH_TEST_LIVE': 'FALSE',
    'HUBSPOT_AUTH_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_AUTH_APIKEY': '',
  })

  idmap = env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID']

  const live = 'TRUE' === env.HUBSPOT_AUTH_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HubspotAuthSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.HUBSPOT_AUTH_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when
      // the last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey and
      // server values above and handed the SDK undefined.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HUBSPOT_AUTH_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
