import { AdvancedEntity } from './entity/AdvancedEntity';
import { OauthTokenInfoResponseBaseIfEntity } from './entity/OauthTokenInfoResponseBaseIfEntity';
import { OauthTokenResponseIfEntity } from './entity/OauthTokenResponseIfEntity';
export type * from './HubspotAuthTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { HubspotAuthEntityBase } from './HubspotAuthEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class HubspotAuthSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Advanced(entopts?: Record<string, any>): AdvancedEntity;
    OauthTokenInfoResponseBaseIf(entopts?: Record<string, any>): OauthTokenInfoResponseBaseIfEntity;
    OauthTokenResponseIf(entopts?: Record<string, any>): OauthTokenResponseIfEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): HubspotAuthSDK;
    tester(testopts?: any, sdkopts?: any): HubspotAuthSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof HubspotAuthSDK;
export { stdutil, config, BaseFeature, HubspotAuthEntityBase, HubspotAuthSDK, SDK, };
