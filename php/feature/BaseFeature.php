<?php
declare(strict_types=1);

// HubspotAuth SDK base feature

class HubspotAuthBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HubspotAuthContext $ctx, array $options): void {}
    public function PostConstruct(HubspotAuthContext $ctx): void {}
    public function PostConstructEntity(HubspotAuthContext $ctx): void {}
    public function SetData(HubspotAuthContext $ctx): void {}
    public function GetData(HubspotAuthContext $ctx): void {}
    public function GetMatch(HubspotAuthContext $ctx): void {}
    public function SetMatch(HubspotAuthContext $ctx): void {}
    public function PrePoint(HubspotAuthContext $ctx): void {}
    public function PreSpec(HubspotAuthContext $ctx): void {}
    public function PreRequest(HubspotAuthContext $ctx): void {}
    public function PreResponse(HubspotAuthContext $ctx): void {}
    public function PreResult(HubspotAuthContext $ctx): void {}
    public function PreDone(HubspotAuthContext $ctx): void {}
    public function PreUnexpected(HubspotAuthContext $ctx): void {}
}
