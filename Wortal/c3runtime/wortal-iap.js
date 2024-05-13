"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_CATALOG: "iap_get_catalog",
        GET_PURCHASES: "iap_get_purchases",
        MAKE_PURCHASE: "iap_make_purchase",
        CONSUME_PURCHASE: "iap_consume_purchase",
    };

    const HANDLER_CLASS = class WortalIAPDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-iap", data => this._WortalIAP(data)]
            ]);

            // We want to set the expression flag right away because the game might want to change what
            // they present to the player depending on this status. Ex: Don't display shop pop-ups after first load.
            if (window.Wortal && window.Wortal.isInitialized) {
                this._IsEnabled();
            } else {
                window.addEventListener("wortal-sdk-initialized", () => {
                    this._IsEnabled();
                });
            }
        };

        _WortalIAP(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_CATALOG:
                    this._GetCatalogAsync();
                    break;
                case EVENT.GET_PURCHASES:
                    this._GetPurchasesAsync();
                    break;
                case EVENT.MAKE_PURCHASE:
                    this._MakePurchaseAsync(args.purchaseConfig);
                    break;
                case EVENT.CONSUME_PURCHASE:
                    this._ConsumePurchaseAsync(args.token);
                    break;
                default:
                    console.warn("[WortalIAP] Received invalid event: " + event);
                    break;
            }
        };

        _IsEnabled() {
            const enabled = window.Wortal.iap.isEnabled();
            this.PostToRuntime("iap_set_enabled", enabled);
        };

        _GetCatalogAsync() {
            window.Wortal.iap.getCatalogAsync()
                .then(catalog => {
                    this.PostToRuntime("iap_get_catalog_callback", JSON.stringify(catalog));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _GetPurchasesAsync() {
            window.Wortal.iap.getPurchasesAsync()
                .then(purchases => {
                    this.PostToRuntime("iap_get_purchases_callback", JSON.stringify(purchases));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _MakePurchaseAsync(purchaseConfig) {
            window.Wortal.iap.makePurchaseAsync(JSON.parse(purchaseConfig))
                .then(purchase => {
                    this.PostToRuntime("iap_make_purchase_callback", JSON.stringify(purchase));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _ConsumePurchaseAsync(token) {
            window.Wortal.iap.consumePurchaseAsync(token)
                .then(() => {
                    this.PostToRuntime("iap_consume_purchase_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
