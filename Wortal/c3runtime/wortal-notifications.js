"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        SCHEDULE: "notifications_schedule",
        GET_HISTORY: "notifications_get_history",
        CANCEL: "notifications_cancel",
        CANCEL_ALL: "notifications_cancel_all",
    };

    const HANDLER_CLASS = class WortalNotificationsDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-notifications", data => this._WortalNotifications(data)]
            ]);
        };

        _WortalNotifications(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.SCHEDULE:
                    this._ScheduleAsync(args.payload);
                    break;
                case EVENT.GET_HISTORY:
                    this._GetHistoryAsync();
                    break;
                case EVENT.CANCEL:
                    this._CancelAsync(args.id);
                    break;
                case EVENT.CANCEL_ALL:
                    this._CancelAllAsync(args.label);
                    break;
                default:
                    console.warn("[WortalNotifications] Received invalid event: " + event);
                    break;
            }
        };

        _ScheduleAsync(payload) {
            window.Wortal.notifications.scheduleAsync(payload)
                .then(notification => {
                    this.PostToRuntime("notifications_schedule_callback", JSON.stringify(notification));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _GetHistoryAsync() {
            window.Wortal.notifications.getHistoryAsync()
                .then(notifications => {
                    this.PostToRuntime("notifications_get_history_callback", JSON.stringify(notifications));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _CancelAsync(id) {
            window.Wortal.notifications.cancelAsync(id)
                .then(success => {
                    this.PostToRuntime("notifications_cancel_callback", success);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };

        _CancelAllAsync(label) {
            window.Wortal.notifications.cancelAllAsync(label)
                .then(success => {
                    this.PostToRuntime("notifications_cancel_all_callback", success);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        };
    }

    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
