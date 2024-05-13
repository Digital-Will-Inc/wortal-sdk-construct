"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        SHOW_INTERSTITIAL: "ads_show_interstitial",
        SHOW_REWARDED: "ads_show_rewarded",
    };

    const HANDLER_CLASS = class WortalAdsDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-ads", data => this._WortalAds(data)]
            ]);

            if (window.Wortal && window.Wortal.isInitialized) {
                this._IsAdBlocked();
            } else {
                window.addEventListener("wortal-sdk-initialized", () => {
                    this._IsAdBlocked();
                });
            }
        }

        _WortalAds(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.SHOW_INTERSTITIAL:
                    this._ShowInterstitial(args.placement, args.description);
                    break;
                case EVENT.SHOW_REWARDED:
                    this._ShowRewarded(args.description);
                    break;
                default:
                    console.warn("[WortalAds] Received invalid event: " + event);
                    break;
            }
        }

        _IsAdBlocked() {
            const blocked = window.Wortal.ads.isAdBlocked();
            this.PostToRuntime("ads_is_ad_blocked", blocked);
        };

        _ShowInterstitial(placement, description) {
            window.Wortal.ads.showInterstitial(placement, description,
                () => this.PostToRuntime("before_ad_callback"),
                () => this.PostToRuntime("after_ad_callback"),
                () => this.PostToRuntime("ad_no_fill_callback"));
        };

        _ShowRewarded(description) {
            window.Wortal.ads.showRewarded(description,
                () => this.PostToRuntime("before_ad_callback"),
                () => this.PostToRuntime("after_ad_callback"),
                () => this.PostToRuntime("ad_dismissed_callback"),
                () => this.PostToRuntime("ad_viewed_callback"),
                () => this.PostToRuntime("ad_no_fill_callback"));
        };
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
