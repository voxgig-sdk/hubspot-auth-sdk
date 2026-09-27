
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


describe('AdvancedEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_AUTH_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_AUTH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotAuthSDK.test()
    const ent = testsdk.Advanced()
    assert(null != ent)
  })


  test('basic', async (t) => {

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"advanced","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /oauth/2026-09/token/revoke","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/oauth/2026-09/token/revoke","q":{},"r":{},"s":[{"lit":"oauth"},{"lit":"2026-09"},{"lit":"token"},{"lit":"revoke"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"advanced","name__orig":"advanced","Name":"Advanced","name_":"advanced","name-":"advanced","NAME":"ADVANCED","index$":0}, {"active":true,"entity":"advanced","key$":"BasicAdvancedFlow","kind":"basic","name":"BasicAdvancedFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"advanced_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Advanced', {"POST /oauth/2026-09/token/revoke":{"protocol":"http","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"client_id":{"type":"string","example":null},"client_secret":{"type":"string","example":null},"token":{"type":"string","example":null},"token_type_hint":{"type":"string","example":null}},"example":null},"example":null}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const advanced_ref01_ent = client.Advanced()
    let advanced_ref01_data = setup.data.new.advanced['advanced_ref01']

    advanced_ref01_data = (await advanced_ref01_ent.create(advanced_ref01_data)).data()
    assert(null != advanced_ref01_data)


  })
})



function basicSetup(extra) {
  // TODO: fix test def options
  const options = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname,
      '../../../../.sdk/test/entity/advanced/AdvancedTestData.json')

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
    ['advanced01','advanced02','advanced03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_AUTH_TEST_ADVANCED_ENTID': idmap,
    'HUBSPOT_AUTH_TEST_LIVE': 'FALSE',
    'HUBSPOT_AUTH_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_AUTH_APIKEY': '',
  })

  idmap = env['HUBSPOT_AUTH_TEST_ADVANCED_ENTID']

  const live = 'TRUE' === env.HUBSPOT_AUTH_TEST_LIVE
  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_AUTH_TEST_ADVANCED_ENTID']
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
  
