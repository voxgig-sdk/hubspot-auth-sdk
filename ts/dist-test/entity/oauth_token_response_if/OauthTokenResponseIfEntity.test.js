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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('OauthTokenResponseIfEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HUBSPOT_AUTH_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HUBSPOT_AUTH_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HubspotAuthSDK.test();
        const ent = testsdk.OauthTokenResponseIf();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HUBSPOT_AUTH_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'oauth_token_response_if.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [], "name": "oauth_token_response_if", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /oauth/2026-09/token", "json": "{\"operationId\":\"post-/oauth/2026-09/token_/oauth/v3/token\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"example\":null,\"schema\":{\"example\":null,\"properties\":{\"client_assertion\":{\"example\":null,\"type\":\"string\"},\"client_assertion_type\":{\"example\":null,\"type\":\"string\"},\"client_id\":{\"example\":null,\"type\":\"string\"},\"client_secret\":{\"example\":null,\"type\":\"string\"},\"code\":{\"example\":null,\"type\":\"string\"},\"code_verifier\":{\"example\":null,\"type\":\"string\"},\"grant_type\":{\"enum\":[\"authorization_code\",\"client_credentials\",\"refresh_token\"],\"example\":null,\"type\":\"string\"},\"redirect_uri\":{\"example\":null,\"type\":\"string\"},\"refresh_token\":{\"example\":null,\"type\":\"string\"},\"scope\":{\"example\":null,\"type\":\"string\"}},\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":null,\"schema\":{\"example\":null,\"oneOf\":[{\"example\":null,\"properties\":{\"access_token\":{\"description\":\"A string representing the access token that allows access to the API.\",\"example\":null,\"type\":\"string\"},\"expires_in\":{\"description\":\"An integer in int64 format indicating the duration in seconds until the access token expires.\",\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"hub_id\":{\"description\":\"An integer representing the unique identifier of the HubSpot account (hub) associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"},\"id_token\":{\"description\":\"A string representing the ID token, which is an optional part of the response.\",\"example\":null,\"type\":\"string\"},\"refresh_token\":{\"description\":\"A string representing the refresh token, which can be used to obtain a new access token.\",\"example\":null,\"type\":\"string\"},\"scopes\":{\"description\":\"An array of strings specifying the scopes that are granted with the access token.\",\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"token_type\":{\"description\":\"A string indicating the type of token issued.\",\"example\":null,\"type\":\"string\"},\"token_use\":{\"default\":\"access_token\",\"description\":\"Indicates the usage of the token, which is 'access_token' by default. It is a string with a fixed value of 'access_token'.\",\"enum\":[\"access_token\"],\"example\":null,\"type\":\"string\"},\"user_id\":{\"description\":\"An integer representing the unique identifier of the user associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"access_token\",\"expires_in\",\"refresh_token\",\"token_type\",\"token_use\"],\"type\":\"object\"},{\"example\":null,\"properties\":{\"access_token\":{\"description\":\"A string representing the access token issued.\",\"example\":null,\"type\":\"string\"},\"expires_in\":{\"description\":\"An integer indicating the number of seconds until the token expires, in int64 format.\",\"example\":null,\"format\":\"int64\",\"type\":\"integer\"},\"hub_id\":{\"description\":\"An integer representing the HubSpot account ID associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"},\"id_token\":{\"description\":\"A string representing the ID token, if applicable.\",\"example\":null,\"type\":\"string\"},\"scopes\":{\"description\":\"An array of strings representing the scopes granted by the token.\",\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"token_type\":{\"description\":\"A string indicating the type of the token.\",\"example\":null,\"type\":\"string\"},\"token_use\":{\"default\":\"client_credentials\",\"description\":\"Indicates the usage of the token, which is 'client_credentials' by default.\",\"enum\":[\"client_credentials\"],\"example\":null,\"type\":\"string\"},\"user_id\":{\"description\":\"An integer representing the user ID associated with the token.\",\"example\":null,\"format\":\"int32\",\"type\":\"integer\"}},\"required\":[\"access_token\",\"expires_in\",\"token_type\",\"token_use\"],\"type\":\"object\"}],\"properties\":{}}}},\"description\":\"successful operation\"},\"default\":{\"content\":{\"*/*\":{\"example\":null,\"schema\":{\"description\":\"Represents an error response returned by the API when an operation fails. This component is used in various endpoints to provide detailed information about the error encountered.\",\"example\":{\"category\":\"VALIDATION_ERROR\",\"correlationId\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"links\":{\"knowledge-base\":\"https://www.hubspot.com/products/service/knowledge-base\"},\"message\":\"Invalid input (details will vary based on the error)\"},\"properties\":{\"category\":{\"description\":\"The error category\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{invalidPropertyName=[propertyValue], missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"correlationId\":{\"description\":\"A unique identifier for the request. Include this value with any error reports or support tickets\",\"example\":\"aeb5f871-7f07-4993-9211-075dc63e7cbf\",\"format\":\"uuid\",\"type\":\"string\"},\"errors\":{\"description\":\"further information about the error\",\"example\":null,\"items\":{\"description\":\"Represents detailed information about an error that occurred in the API. This component is used to provide additional context and specifics about errors, typically as part of an error response.\",\"example\":null,\"properties\":{\"code\":{\"description\":\"The status code associated with the error detail\",\"example\":null,\"type\":\"string\"},\"context\":{\"additionalProperties\":{\"example\":null,\"items\":{\"example\":null,\"type\":\"string\"},\"type\":\"array\"},\"description\":\"Context about the error condition\",\"example\":\"{missingScopes=[scope1, scope2]}\",\"type\":\"object\"},\"in\":{\"description\":\"The name of the field or parameter in which the error was found.\",\"example\":null,\"type\":\"string\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":null,\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"message\"],\"type\":\"object\"},\"type\":\"array\"},\"links\":{\"additionalProperties\":{\"example\":null,\"type\":\"string\"},\"description\":\"A map of link names to associated URIs containing documentation about the error or recommended remediation steps\",\"example\":null,\"type\":\"object\"},\"message\":{\"description\":\"A human readable message describing the error along with remediation steps where appropriate\",\"example\":\"An error occurred\",\"type\":\"string\"},\"subCategory\":{\"description\":\"A specific category that contains more specific detail about the error\",\"example\":null,\"type\":\"string\"}},\"required\":[\"category\",\"correlationId\",\"message\"],\"type\":\"object\"}}},\"description\":\"\"}},\"securitySchemes\":{\"developer_hapikey\":{\"in\":\"query\",\"name\":\"hapikey\",\"type\":\"apiKey\"},\"oauth2\":{\"flows\":{\"authorizationCode\":{\"authorizationUrl\":\"https://app.hubspot.com/oauth/authorize\",\"scopes\":{},\"tokenUrl\":\"https://api.hubapi.com/oauth/v1/token\"}},\"type\":\"oauth2\"},\"private_apps\":{\"in\":\"header\",\"name\":\"private-app\",\"type\":\"apiKey\"},\"private_apps_legacy\":{\"in\":\"header\",\"name\":\"private-app-legacy\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/oauth/2026-09/token", "segments": [{ "lit": "oauth" }, { "lit": "2026-09" }, { "lit": "token" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "oauth_token_response_if", "name__orig": "oauth_token_response_if", "Name": "OauthTokenResponseIf", "name_": "oauth_token_response_if", "name-": "oauth-token-response-if", "NAME": "OAUTH_TOKEN_RESPONSE_IF", "index$": 2 }, { "active": true, "entity": "oauth_token_response_if", "key$": "BasicOauthTokenResponseIfFlow", "kind": "basic", "name": "BasicOauthTokenResponseIfFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "oauth_token_response_if_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'OauthTokenResponseIf');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const oauth_token_response_if_ref01_ent = client.OauthTokenResponseIf();
        let oauth_token_response_if_ref01_data = setup.data.new.oauth_token_response_if['oauth_token_response_if_ref01'];
        oauth_token_response_if_ref01_data = (await oauth_token_response_if_ref01_ent.create(oauth_token_response_if_ref01_data)).data();
        (0, node_assert_1.default)(null != oauth_token_response_if_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/oauth_token_response_if/OauthTokenResponseIfTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HubspotAuthSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['oauth_token_response_if01', 'oauth_token_response_if02', 'oauth_token_response_if03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID': idmap,
        'HUBSPOT_AUTH_TEST_LIVE': 'FALSE',
        'HUBSPOT_AUTH_TEST_EXPLAIN': 'FALSE',
        'HUBSPOT_AUTH_APIKEY': '',
    });
    idmap = env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID'];
    const live = 'TRUE' === env.HUBSPOT_AUTH_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID'];
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
//# sourceMappingURL=OauthTokenResponseIfEntity.test.js.map