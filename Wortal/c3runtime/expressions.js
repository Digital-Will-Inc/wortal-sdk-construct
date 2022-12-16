self.C3.Plugins.wortal.Exps =
{
    ////////////////////////////////////////////
    // Context API
    ////////////////////////////////////////////
    ContextID() {
        return this._contextId;
    },

    ContextShareResult() {
        return this._shareResult;
    },

    ////////////////////////////////////////////
    // In-App Purchasing API
    ////////////////////////////////////////////
    IAPEnabled() {
        return this._isIAPEnabled ? 1 : 0;
    },

    IAPCatalog() {
        return this._iapCatalog;
    },

    IAPPurchases() {
        return this._iapPurchases;
    },

    IAPPurchaseReceipt() {
        return this._iapPurchaseReceipt;
    },

    ////////////////////////////////////////////
    // SDK API
    ////////////////////////////////////////////
    ErrorStatus() {
        return this._errorStatus;
    }
};
