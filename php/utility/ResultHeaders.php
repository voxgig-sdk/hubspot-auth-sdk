<?php
declare(strict_types=1);

// HubspotAuth SDK utility: result_headers

class HubspotAuthResultHeaders
{
    public static function call(HubspotAuthContext $ctx): ?HubspotAuthResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
