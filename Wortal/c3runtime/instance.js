
const C3 = self.C3;
const DOM_COMPONENT_ID = "wortal_sdk_DOM";

C3.Plugins.wortal.Instance = class WortalInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		super(inst, DOM_COMPONENT_ID);

        // Initialize SDK properties
        this._contextId = "";
        this._shareResult = 0;
        this._errorStatus = "";

        ////////////////////////////////////////////
        // Ads API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("before_ad_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.BeforeAdCallback);
        });

        this.AddDOMMessageHandler("after_ad_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.AfterAdCallback);
        });

        this.AddDOMMessageHandler("ad_dismissed_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.AdDismissedCallback);
        });

        this.AddDOMMessageHandler("ad_viewed_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.AdViewedCallback);
        });

        ////////////////////////////////////////////
        // Context API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("context_set_id", id => {
            this._contextId = id;
            this.Trigger(C3.Plugins.wortal.Cnds.ContextIDSet);
        });

        this.AddDOMMessageHandler("context_share_callback", shareResult => {
            this._shareResult = shareResult;
            this.Trigger(C3.Plugins.wortal.Cnds.ContextShareCallback);
        });

        this.AddDOMMessageHandler("context_update_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextUpdateCallback);
        });

        this.AddDOMMessageHandler("context_choose_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextChooseCallback);
        });

        this.AddDOMMessageHandler("context_switch_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextSwitchCallback);
        });

        this.AddDOMMessageHandler("context_create_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextCreateCallback);
        });

        ////////////////////////////////////////////
        // SDK API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("error_callback", error => {
            this._errorStatus = error;
            this.Trigger(C3.Plugins.wortal.Cnds.ErrorCallback);
        });
	}

	Release()
	{
		super.Release();
	}

    WortalAds(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-ads", obj);
    };

    WortalAnalytics(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-analytics", obj);
    };

    WortalContext(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-context", obj);
    };

    WortalSDK(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-sdk", obj);
    };
};
