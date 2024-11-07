"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        INITIALIZE: "initialize",
        START_GAME: "start_game",
        SET_LOADING_PROGRESS: "set_loading_progress",
        PERFORM_HAPTIC_FEEDBACK: "perform_haptic_feedback",
        GET_SUPPORTED_APIS: "get_supported_apis",
    };

    const HANDLER_CLASS = class WortalDOMHandler extends self.DOMHandler
    {
        constructor(iRuntime)
        {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-sdk", data => this._WortalSDK(data)]
            ]);

            // The SDK needs a little time to initialize before we can call onPause.
            if (window.Wortal && window.Wortal.isInitialized)
            {
                window.Wortal.onPause(() => this.PostToRuntime("pause_callback"));
                window.Wortal.onResume(() => this.PostToRuntime("resume_callback"));
            } else
            {
                window.addEventListener("wortal-sdk-initialized", () =>
                {
                    window.Wortal.onPause(() => this.PostToRuntime("pause_callback"));
                    window.Wortal.onResume(() => this.PostToRuntime("resume_callback"));
                });
            }
        }

        _WortalSDK(data)
        {
            let event = data["event"];
            let args = data["args"];
            switch (event)
            {
                case EVENT.INITIALIZE:
                    this._InitializeAsync();
                    break;
                case EVENT.START_GAME:
                    this._StartGameAsync();
                    break;
                case EVENT.SET_LOADING_PROGRESS:
                    this._SetLoadingProgress(args.value);
                    break;
                case EVENT.PERFORM_HAPTIC_FEEDBACK:
                    this._PerformHapticFeedbackAsync();
                    break;
                case EVENT.GET_SUPPORTED_APIS:
                    this._GetSupportedAPIs();
                    break;
                default:
                    console.error("[WortalSDK] Call to deprecated function made. Please upgrade plugin to v2+");
                    break;
            }
        }

        _InitializeAsync()
        {
            window.Wortal.initializeAsync()
                .then(() =>
                {
                    this.PostToRuntime("initialize_callback");
                })
                .catch(error =>
                {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _StartGameAsync()
        {
            window.Wortal.startGameAsync()
                .then(() =>
                {
                    this.PostToRuntime("start_game_callback");
                })
                .catch(error =>
                {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _SetLoadingProgress(value)
        {
            if (window.Wortal)
            {
                window.Wortal.setLoadingProgress(value * 100);
            }
        }

        _PerformHapticFeedbackAsync()
        {
            window.Wortal.performHapticFeedbackAsync()
                .then(() =>
                {
                    this.PostToRuntime("haptic_feedback_callback");
                })
                .catch(error =>
                {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetSupportedAPIs()
        {
            const result = window.Wortal.getSupportedAPIs();
            this.PostToRuntime("supported_apis_callback", JSON.stringify(result));
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
