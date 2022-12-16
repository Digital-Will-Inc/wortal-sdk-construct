"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_DATA: "player_get_data",
        SET_DATA: "player_set_data",
        GET_CONNECTED_PLAYERS: "player_get_connected_players",
        GET_SIGNED_PLAYER_INFO: "player_get_signed_player_info",
    };

    const HANDLER_CLASS = class WortalPlayerDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-player", data => this._WortalPlayer(data)]
            ]);

            // These shouldn't change at runtime, so we can just set them here.
            setTimeout(() => {
                this._GetID();
                this._GetName();
                this._GetPhoto();
                this._IsFirstPlay();
            }, 1000);
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
                case EVENT.GET_CONNECTED_PLAYERS:
                    this._GetConnectedPlayersAsync(args.payload);
                    break;
                case EVENT.GET_SIGNED_PLAYER_INFO:
                    this._GetSignedPlayerInfo();
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
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
