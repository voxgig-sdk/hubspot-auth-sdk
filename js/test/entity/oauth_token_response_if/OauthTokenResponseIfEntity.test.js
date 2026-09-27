
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"oauth_token_response_if","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /oauth/2026-09/token","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/oauth/2026-09/token","q":{},"r":{},"s":[{"lit":"oauth"},{"lit":"2026-09"},{"lit":"token"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"oauth_token_response_if","name__orig":"oauth_token_response_if","Name":"OauthTokenResponseIf","name_":"oauth_token_response_if","name-":"oauth-token-response-if","NAME":"OAUTH_TOKEN_RESPONSE_IF","index$":2}, {"active":true,"entity":"oauth_token_response_if","key$":"BasicOauthTokenResponseIfFlow","kind":"basic","name":"BasicOauthTokenResponseIfFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"oauth_token_response_if_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'OauthTokenResponseIf', {"POST /oauth/2026-09/token":{"protocol":"http","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"client_assertion":{"type":"string","example":null},"client_assertion_type":{"type":"string","example":null},"client_id":{"type":"string","example":null},"client_secret":{"type":"string","example":null},"code":{"type":"string","example":null},"code_verifier":{"type":"string","example":null},"grant_type":{"type":"string","example":null,"enum":["authorization_code","client_credentials","refresh_token"]},"redirect_uri":{"type":"string","example":null},"refresh_token":{"type":"string","example":null},"scope":{"type":"string","example":null}},"example":null},"example":null}}},"parameters":[]}})
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
  
