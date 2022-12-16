"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_LEADERBOARD: "leaderboard_get_leaderboard",
        SEND_ENTRY: "leaderboard_send_entry",
        GET_ENTRIES: "leaderboard_get_entries",
        GET_PLAYER_ENTRY: "leaderboard_get_player_entry",
        GET_ENTRY_COUNT: "leaderboard_get_entry_count",
        GET_CONNECTED_PLAYERS_ENTRIES: "leaderboard_get_connected_players_entries",
    };

    const HANDLER_CLASS = class WortalLeaderboardDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-leaderboard", data => this._WortalLeaderboard(data)]
            ]);
        };

        _WortalLeaderboard(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_LEADERBOARD:
                    this._GetLeaderboardAsync(args.name);
                    break;
                case EVENT.SEND_ENTRY:
                    this._SendEntryAsync(args.name, args.score, args.details);
                    break;
                case EVENT.GET_ENTRIES:
                    this._GetEntriesAsync(args.name, args.count, args.offset);
                    break;
                case EVENT.GET_PLAYER_ENTRY:
                    this._GetPlayerEntryAsync(args.name);
                    break;
                case EVENT.GET_ENTRY_COUNT:
                    this._GetEntryCountAsync(args.name);
                    break;
                case EVENT.GET_CONNECTED_PLAYERS_ENTRIES:
                    this._GetConnectedPlayersEntriesAsync(args.name, args.count, args.offset);
                    break;
                default:
                    console.warn("[WortalLeaderboard] Received invalid event: " + event);
                    break;
            }
        };

        _GetLeaderboardAsync(name) {
            window.Wortal.leaderboard.getLeaderboardAsync(name)
                .then(leaderboard => {
                    this.PostToRuntime("leaderboard_get_leaderboard_callback", JSON.stringify(leaderboard));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _SendEntryAsync(name, score, details) {
            window.Wortal.leaderboard.sendEntryAsync(name, score, details)
                .then(entry => {
                    this.PostToRuntime("leaderboard_send_entry_callback", JSON.stringify(entry));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetEntriesAsync(name, count, offset) {
            window.Wortal.leaderboard.getEntriesAsync(name, count, offset)
                .then(entries => {
                    this.PostToRuntime("leaderboard_get_entries_callback", JSON.stringify(entries));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetPlayerEntryAsync(name) {
            window.Wortal.leaderboard.getPlayerEntryAsync(name)
                .then(entry => {
                    this.PostToRuntime("leaderboard_get_player_entry_callback", JSON.stringify(entry));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetEntryCountAsync(name) {
            window.Wortal.leaderboard.getEntryCountAsync(name)
                .then(count => {
                    this.PostToRuntime("leaderboard_get_entry_count_callback", count);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetConnectedPlayersEntriesAsync(name, count, offset) {
            window.Wortal.leaderboard.getConnectedPlayersEntriesAsync(name, count, offset)
                .then(entries => {
                    this.PostToRuntime("leaderboard_get_connected_players_entries_callback", JSON.stringify(entries));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
