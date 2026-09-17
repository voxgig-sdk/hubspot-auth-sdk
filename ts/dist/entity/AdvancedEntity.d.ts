import { HubspotAuthEntityBase } from '../HubspotAuthEntityBase';
import type { HubspotAuthSDK } from '../HubspotAuthSDK';
import type { Control } from '../types';
import type { Advanced, AdvancedCreateData } from '../HubspotAuthTypes';
declare class AdvancedEntity extends HubspotAuthEntityBase<Advanced> {
    constructor(client: HubspotAuthSDK, entopts: any);
    make(this: AdvancedEntity): AdvancedEntity;
    create(this: any, reqdata?: AdvancedCreateData, ctrl?: Control): Promise<AdvancedEntity>;
}
export { AdvancedEntity };
