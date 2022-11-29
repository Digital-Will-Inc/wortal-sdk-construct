
const C3 = self.C3;
const DOM_COMPONENT_ID = "wortal_sdk_DOM";

C3.Plugins.wortal.Instance = class WortalInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		super(inst, DOM_COMPONENT_ID);

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

    WortalSDK(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-sdk", obj);
    };
};
