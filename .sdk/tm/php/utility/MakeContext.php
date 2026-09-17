<?php
declare(strict_types=1);

// HubspotAuth SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HubspotAuthMakeContext
{
    public static function call(array $ctxmap, ?HubspotAuthContext $basectx): HubspotAuthContext
    {
        return new HubspotAuthContext($ctxmap, $basectx);
    }
}
