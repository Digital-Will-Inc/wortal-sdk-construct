self.C3.Plugins.wortal.Exps =
{
    ////////////////////////////////////////////
    // Context API
    ////////////////////////////////////////////
    ContextID() {
        return this._contextId;
    },

    ContextType() {
        return this._contextType;
    },

    ContextPlayers() {
        return this._contextPlayers;
    },

    ContextShareResult() {
        return this._shareResult;
    },

    ContextSizeResponse() {
        return this._contextSizeResponse;
    },

    ////////////////////////////////////////////
    // In-App Purchasing API
    ////////////////////////////////////////////
    IAPEnabled() {
        return this._isIAPEnabled ? 1 : 0;
    },

    IAPCatalog() {
        return this._iapCatalog;
    },

    IAPPurchases() {
        return this._iapPurchases;
    },

    IAPPurchaseReceipt() {
        return this._iapPurchaseReceipt;
    },

    ////////////////////////////////////////////
    // Leaderboard API
    ////////////////////////////////////////////
    CurrentLeaderboard() {
        return this._leaderboard;
    },

    LeaderboardSendResult() {
        return this._leaderboardSendResult;
    },

    LeaderboardEntries() {
        return this._leaderboardEntries;
    },

    LeaderboardPlayerEntry() {
        return this._leaderboardPlayerEntry;
    },

    LeaderboardEntryCount() {
        return this._leaderboardEntryCount;
    },

    LeaderboardConnectedPlayersEntries() {
        return this._leaderboardConnectedPlayersEntries;
    },

    ////////////////////////////////////////////
    // Notifications API
    ////////////////////////////////////////////
    NotificationScheduleResult() {
        return this._scheduleNotificationResult;
    },

    NotificationsScheduled() {
        return this._scheduledNotifications;
    },

    NotificationCancelSuccess() {
        return this._cancelNotificationSuccess ? 1 : 0;
    },

    NotificationCancelAllSuccess() {
        return this._cancelAllNotificationSuccess ? 1 : 0;
    },

    ////////////////////////////////////////////
    // Player API
    ////////////////////////////////////////////
    PlayerID() {
        return this._playerId;
    },

    PlayerName() {
        return this._playerName;
    },

    PlayerPhoto() {
        return this._playerPhoto;
    },

    PlayerIsFirstPlay() {
        return this._isFirstPlay ? 1 : 0;
    },

    PlayerData() {
        return this._playerData;
    },

    PlayerConnectedPlayers() {
        return this._playerConnectedPlayers;
    },

    PlayerSignedInfo() {
        return this._playerSignedInfo;
    },

    PlayerASID() {
        return this._playerASID;
    },

    PlayerSignedASID() {
        return this._playerSignedASID;
    },

    PlayerCanSubscribeBot() {
        return this._playerCanSubscribeBot ? 1 : 0;
    },

    ////////////////////////////////////////////
    // Session API
    ////////////////////////////////////////////
    EntryPointData() {
        return this._entryPointData;
    },

    EntryPoint() {
        return this._entryPoint;
    },

    Locale() {
        return this._locale;
    },

    TrafficSource() {
        return this._trafficSource;
    },

    SessionPlatform() {
        return this._sessionPlatform;
    },

    ////////////////////////////////////////////
    // Tournament API
    ////////////////////////////////////////////
    TournamentCurrent() {
        return this._tournamentCurrent;
    },

    TournamentAll() {
        return this._tournamentAll;
    },

    TournamentCreated() {
        return this._tournamentCreated;
    },

    ////////////////////////////////////////////
    // SDK API
    ////////////////////////////////////////////
    ErrorStatus() {
        return this._errorStatus;
    },

    SupportedAPIs() {
        return this._supportedAPIs;
    }
};
