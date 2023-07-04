"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        LOG_LEVEL_START: "analytics_log_level_start",
        LOG_LEVEL_END: "analytics_log_level_end",
        LOG_LEVEL_UP: "analytics_log_level_up",
        LOG_SCORE: "analytics_log_score",
        LOG_TUTORIAL_START: "analytics_log_tutorial_start",
        LOG_TUTORIAL_END: "analytics_log_tutorial_end",
        LOG_GAME_CHOICE: "analytics_log_game_choice",
        LOG_SOCIAL_INVITE: "analytics_log_social_invite",
        LOG_SOCIAL_SHARE: "analytics_log_social_share",
        LOG_PURCHASE: "analytics_log_purchase",
        LOG_PURCHASE_SUBSCRIPTION: "analytics_log_purchase_subscription",
    };

    const HANDLER_CLASS = class WortalAnalyticsDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-analytics", data => this._WortalAnalytics(data)]
            ]);
        }

        _WortalAnalytics(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
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
                case EVENT.LOG_TUTORIAL_START:
                    this._LogTutorialStart(args.tutorial);
                    break;
                case EVENT.LOG_TUTORIAL_END:
                    this._LogTutorialEnd(args.tutorial, args.wasCompleted);
                    break;
                case EVENT.LOG_GAME_CHOICE:
                    this._LogGameChoice(args.decision, args.choice);
                    break;
                case EVENT.LOG_SOCIAL_INVITE:
                    this._LogSocialInvite(args.placement);
                    break;
                case EVENT.LOG_SOCIAL_SHARE:
                    this._LogSocialShare(args.placement);
                    break;
                case EVENT.LOG_PURCHASE:
                    this._LogPurchase(args.productID, args.details);
                    break;
                case EVENT.LOG_PURCHASE_SUBSCRIPTION:
                    this._LogPurchaseSubscription(args.productID, args.details);
                    break;
                default:
                    console.warn("[WortalAnalytics] Received invalid event: " + event);
                    break;
            }
        }

        _LogLevelStart(level) {
            window.Wortal.analytics.logLevelStart(level);
        };

        _LogLevelEnd(level, score, wasCompleted) {
            let completed = wasCompleted > 0;
            window.Wortal.analytics.logLevelEnd(level, score, completed);
        };

        _LogLevelUp(level) {
            window.Wortal.analytics.logLevelUp(level);
        };

        _LogScore(score) {
            window.Wortal.analytics.logScore(score);
        };

        _LogTutorialStart(tutorial) {
            window.Wortal.analytics.logTutorialStart(tutorial);
        };

        _LogTutorialEnd(tutorial, wasCompleted) {
            let completed = wasCompleted > 0;
            window.Wortal.analytics.logTutorialEnd(tutorial, completed);
        };

        _LogGameChoice(decision, choice) {
            window.Wortal.analytics.logGameChoice(decision, choice);
        };

        _LogSocialInvite(placement) {
            window.Wortal.analytics.logSocialInvite(placement);
        };

        _LogSocialShare(placement) {
            window.Wortal.analytics.logSocialShare(placement);
        };

        _LogPurchase(productID, details) {
            window.Wortal.analytics.logPurchase(productID, details);
        };

        _LogPurchaseSubscription(productID, details) {
            window.Wortal.analytics.logPurchaseSubscription(productID, details);
        };
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
