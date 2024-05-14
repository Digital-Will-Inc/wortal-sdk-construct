"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_STATS: "stats_get",
        POST_STATS: "stats_post",
    };

    const HANDLER_CLASS = class WortalStatsDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-stats", data => this._WortalStats(data)]
            ]);
        }

        _WortalStats(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_STATS:
                    this._GetStatsAsync(args.level, args.payload);
                    break;
                case EVENT.POST_STATS:
                    this._PostStatsAsync(args.level, args.value, args.payload);
                    break;
                default:
                    console.warn("[WortalStats] Received invalid event: " + event);
                    break;
            }
        }

        _GetStatsAsync(level, payload) {
            window.Wortal.stats.getStatsAsync(level, payload)
                .then(stats => {
                    this.PostToRuntime("stats_get_callback", JSON.stringify(stats));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _PostStatsAsync(level, value, payload) {
            window.Wortal.stats.postStatsAsync(level, value, payload)
                .then(() => {
                    this.PostToRuntime("stats_post_callback");
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
