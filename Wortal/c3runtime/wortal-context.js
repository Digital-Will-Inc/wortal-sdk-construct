"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_ID: "context_get_id",
        GET_TYPE: "context_get_type",
        GET_PLAYERS: "context_get_players",
        CHOOSE: "context_choose",
        SHARE: "context_share",
        SHARE_LINK: "context_share_link",
        UPDATE: "context_update",
        SWITCH: "context_switch",
        CREATE: "context_create",
    };

    const HANDLER_CLASS = class WortalContextDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-context", data => this._WortalContext(data)]
            ]);
        };

        _WortalContext(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_ID:
                    this._GetID();
                    break;
                case EVENT.GET_TYPE:
                    this._GetType();
                    break;
                case EVENT.GET_PLAYERS:
                    this._GetPlayersAsync(args.payload);
                    break;
                case EVENT.CHOOSE:
                    this._ChooseAsync(args.payload);
                    break;
                case EVENT.CREATE:
                    this._CreateAsync(args.playerId);
                    break;
                case EVENT.SHARE:
                    this._ShareAsync(args.payload);
                    break;
                case EVENT.SHARE_LINK:
                    this._ShareLinkAsync(args.payload);
                    break;
                case EVENT.UPDATE:
                    this._UpdateAsync(args.payload);
                    break;
                case EVENT.SWITCH:
                    this._SwitchAsync(args.contextId);
                    break;
                default:
                    console.warn("[WortalContext] Received invalid event: " + event);
                    break;
            }
        };

        _GetID() {
            const id = window.Wortal.context.getId();
            this.PostToRuntime("context_set_id", id);
        };

        _GetType() {
            const type = window.Wortal.context.getType();
            this.PostToRuntime("context_set_type", type);
        };

        _GetPlayersAsync(payload) {
            window.Wortal.context.getPlayersAsync(JSON.parse(payload))
                .then(players => {
                    this.PostToRuntime("context_get_players_callback", JSON.stringify(players));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _ShareAsync(payload) {
            window.Wortal.context.shareAsync(JSON.parse(payload))
                .then(shareResult => {
                    this.PostToRuntime("context_share_callback", shareResult);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _ShareLinkAsync(payload) {
            window.Wortal.context.shareLinkAsync(JSON.parse(payload))
                .then(() => {
                    this.PostToRuntime("context_share_link_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _UpdateAsync(payload) {
            window.Wortal.context.updateAsync(JSON.parse(payload))
                .then(() => {
                    this.PostToRuntime("context_update_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _ChooseAsync(payload) {
            window.Wortal.context.chooseAsync(JSON.parse(payload))
                .then(() => {
                    this.PostToRuntime("context_choose_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _SwitchAsync(contextId) {
            window.Wortal.context.switchAsync(contextId)
                .then(() => {
                    this.PostToRuntime("context_switch_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _CreateAsync(playerId) {
            window.Wortal.context.createAsync(playerId)
                .then(() => {
                    this.PostToRuntime("context_create_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
