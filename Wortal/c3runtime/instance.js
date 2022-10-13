
const C3 = self.C3;
const DOM_COMPONENT_ID = "wortal_sdk_DOM";

C3.Plugins.wortal.Instance = class WortalInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		super(inst, DOM_COMPONENT_ID);

        this.AddDOMMessageHandler("before_ad", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.OnBeforeAd);
        });

        this.AddDOMMessageHandler("after_ad", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.OnAfterAd);
        });

        this.AddDOMMessageHandler("ad_dismissed", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.OnAdDismissed);
        });

        this.AddDOMMessageHandler("ad_viewed", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.OnAdViewed);
        });
	}

	Release()
	{
		super.Release();
	}

    WortalSDK(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-sdk", obj);
    }
};
