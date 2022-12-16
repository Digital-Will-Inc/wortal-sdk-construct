
const C3 = self.C3;
const DOM_COMPONENT_ID = "wortal_sdk_DOM";

C3.Plugins.wortal.Instance = class WortalInstance extends C3.SDKInstanceBase
{
	constructor(inst, properties)
	{
		super(inst, DOM_COMPONENT_ID);

        // SDK properties
        this._errorStatus = "";

        // Context properties
        this._contextId = "";
        this._shareResult = 0;

        // IAP properties
        this._isIAPEnabled = false;
        this._iapCatalog = "";
        this._iapPurchases = "";
        this._iapPurchaseReceipt = "";

        // Leaderboard properties
        this._leaderboard = "";
        this._leaderboardSendResult = "";
        this._leaderboardEntries = "";
        this._leaderboardPlayerEntry = "";
        this._leaderboardEntryCount = 0;
        this._leaderboardConnectedPlayersEntries = "";

        // Player properties
        this._playerId = "";
        this._playerName = "";
        this._playerPhoto = "";
        this._isFirstPlay = false;
        this._playerData = "";
        this._playerConnectedPlayers = "";
        this._playerSignedInfo = "";

        ////////////////////////////////////////////
        // Ads API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("before_ad_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.BeforeAdCallback);
        });

        this.AddDOMMessageHandler("after_ad_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.AfterAdCallback);
        });

        this.AddDOMMessageHandler("ad_dismissed_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.AdDismissedCallback);
        });

        this.AddDOMMessageHandler("ad_viewed_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.AdViewedCallback);
        });

        ////////////////////////////////////////////
        // Context API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("context_set_id", id => {
            this._contextId = id;
            this.Trigger(C3.Plugins.wortal.Cnds.ContextIDSet);
        });

        this.AddDOMMessageHandler("context_share_callback", shareResult => {
            this._shareResult = shareResult;
            this.Trigger(C3.Plugins.wortal.Cnds.ContextShareCallback);
        });

        this.AddDOMMessageHandler("context_update_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextUpdateCallback);
        });

        this.AddDOMMessageHandler("context_choose_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextChooseCallback);
        });

        this.AddDOMMessageHandler("context_switch_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextSwitchCallback);
        });

        this.AddDOMMessageHandler("context_create_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.ContextCreateCallback);
        });

        ////////////////////////////////////////////
        // In-App Purchasing API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("iap_set_enabled", enabled => {
            this._isIAPEnabled = enabled;
            this.Trigger(C3.Plugins.wortal.Cnds.IAPEnabledSet);
        });

        this.AddDOMMessageHandler("iap_get_catalog_callback", catalog => {
            this._iapCatalog = catalog;
            this.Trigger(C3.Plugins.wortal.Cnds.IAPGetCatalogCallback);
        });

        this.AddDOMMessageHandler("iap_get_purchases_callback", purchases => {
            this._iapPurchases = purchases;
            this.Trigger(C3.Plugins.wortal.Cnds.IAPGetPurchasesCallback);
        });

        this.AddDOMMessageHandler("iap_make_purchase_callback", receipt => {
            this._iapPurchaseReceipt = receipt;
            this.Trigger(C3.Plugins.wortal.Cnds.IAPMakePurchaseCallback);
        });

        this.AddDOMMessageHandler("iap_consume_purchase_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.IAPConsumePurchaseCallback);
        });

        ////////////////////////////////////////////
        // Leaderboard API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("leaderboard_get_leaderboard_callback", leaderboard => {
            this._leaderboard = leaderboard;
            this.Trigger(C3.Plugins.wortal.Cnds.LeaderboardGetLeaderboardCallback);
        });

        this.AddDOMMessageHandler("leaderboard_send_entry_callback", entry => {
            this._leaderboardSendResult = entry;
            this.Trigger(C3.Plugins.wortal.Cnds.LeaderboardSendEntryCallback);
        });

        this.AddDOMMessageHandler("leaderboard_get_entries_callback", entries => {
            this._leaderboardEntries = entries;
            this.Trigger(C3.Plugins.wortal.Cnds.LeaderboardGetEntriesCallback);
        });

        this.AddDOMMessageHandler("leaderboard_get_player_entry_callback", entry => {
            this._leaderboardPlayerEntry = entry;
            this.Trigger(C3.Plugins.wortal.Cnds.LeaderboardGetPlayerEntryCallback);
        });

        this.AddDOMMessageHandler("leaderboard_get_entry_count_callback", count => {
            this._leaderboardEntryCount = count;
            this.Trigger(C3.Plugins.wortal.Cnds.LeaderboardGetEntryCountCallback);
        });

        this.AddDOMMessageHandler("leaderboard_get_connected_players_entries_callback", entries => {
            this._leaderboardConnectedPlayersEntries = entries;
            this.Trigger(C3.Plugins.wortal.Cnds.LeaderboardGetConnectedPlayersEntriesCallback);
        });

        ////////////////////////////////////////////
        // Player API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("player_set_id", id => {
            this._playerId = id;
        });

        this.AddDOMMessageHandler("player_set_name", name => {
            this._playerName = name;
        });

        this.AddDOMMessageHandler("player_set_photo", photo => {
            this._playerPhoto = photo;
        });

        this.AddDOMMessageHandler("player_set_is_first_play", isFirstPlay => {
            this._isFirstPlay = isFirstPlay;
        });

        this.AddDOMMessageHandler("player_get_data_callback", data => {
            this._playerData = data;
            this.Trigger(C3.Plugins.wortal.Cnds.PlayerGetDataCallback);
        });

        this.AddDOMMessageHandler("player_set_data_callback", () => {
            this.Trigger(C3.Plugins.wortal.Cnds.PlayerSetDataCallback);
        });

        this.AddDOMMessageHandler("player_get_connected_players_callback", players => {
            this._playerConnectedPlayers = players;
            this.Trigger(C3.Plugins.wortal.Cnds.PlayerGetConnectedPlayersCallback);
        });

        this.AddDOMMessageHandler("player_get_signed_player_info_callback", info => {
            this._playerSignedInfo = info;
            this.Trigger(C3.Plugins.wortal.Cnds.PlayerGetSignedPlayerInfoCallback);
        });

        ////////////////////////////////////////////
        // SDK API
        ////////////////////////////////////////////
        this.AddDOMMessageHandler("error_callback", error => {
            this._errorStatus = error;
            this.Trigger(C3.Plugins.wortal.Cnds.ErrorCallback);
        });
	}

	Release()
	{
		super.Release();
	}

    WortalAds(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-ads", obj);
    };

    WortalAnalytics(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-analytics", obj);
    };

    WortalContext(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-context", obj);
    };

    WortalIAP(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-iap", obj);
    };

    WortalLeaderboard(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-leaderboard", obj);
    }

    WortalPlayer(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-player", obj);
    }

    WortalSDK(event, args) {
        const obj = {
            "event": event,
            "args": args,
        }
        this.PostToDOM("wortal-sdk", obj);
    };
};
