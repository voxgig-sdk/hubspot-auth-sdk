"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OauthTokenInfoResponseBaseIfEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_AUTH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_AUTH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotAuthSDK.test();
        const ent = testsdk.OauthTokenInfoResponseBaseIf();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_AUTH_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'oauth_token_info_response_base_if.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "oauth_token_info_response_base_if", "op": { "create": { "input": "data", "name": "create", "points": [{ "a": true, "co": { "id": "POST /oauth/2026-09/token/introspect", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "POST", "o": "/oauth/2026-09/token/introspect", "q": {}, "r": {}, "s": [{ "lit": "oauth" }, { "lit": "2026-09" }, { "lit": "token" }, { "lit": "introspect" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "oauth_token_info_response_base_if", "name__orig": "oauth_token_info_response_base_if", "Name": "OauthTokenInfoResponseBaseIf", "name_": "oauth_token_info_response_base_if", "name-": "oauth-token-info-response-base-if", "NAME": "OAUTH_TOKEN_INFO_RESPONSE_BASE_IF", "index$": 1 }, { "active": true, "entity": "oauth_token_info_response_base_if", "key$": "BasicOauthTokenInfoResponseBaseIfFlow", "kind": "basic", "name": "BasicOauthTokenInfoResponseBaseIfFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "oauth_token_info_response_base_if_ref01" }, "m": {}, "o": "create", "s": [], "v": [], "index$": 0 }] }, 'OauthTokenInfoResponseBaseIf', { "POST /oauth/2026-09/token/introspect": { "protocol": "http", "requestBody": { "content": { "application/x-www-form-urlencoded": { "schema": { "type": "object", "properties": { "client_id": { "type": "string", "example": null }, "client_secret": { "type": "string", "example": null }, "token": { "type": "string", "example": null }, "token_type_hint": { "type": "string", "example": null } }, "example": null }, "example": null } } }, "parameters": [] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const oauth_token_info_response_base_if_ref01_ent = client.OauthTokenInfoResponseBaseIf();
        let oauth_token_info_response_base_if_ref01_data = setup.data.new.oauth_token_info_response_base_if['oauth_token_info_response_base_if_ref01'];
        oauth_token_info_response_base_if_ref01_data = (await oauth_token_info_response_base_if_ref01_ent.create(oauth_token_info_response_base_if_ref01_data)).data();
        (0, node_assert_1.default)(null != oauth_token_info_response_base_if_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/oauth_token_info_response_base_if/OauthTokenInfoResponseBaseIfTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotAuthSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['oauth_token_info_response_base_if01', 'oauth_token_info_response_base_if02', 'oauth_token_info_response_base_if03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_AUTH_TEST_OAUTH_TOKEN_INFO_RESPONSE_BASE_IF_ENTID': idmap,
        'HUBSPOT_AUTH_TEST_LIVE': 'FALSE',
        'HUBSPOT_AUTH_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_AUTH_APIKEY': '',
    });
    idmap = env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_INFO_RESPONSE_BASE_IF_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_AUTH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_INFO_RESPONSE_BASE_IF_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HubspotAuthSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=OauthTokenInfoResponseBaseIfEntity.test.js.map