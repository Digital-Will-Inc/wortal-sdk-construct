"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        SET_LOADING_PROGRESS: "set_loading_progress",
    };

    const HANDLER_CLASS = class WortalDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-sdk", data => this._WortalSDK(data)]
            ]);

            window.Wortal.onPause(() => this.PostToRuntime("pause_callback"));
        }

        _WortalSDK(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.SET_LOADING_PROGRESS:
                    this._SetLoadingProgress(args.value);
                    break;
                default:
                    console.error("[WortalSDK] Call to deprecated function made. Please upgrade plugin to v2+");
                    break;
            }
        }

        _SetLoadingProgress(value) {
            if (window.Wortal) {
                window.Wortal.setLoadingProgress(value * 100);
            }
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
