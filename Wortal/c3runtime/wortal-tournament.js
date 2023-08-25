"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_CURRENT: "tournament_get_current",
        GET_ALL: "tournament_get_all",
        POST_SCORE: "tournament_post_score",
        CREATE: "tournament_create",
        SHARE: "tournament_share",
        JOIN: "tournament_join",
    };

    const HANDLER_CLASS = class WortalTournamentDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-tournament", data => this._WortalTournament(data)]
            ]);
        };

        _WortalTournament(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_CURRENT:
                    this._GetCurrent();
                    break;
                case EVENT.GET_ALL:
                    this._GetAll();
                    break;
                case EVENT.POST_SCORE:
                    this._PostScore(args.score);
                    break;
                case EVENT.CREATE:
                    this._Create(args.payload);
                    break;
                case EVENT.SHARE:
                    this._Share(args.payload);
                    break;
                case EVENT.JOIN:
                    this._Join(args.tournamentID);
                    break;
                default:
                    console.warn("[WortalTournament] Received invalid event: " + event);
                    break;
            }
        };

        _GetCurrent() {
            window.Wortal.tournament.getCurrentAsync()
                .then(data => {
                    this.PostToRuntime("tournament_get_current_callback", JSON.stringify(data));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _GetAll() {
            window.Wortal.tournament.getAllAsync()
                .then(data => {
                    this.PostToRuntime("tournament_get_all_callback", JSON.stringify(data));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _PostScore(score) {
            window.Wortal.tournament.postScoreAsync(score)
                .then(() => {
                    this.PostToRuntime("tournament_post_score_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _Create(payload) {
            window.Wortal.tournament.createAsync(JSON.parse(payload))
                .then(data => {
                    this.PostToRuntime("tournament_create_callback", JSON.stringify(data));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _Share(payload) {
            window.Wortal.tournament.shareAsync(JSON.parse(payload))
                .then(() => {
                    this.PostToRuntime("tournament_share_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _Join(tournamentID) {
            window.Wortal.tournament.joinAsync(tournamentID)
                .then(() => {
                    this.PostToRuntime("tournament_join_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
