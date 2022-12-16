self.C3.Plugins.wortal.Cnds =
{
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

    ////////////////////////////////////////////
    // Context API
    ////////////////////////////////////////////
    ContextIDSet() {
        return true;
    },

    ContextShareCallback() {
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

    ////////////////////////////////////////////
    // In-App Purchasing API
    ////////////////////////////////////////////
    IAPEnabledSet() {
        return true;
    },

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
    // Player API
    ////////////////////////////////////////////
    PlayerGetDataCallback() {
        return true;
    },

    PlayerSetDataCallback() {
        return true;
    },

    PlayerGetConnectedPlayersCallback() {
        return true;
    },

    PlayerGetSignedPlayerInfoCallback() {
        return true;
    },

    ////////////////////////////////////////////
    // SDK API
    ////////////////////////////////////////////
    ErrorCallback() {
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
