"use strict";

{
    const DOM_COMPONENT_ID = "wortal_sdk_DOM";
    const EVENT = {
        GET_ACHIEVEMENTS: "achievements_get",
        UNLOCK_ACHIEVEMENT: "achievements_unlock",
    };

    const HANDLER_CLASS = class WortalAchievementsDOMHandler extends self.DOMHandler {
        constructor(iRuntime) {
            super(iRuntime, DOM_COMPONENT_ID);

            this.AddRuntimeMessageHandlers([
                ["wortal-achievements", data => this._WortalAchievements(data)]
            ]);
        }

        _WortalAchievements(data) {
            let event = data["event"];
            let args = data["args"];
            switch (event) {
                case EVENT.GET_ACHIEVEMENTS:
                    this._GetAchievementsAsync();
                    break;
                case EVENT.UNLOCK_ACHIEVEMENT:
                    this._UnlockAchievementAsync(args.achievementId);
                    break;
                default:
                    console.warn("[WortalAchievements] Received invalid event: " + event);
                    break;
            }
        }

        _GetAchievementsAsync() {
            window.Wortal.achievements.getAchievementsAsync()
                .then(achievements => {
                    this.PostToRuntime("achievements_get_callback", JSON.stringify(achievements));
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }

        _UnlockAchievementAsync(achievementId) {
            window.Wortal.achievements.unlockAchievementAsync(achievementId)
                .then(wasUnlocked => {
                    this.PostToRuntime("achievements_unlock_callback", wasUnlocked);
                })
                .catch(error => {
                    this.PostToRuntime("error_callback", JSON.stringify(error));
                });
        }
    }


    self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
}
