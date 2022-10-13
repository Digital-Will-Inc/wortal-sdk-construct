"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        SHOW_INTERSTITIAL: 'show_interstitial',
        SHOW_REWARDED: "show_rewarded",
        LOG_LEVEL_START: "log_level_start",
        LOG_LEVEL_END: "log_level_end",
        LOG_LEVEL_UP: "log_level_up",
        LOG_SCORE: "log_score",
        LOG_GAME_CHOICE: "log_game_choice",
        SET_LOADING_PROGRESS: "set_loading_progress",
    };

    const HANDLER_CLASS = class WortalDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-sdk", data => this._WortalSDK(data)]
            ]);
        }

        _WortalSDK(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.SHOW_INTERSTITIAL:
                    this._ShowInterstitial(args.placement, args.description);
                    break;
                case EVENT.SHOW_REWARDED:
                    this._ShowRewarded(args.description);
                    break;
                case EVENT.LOG_LEVEL_START:
                    this._LogLevelStart(args.level);
                    break;
                case EVENT.LOG_LEVEL_END:
                    this._LogLevelEnd(args.level, args.score, args.wasCompleted);
                    break;
                case EVENT.LOG_LEVEL_UP:
                    this._LogLevelUp(args.level);
                    break;
                case EVENT.LOG_SCORE:
                    this._LogScore(args.score);
                    break;
                case EVENT.LOG_GAME_CHOICE:
                    this._LogGameChoice(args.decision, args.choice);
                    break;
                case EVENT.SET_LOADING_PROGRESS:
                    this._SetLoadingProgress(args.value);
                    break;
            }
        }

        _ShowInterstitial(placement, description) {
            window.triggerWortalAd(placement, gameData.linkInterstitialId, description, {
                beforeAd: () => {
                    console.log("[Wortal] BeforeAd");
                    this.PostToRuntime("before_ad");
                },
                // We should always receive only one of the following callbacks: afterAd, noShow or noBreak.
                // They all signal that the ad event is complete and that we should resume the game now.
                afterAd: () => {
                    console.log("[Wortal] AfterAd");
                    this.PostToRuntime("after_ad");
                },
                noShow: () => {
                    console.log("[Wortal] NoShow");
                    this.PostToRuntime("after_ad");
                },
                noBreak: () => {
                    console.log("[Wortal] NoBreak");
                    this.PostToRuntime("after_ad");
                },
                adBreakDone: () => {
                    console.log("[Wortal] AdBreakDone");
                }
            });
        }

        _ShowRewarded(description) {
            window.triggerWortalAd('reward', gameData.linkRewardedId, description, {
                beforeAd: () => {
                    console.log("[Wortal] BeforeAd");
                    this.PostToRuntime("before_ad");
                },
                // We should always receive only one of the following callbacks: afterAd, noShow or noBreak.
                // They all signal that the ad event is complete and that we should resume the game now.
                afterAd: () => {
                    console.log("[Wortal] AfterAd");
                    this.PostToRuntime("after_ad");
                },
                noShow: () => {
                    console.log("[Wortal] NoShow");
                    this.PostToRuntime("after_ad");
                },
                noBreak: () => {
                    console.log("[Wortal] NoBreak");
                    this.PostToRuntime("after_ad");
                },
                adDismissed: () => {
                    console.log("[Wortal] AdDismissed");
                    this.PostToRuntime("ad_dismissed");
                },
                adViewed: () => {
                    console.log("[Wortal] AdViewed");
                    this.PostToRuntime("ad_viewed");
                },
                // This is only called on AdSense, we need to call showAdFn() here to trigger the ad to show.
                beforeReward: (showAdFn) => {
                    console.log("[Wortal] BeforeReward");
                    showAdFn();
                },
                adBreakDone: () => {
                    console.log("[Wortal] AdBreakDone");
                }
            });
        }

        _LogLevelStart(level) {
            if (gameData.levelTimerHandle != null) {
                clearInterval(gameData.levelTimerHandle);
                gameData.levelTimerHandle = null;
            }
            gameData.levelName = level;
            gameData.levelTimer = 0;
            gameData.levelTimerHandle = setInterval(() => gameData.levelTimer += 1, 1000);
            this._LogEvent("LevelStart", {
                game: gameData.gameName,
                level: level,
            });
        }

        _LogLevelEnd(level, score) {
            if (gameData.levelTimerHandle != null) {
                clearInterval(gameData.levelTimerHandle);
                gameData.levelTimerHandle = null;
            }
            if (gameData.levelName !== level) {
                gameData.levelTimer = 0;
            }
            this._LogEvent("LevelEnd", {
                game: gameData.gameName,
                level: level,
                time: gameData.levelTimer,
                score: score,
            });
            gameData.levelTimer = 0;
        }

        _LogLevelUp(level) {
            this._LogEvent("LevelUp", {
                game: gameData.gameName,
                level: level
            });
        }

        _LogScore(score) {
            this._LogEvent("PostScore", {
                game: gameData.gameName,
                score: score
            });
        }

        _LogGameChoice(decision, choice) {
            this._LogEvent("GameChoice", {
                game: gameData.gameName,
                decision: decision,
                choice: choice,
            });
        }

        _LogEvent(name, features) {
            let request = new XMLHttpRequest();
            request.open("POST", "https://wombat.digitalwill.co.jp/wortal/events");
            request.setRequestHeader("Content-Type", "application/json");
            request.send(JSON.stringify({ name, features }));
        }

        _SetLoadingProgress(value) {
            if (window.wortalGame) {
                window.wortalGame.setLoadingProgress(value * 100);
            }
        }
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
