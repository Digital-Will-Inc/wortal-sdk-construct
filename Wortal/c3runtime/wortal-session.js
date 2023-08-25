"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_ENTRY_POINT: "session_get_entry_point",
        SET_SESSION_DATA: "session_set_data",
        SWITCH_GAME: "session_switch_game",
    };

    const HANDLER_CLASS = class WortalSessionDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-session", data => this._WortalSession(data)]
            ]);

            setTimeout(() => {
                this._GetEntryPointData();
                this._GetLocale();
                this._GetTrafficSource();
                this._GetPlatform();
                this._GetDevice();
                this._GetOrientation();
                window.Wortal.session.onOrientationChange(orientation => this.PostToRuntime("session_on_orientation_change_callback", orientation));
            }, 1000);
        };

        _WortalSession(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_ENTRY_POINT:
                    this._GetEntryPointAsync();
                    break;
                case EVENT.SET_SESSION_DATA:
                    this._SetSessionData(args.data);
                    break;
                case EVENT.SWITCH_GAME:
                    this._SwitchGame(args.gameID);
                    break;
                default:
                    console.warn("[WortalSession] Received invalid event: " + event);
                    break;
            }
        };

        _GetEntryPointData() {
            const data = window.Wortal.session.getEntryPointData();
            this.PostToRuntime("session_set_entry_point_data", JSON.stringify(data));
        };

        _GetLocale() {
            const locale = window.Wortal.session.getLocale();
            this.PostToRuntime("session_set_locale", locale);
        };

        _GetTrafficSource() {
            const source = window.Wortal.session.getTrafficSource();
            this.PostToRuntime("session_set_traffic_source", JSON.stringify(source));
        };

        _GetEntryPointAsync() {
            window.Wortal.session.getEntryPointAsync()
                .then(data => {
                    this.PostToRuntime("session_get_entry_point_callback", data);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _SetSessionData(data) {
            window.Wortal.session.setSessionData(JSON.parse(data));
        };

        _GetPlatform() {
            const platform = window.Wortal.session.getPlatform();
            this.PostToRuntime("session_set_platform", platform);
        }

        _GetDevice() {
            const device = window.Wortal.session.getDevice();
            this.PostToRuntime("session_set_device", device);
        }

        _GetOrientation() {
            const orientation = window.Wortal.session.getOrientation();
            this.PostToRuntime("session_set_orientation", orientation);
        }

        _SwitchGame(gameID) {
            window.Wortal.session.switchGame(gameID)
                .then(() => {
                    this.PostToRuntime("session_switch_game_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
