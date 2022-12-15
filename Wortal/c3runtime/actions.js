self.C3.Plugins.wortal.Acts =
{
    ////////////////////////////////////////////
    // Ads API
    ////////////////////////////////////////////
    AdsShowInterstitial(placement, description) {
        this.WortalAds('ads_show_interstitial', {
            placement: placement,
            description: description,
        });
    },

    AdsShowRewarded(description) {
        this.WortalAds('ads_show_rewarded', {
            description: description,
        });
    },

    ////////////////////////////////////////////
    // Analytics API
    ////////////////////////////////////////////
    AnalyticsLogLevelStart(level) {
        this.WortalAnalytics('analytics_log_level_start', {
            level: level,
        });
    },

    AnalyticsLogLevelEnd(level, score, wasCompleted) {
        this.WortalAnalytics('analytics_log_level_end', {
            level: level,
            score: score,
            wasCompleted: wasCompleted,
        });
    },

    AnalyticsLogLevelUp(level) {
        this.WortalAnalytics('analytics_log_level_up', {
            level: level,
        });
    },

    AnalyticsLogScore(score) {
        this.WortalAnalytics('analytics_log_score', {
            score: score,
        });
    },

    AnalyticsLogTutorialStart(tutorial) {
        this.WortalAnalytics('analytics_log_tutorial_start', {
            tutorial: tutorial,
        });
    },

    AnalyticsLogTutorialEnd(tutorial, wasCompleted) {
        this.WortalAnalytics('analytics_log_tutorial_end', {
            tutorial: tutorial,
            wasCompleted: wasCompleted,
        });
    },

    AnalyticsLogGameChoice(decision, choice) {
        this.WortalAnalytics('analytics_log_game_choice', {
            decision: decision,
            choice: choice,
        });
    },

    ////////////////////////////////////////////
    // Context API
    ////////////////////////////////////////////
    ContextGetID() {
        this.WortalContext('context_get_id', {});
    },

    ContextShareAsync(payload) {
        this.WortalContext('context_share', {
            payload: payload,
        });
    },

    ContextUpdateAsync(payload) {
        this.WortalContext('context_update', {
            payload: payload,
        });
    },

    ContextChooseAsync(payload) {
        this.WortalContext('context_choose', {
            payload: payload,
        });
    },

    ContextSwitchAsync(contextId) {
        this.WortalContext('context_switch', {
            contextId: contextId,
        });
    },

    ContextCreateAsync(playerId) {
        this.WortalContext('context_create', {
            playerId: playerId,
        });
    },

    ////////////////////////////////////////////
    // SDK API
    ////////////////////////////////////////////
    SetLoadingProgress(value) {
        this.WortalSDK('set_loading_progress', {
            value: value
        });
    },

    ///////////////////////////////////////////////////////////////////////////////
    // V1 FUNCTIONS -- DEPRECATED
    ///////////////////////////////////////////////////////////////////////////////

    // Do not remove these as the docs state that will break projects that
    // were using them.

    ShowInterstitial(placement, description) {},
    ShowRewarded(description) {},
    LogLevelStart(level) {},
    LogLevelEnd(level, score) {},
    LogLevelUp(level) {},
    LogScore(score) {},
    LogGameChoice(decision, choice) {},
};
