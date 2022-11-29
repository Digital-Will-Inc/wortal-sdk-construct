self.C3.Plugins.wortal.Acts =
{
    AdsShowInterstitial(placement, description) {
        if (placement !== 'next' && placement !== 'browse' && placement !== 'pause' && placement !== 'start') {
            // This is the most common placement type, we'll just assign this if we've received an invalid type.
            placement = 'next';
        }
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

    SetLoadingProgress(value) {
        this.WortalSDK('set_loading_progress', {
            value: value
        });
    },

    ///////////////////////////////////////////////////////////////////////////////
    // V1 FUNCTIONS -- DEPRECATED
    ///////////////////////////////////////////////////////////////////////////////

    ShowInterstitial(placement, description) {
        this.WortalSDK('show_interstitial', {
            placement: placement,
            description: description,
        });
    },

    ShowRewarded(description) {
        this.WortalSDK('show_rewarded', {
            description: description,
        });
    },

    LogLevelStart(level) {
        this.WortalSDK('log_level_start', {
            level: level,
        });
    },

    LogLevelEnd(level, score) {
        this.WortalSDK('log_level_end', {
            level: level,
            score: score,
        });
    },

    LogLevelUp(level) {
        this.WortalSDK('log_level_up', {
            level: level,
        });
    },

    LogScore(score) {
        this.WortalSDK('log_score', {
            score: score,
        });
    },

    LogGameChoice(decision, choice) {
        this.WortalSDK('log_game_choice', {
            decision: decision,
            choice: choice,
        });
    },
};
