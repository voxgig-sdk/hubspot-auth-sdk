import { HubspotAuthEntityBase } from '../HubspotAuthEntityBase';
import type { HubspotAuthSDK } from '../HubspotAuthSDK';
import type { Control } from '../types';
import type { OauthTokenResponseIf, OauthTokenResponseIfCreateData } from '../HubspotAuthTypes';
declare class OauthTokenResponseIfEntity extends HubspotAuthEntityBase<OauthTokenResponseIf> {
    constructor(client: HubspotAuthSDK, entopts: any);
    make(this: OauthTokenResponseIfEntity): OauthTokenResponseIfEntity;
    create(this: any, reqdata?: OauthTokenResponseIfCreateData, ctrl?: Control): Promise<OauthTokenResponseIfEntity>;
}
export { OauthTokenResponseIfEntity };
