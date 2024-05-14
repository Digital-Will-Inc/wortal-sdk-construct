# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.0] - 2024-05-15
### BREAKING CHANGE
- Auto initialization has been removed from the SDK, games must now manually initialize the SDK.

### Added
- Core
  - Achievements API
  - Stats API
- Ads
  - Banner ads

### Changed
- Core
  - Updated to SDK Core v2
  - Updated example project
  - Updated documentation

## [2.4.0] - 2023-08-25
### Added
- Core
    - Tournament API
- Ads
    - isAdBlocked API
- Session
    - getDevice, getOrientation, onOrientationChange, switchGameAsync APIs

### Changed
- Core
    - Upgraded to SDK Core v1.6

## [2.3.0] - 2023-07-04
### Added
- Core
    - Added Notifications API
    - New APIs: getSupportedAPIs, performHapticFeedbackAsync
- Analytics
    - New events: logSocialInvite, logSocialShare, logPurchase, logPurchaseSubscription
- Context
    - New APIs: inviteAsync, shareLinkAsync, isSizeBetween

### Changed
- Core
    - Updated Wortal SDK Core to v1.5.0

## [2.2.0] - 2023-04-25
### Added
- Ads on Viber
- Group chat context for FB Instant Games
- Game ID parsing for FB Instant Games
- Converter util for FB leaderboards
- Ads API: noFill callback for ad calls
- Context APIs: getType, getPlayersAsync, shareLinkAsync, isSizeBetween
- Player API: flushDataAsync, getASIDAsync, getSignedASIDAsync, canSubscribeBotAsync, subscribeBotAsync
- Session API: getPlatform

### Changed
- Context and Player APIs now have optional null return values to match platform SDKs
- Improved docs
- Improved error handling

## [2.1.0] - 2023-02-21
### Added
- Support for FB Instant Games
- onPause callback

### Fixed
- Possible type mismatch for ad unit IDs

## [2.0.0] - 2022-12-19
### Breaking Change
- API access is now by module (Wortal.ads, Wortal.analytics), v1 API calls have been deprecated.

### Added
- Context API
- In-App Purchase API
- Leaderboard API
- Player API
- Session API
- Support for Game Distribution platform
- Examples in demo scene

### Changed
- Extension now uses Wortal SDK Core
- index.html no longer needs to be edited after export

### Changed

## [1.0.0] - 2022-10-13
- Initial release
