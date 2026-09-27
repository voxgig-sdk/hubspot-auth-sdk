"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubspotAuthError = void 0;
class HubspotAuthError extends Error {
    isHubspotAuthError = true;
    sdk = 'HubspotAuth';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.HubspotAuthError = HubspotAuthError;
//# sourceMappingURL=HubspotAuthError.js.map