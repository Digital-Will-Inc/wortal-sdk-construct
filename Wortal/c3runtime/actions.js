self.C3.Plugins.wortal.Acts =
{
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

    SetLoadingProgress(value) {
        this.WortalSDK('set_loading_progress', {
            value: value
        });
    },
};
