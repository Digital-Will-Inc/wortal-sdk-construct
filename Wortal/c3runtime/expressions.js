self.C3.Plugins.wortal.Exps =
{
    ////////////////////////////////////////////
    // Context API
    ////////////////////////////////////////////
    ContextID() {
        return this._contextId;
    },

    ContextShareResult() {
        return this._shareResult;
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

    ////////////////////////////////////////////
    // SDK API
    ////////////////////////////////////////////
    ErrorStatus() {
        return this._errorStatus;
    }
};
