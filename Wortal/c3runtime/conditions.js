self.C3.Plugins.wortal.Cnds =
{
    ////////////////////////////////////////////
    // Achievements API
    ////////////////////////////////////////////
    AchievementsGetCallback() {
        return true;
    },

    AchievementUnlockCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Ads API
    ////////////////////////////////////////////
    BeforeAdCallback() {
        return true;
    },

    AfterAdCallback() {
        return true;
    },

    AdDismissedCallback() {
        return true;
    },

    AdViewedCallback() {
        return true;
    },

    AdNoFillCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Context API
    ////////////////////////////////////////////
    ContextIDSet() {
        return true;
    },

    ContextTypeSet() {
        return true;
    },

    ContextGetPlayersCallback() {
        return true;
    },

    ContextInviteCallback() {
        return true;
    },

    ContextShareCallback() {
        return true;
    },

    ContextShareLinkCallback() {
        return true;
    },

    ContextUpdateCallback() {
        return true;
    },

    ContextChooseCallback() {
        return true;
    },

    ContextSwitchCallback() {
        return true;
    },

    ContextCreateCallback() {
        return true;
    },

    ContextSizeResponseSet() {
        return true;
    },

    ////////////////////////////////////////////
    // In-App Purchasing API
    ////////////////////////////////////////////
    IAPGetCatalogCallback() {
        return true;
    },

    IAPGetPurchasesCallback() {
        return true;
    },

    IAPMakePurchaseCallback() {
        return true;
    },

    IAPConsumePurchaseCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Leaderboard API
    ////////////////////////////////////////////
    LeaderboardGetLeaderboardCallback() {
        return true;
    },

    LeaderboardSendEntryCallback() {
        return true;
    },

    LeaderboardGetEntriesCallback() {
        return true;
    },

    LeaderboardGetPlayerEntryCallback() {
        return true;
    },

    LeaderboardGetEntryCountCallback() {
        return true;
    },

    LeaderboardGetConnectedPlayersEntriesCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Notifications API
    ////////////////////////////////////////////
    NotificationsScheduleCallback() {
        return true;
    },

    NotificationsGetHistoryCallback() {
        return true;
    },

    NotificationsCancelCallback() {
        return true;
    },

    NotificationsCancelAllCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Player API
    ////////////////////////////////////////////
    PlayerGetDataCallback() {
        return true;
    },

    PlayerSetDataCallback() {
        return true;
    },

    PlayerFlushDataCallback() {
        return true;
    },

    PlayerGetConnectedPlayersCallback() {
        return true;
    },

    PlayerGetSignedPlayerInfoCallback() {
        return true;
    },

    PlayerGetASIDCallback() {
        return true;
    },

    PlayerGetSignedASIDCallback() {
        return true;
    },

    PlayerCanSubscribeBotCallback() {
        return true;
    },

    PlayerSubscribeBotCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Session API
    ////////////////////////////////////////////
    SessionGetEntryPointCallback() {
        return true;
    },

    SessionOnOrientationChangeCallback() {
        return true;
    },

    SessionSwitchGameCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Stats API
    ////////////////////////////////////////////
    StatsGetStatsCallback() {
        return true;
    },

    StatsPostStatsCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // Tournament API
    ////////////////////////////////////////////
    TournamentGetCurrentCallback() {
        return true;
    },

    TournamentGetAllCallback() {
        return true;
    },

    TournamentPostScoreCallback() {
        return true;
    },

    TournamentCreateCallback() {
        return true;
    },

    TournamentShareCallback() {
        return true;
    },

    TournamentJoinCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // SDK API
    ////////////////////////////////////////////
    InitializeCallback() {
        return true;
    },

    StartGameCallback() {
        return true;
    },

    ErrorCallback() {
        return true;
    },

    PauseCallback() {
        return true;
    },

    HapticFeedbackCallback() {
        return true;
    },

    GetSupportedAPIsCallback() {
        return true;
    },

    ///////////////////////////////////////////////////////////////////////////////
    // V1 CALLBACKS -- DEPRECATED
    ///////////////////////////////////////////////////////////////////////////////

    // Do not remove these as the docs state that will break projects that
    // were using them.

    OnBeforeAd() {return false;},
    OnAfterAd() {return false;},
    OnAdDismissed() {return false;},
    OnAdViewed() {return false;},
};
