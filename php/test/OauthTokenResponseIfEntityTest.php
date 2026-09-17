<?php
declare(strict_types=1);

// OauthTokenResponseIf entity test

require_once __DIR__ . '/../hubspotauth_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class OauthTokenResponseIfEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HubspotAuthSDK::test(null, null);
        $ent = $testsdk->OauthTokenResponseIf(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = oauth_token_response_if_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "oauth_token_response_if." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $oauth_token_response_if_ref01_ent = $client->OauthTokenResponseIf(null);
        $oauth_token_response_if_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.oauth_token_response_if"), "oauth_token_response_if_ref01"));

        $oauth_token_response_if_ref01_data_result = $oauth_token_response_if_ref01_ent->create($oauth_token_response_if_ref01_data, null);
        $oauth_token_response_if_ref01_data = Helpers::to_map(is_object($oauth_token_response_if_ref01_data_result) && method_exists($oauth_token_response_if_ref01_data_result, 'data_get') ? $oauth_token_response_if_ref01_data_result->data_get() : $oauth_token_response_if_ref01_data_result);
        $this->assertNotNull($oauth_token_response_if_ref01_data);

    }
}

function oauth_token_response_if_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/oauth_token_response_if/OauthTokenResponseIfTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HubspotAuthSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["oauth_token_response_if01", "oauth_token_response_if02", "oauth_token_response_if03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID" => $idmap,
        "HUBSPOT_AUTH_TEST_LIVE" => "FALSE",
        "HUBSPOT_AUTH_TEST_EXPLAIN" => "FALSE",
        "HUBSPOT_AUTH_APIKEY" => "",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HUBSPOT_AUTH_TEST_OAUTH_TOKEN_RESPONSE_IF_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HUBSPOT_AUTH_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
                "apikey" => $env["HUBSPOT_AUTH_APIKEY"],
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new HubspotAuthSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["HUBSPOT_AUTH_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HUBSPOT_AUTH_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
