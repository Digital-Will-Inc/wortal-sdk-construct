"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_DATA: "player_get_data",
        SET_DATA: "player_set_data",
        FLUSH_DATA: "player_flush_data",
        GET_CONNECTED_PLAYERS: "player_get_connected_players",
        GET_SIGNED_PLAYER_INFO: "player_get_signed_player_info",
        GET_ASID: "player_get_asid",
        GET_SIGNED_ASID: "player_get_signed_asid",
        CAN_SUBSCRIBE_BOT: "player_can_subscribe_bot",
        SUBSCRIBE_BOT: "player_subscribe_bot",
    };

    const HANDLER_CLASS = class WortalPlayerDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-player", data => this._WortalPlayer(data)]
            ]);

            const runSetup = () => {
                this._GetID();
                this._GetName();
                this._GetPhoto();
                this._IsFirstPlay();
            };

            // These shouldn't change at runtime, so we can just set them here.
            if (window.Wortal && window.Wortal.isInitialized) {
                runSetup();
            } else {
                window.addEventListener("wortal-sdk-initialized", () => {
                    runSetup();
                });
            }
        };

        _WortalPlayer(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_DATA:
                    this._GetDataAsync(args.keys);
                    break;
                case EVENT.SET_DATA:
                    this._SetDataAsync(args.data);
                    break;
                case EVENT.FLUSH_DATA:
                    this._FlushDataAsync();
                    break;
                case EVENT.GET_CONNECTED_PLAYERS:
                    this._GetConnectedPlayersAsync(args.payload);
                    break;
                case EVENT.GET_SIGNED_PLAYER_INFO:
                    this._GetSignedPlayerInfo();
                    break;
                case EVENT.GET_ASID:
                    this._GetASIDAsync();
                    break;
                case EVENT.GET_SIGNED_ASID:
                    this._GetSignedASIDAsync();
                    break;
                case EVENT.CAN_SUBSCRIBE_BOT:
                    this._CanSubscribeBotAsync();
                    break;
                case EVENT.SUBSCRIBE_BOT:
                    this._SubscribeBotAsync();
                    break;
                default:
                    console.warn("[WortalPlayer] Received invalid event: " + event);
                    break;
            }
        };

        _GetID() {
            const id = window.Wortal.player.getID();
            this.PostToRuntime("player_set_id", id);
        }

        _GetName() {
            const name = window.Wortal.player.getName();
            this.PostToRuntime("player_set_name", name);
        }

        _GetPhoto() {
            const photo = window.Wortal.player.getPhoto();
            this.PostToRuntime("player_set_photo", photo);
        }

        _IsFirstPlay() {
            const isFirstPlay = window.Wortal.player.isFirstPlay();
            this.PostToRuntime("player_set_is_first_play", isFirstPlay);
        }

        _GetDataAsync(keys) {
            // The array wrapper in Construct was awkward to work with, when converting to a JSON string
            // it added extra metadata and empty entries and didn't feel very reliable for this purpose.
            // This method is not much better, but it works, and we can ensure we get the data in a
            // reliable format that we can work with.
            // Example key array:
            // {
            //   "data": ["items", "lives"]
            // }
            const keysJson = JSON.parse(keys);
            if (!keysJson.data) {
                this.PostToRuntime("error_callback", JSON.stringify({
                    code: "INVALID_PARAM",
                    message: "Keys did not have 'data' property.",
                    context: "player.getDataAsync",
                }));
                return;
            }
            const keysArr = keysJson.data;
            window.Wortal.player.getDataAsync(keysArr)
                .then(data => {
                    this.PostToRuntime("player_get_data_callback", JSON.stringify(data));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _SetDataAsync(data) {
            window.Wortal.player.setDataAsync(JSON.parse(data))
                .then(() => {
                    this.PostToRuntime("player_set_data_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _FlushDataAsync() {
            window.Wortal.player.flushDataAsync()
                .then(() => {
                    this.PostToRuntime("player_flush_data_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetConnectedPlayersAsync(payload) {
            let payloadObj;
            if (payload) {
                payloadObj = JSON.parse(payload)
            }
            window.Wortal.player.getConnectedPlayersAsync(payloadObj)
                .then(players => {
                    this.PostToRuntime("player_get_connected_players_callback", JSON.stringify(players));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetSignedPlayerInfo() {
            window.Wortal.player.getSignedPlayerInfoAsync()
                .then(info => {
                    this.PostToRuntime("player_get_signed_player_info_callback", JSON.stringify(info));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetASIDAsync() {
            window.Wortal.player.getASIDAsync()
                .then(asid => {
                    this.PostToRuntime("player_get_asid_callback", asid);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetSignedASIDAsync() {
            window.Wortal.player.getSignedASIDAsync()
                .then(signedASID => {
                    this.PostToRuntime("player_get_signed_asid_callback", JSON.stringify(signedASID));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _CanSubscribeBotAsync() {
            window.Wortal.player.canSubscribeBotAsync()
                .then(canSubscribe => {
                    this.PostToRuntime("player_can_subscribe_bot_callback", canSubscribe);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _SubscribeBotAsync() {
            window.Wortal.player.subscribeBotAsync()
                .then(() => {
                    this.PostToRuntime("player_subscribe_bot_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
