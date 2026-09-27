

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HubspotAuthSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('OauthTokenInfoResponseBaseIfEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HUBSPOT_AUTH_TEST_LIVE=TRUE.
  afterEach(liveDelay('HUBSPOT_AUTH_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HubspotAuthSDK.test()
    const ent = testsdk.OauthTokenInfoResponseBaseIf()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HUBSPOT_AUTH_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'oauth_token_info_response_base_if.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"oauth_token_info_response_base_if","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /oauth/2026-09/token/introspect","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/oauth/2026-09/token/introspect","q":{},"r":{},"s":[{"lit":"oauth"},{"lit":"2026-09"},{"lit":"token"},{"lit":"introspect"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"oauth_token_info_response_base_if","name__orig":"oauth_token_info_response_base_if","Name":"OauthTokenInfoResponseBaseIf","name_":"oauth_token_info_response_base_if","name-":"oauth-token-info-response-base-if","NAME":"OAUTH_TOKEN_INFO_RESPONSE_BASE_IF","index$":1}, {"active":true,"entity":"oauth_token_info_response_base_if","key$":"BasicOauthTokenInfoResponseBaseIfFlow","kind":"basic","name":"BasicOauthTokenInfoResponseBaseIfFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"oauth_token_info_response_base_if_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'OauthTokenInfoResponseBaseIf', {"POST /oauth/2026-09/token/introspect":{"protocol":"http","requestBody":{"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"client_id":{"type":"string","example":null},"client_secret":{"type":"string","example":null},"token":{"type":"string","example":null},"token_type_hint":{"type":"string","example":null}},"example":null},"example":null}}},"parameters":[]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const oauth_token_info_response_base_if_ref01_ent = client.OauthTokenInfoResponseBaseIf()
    let oauth_token_info_response_base_if_ref01_data = setup.data.new.oauth_token_info_response_base_if['oauth_token_info_response_base_if_ref01']

    oauth_token_info_response_base_if_ref01_data = (await oauth_token_info_response_base_if_ref01_ent.create(oauth_token_info_response_base_if_ref01_data)).data()
    assert(null != oauth_token_info_response_base_if_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/oauth_token_info_response_base_if/OauthTokenInfoResponseBaseIfTestData.json')

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
    ['oauth_token_info_response_base_if01','oauth_token_info_response_base_if02','oauth_token_info_response_base_if03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HUBSPOT_AUTH_TEST_OAUTH_TOKEN_INFO_RESPONSE_BASE_IF_ENTID': idmap,
    'HUBSPOT_AUTH_TEST_LIVE': 'FALSE',
    'HUBSPOT_AUTH_TEST_EXPLAIN': 'FALSE',
    'HUBSPOT_AUTH_APIKEY': '',
  })

  idmap = env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_INFO_RESPONSE_BASE_IF_ENTID']

  const live = 'TRUE' === env.HUBSPOT_AUTH_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_INFO_RESPONSE_BASE_IF_ENTID']
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
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
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
  
