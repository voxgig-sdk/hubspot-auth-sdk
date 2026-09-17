import { HubspotAuthEntityBase } from '../HubspotAuthEntityBase';
import type { HubspotAuthSDK } from '../HubspotAuthSDK';
import type { Control } from '../types';
import type { OauthTokenInfoResponseBaseIf, OauthTokenInfoResponseBaseIfCreateData } from '../HubspotAuthTypes';
declare class OauthTokenInfoResponseBaseIfEntity extends HubspotAuthEntityBase<OauthTokenInfoResponseBaseIf> {
    constructor(client: HubspotAuthSDK, entopts: any);
    make(this: OauthTokenInfoResponseBaseIfEntity): OauthTokenInfoResponseBaseIfEntity;
    create(this: any, reqdata?: OauthTokenInfoResponseBaseIfCreateData, ctrl?: Control): Promise<OauthTokenInfoResponseBaseIfEntity>;
}
export { OauthTokenInfoResponseBaseIfEntity };
