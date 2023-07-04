# Wortal SDK for Construct

## Installation

1. Install the plugin from the [Construct Addons](https://www.construct.net/en/make-games/addons/897/wortal) page
2. Add the `WortalSDK` object type into your project

## How to Use

### Loading Progress

Wortal SDK requires reporting of the layout loading progress. Add the following to your event sheet:

![Loading Progress](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-loading-progress.jpg)

### Demo Project

You can see the [Wortal Demo Project](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/wortal-demo.c3p) for an example of how to use the SDK.

### Ads

[API Reference](https://sdk.html5gameportal.com/api/ads/)

Interstitial ads can be shown at various points in the game such as a level end, restart or a timed
interval in games with longer levels.

Rewarded ads can be shown too. These are longer, optional ads that the player can earn a reward for watching. The player
must be notified of the ad and give permission to show before it can be shown.

![Ads API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-ads.jpg)

**NOTE**: Players should only be rewarded in the `adViewed` callback.

### Analytics

[API Reference](https://sdk.html5gameportal.com/api/analytics/)

The Analytics API can be used to track game events that can help better understand how players are interacting with
the game. This data will be available for viewing in the Wortal dashboard.

![Analytics API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-analytics.jpg)

### Context

[API Reference](https://sdk.html5gameportal.com/api/context/)

The Context API is used to connect players and allow them to interact in the game session, share their content
and send messages to each other.

![Context API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-context.jpg)

### In-App Purchases

[API Reference](https://sdk.html5gameportal.com/api/iap/)

The In-App Purchases (IAP) API is used to provide an interface for in-game transactions on the platforms.
This process will differ based on what platform the game is being played on, but the API remains the same.

![In-App Purchasing API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-iap.jpg)

### Leaderboards

[API Reference](https://sdk.html5gameportal.com/api/leaderboard/)

The Leaderboard API gives the game access to the platform's leaderboard functionality. This is where
you can track player's scores and compare them to other players.

![Leaderboard API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-leaderboard.jpg)

### Player

[API Reference](https://sdk.html5gameportal.com/api/player/)

You can find details about the current player via the Player API.

![Player API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-player.jpg)

### Session

[API Reference](https://sdk.html5gameportal.com/api/session/)

Details about the current session can be accessed in the Session API.

![Session API Example](https://github.com/Digital-Will-Inc/wortal-sdk-construct/blob/master/docs/img/construct-session.jpg)
