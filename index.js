const request = require('request');
const HTTP = { GET: 'GET', POST: 'POST', PUT: 'PUT', DELETE: 'DELETE' };

class StreamElements {

  constructor(options) {
    
    // Establish the base URL for the API.
    this.base = options.base || 'https://api.streamelements.com/kappa/v2';
    
    // Store the user's access token in the instance.
    this.jwt = options.token;

    // Store the account ID of the channel we're accessing.
    this.accountId = options.accountId;

  }

  // Create a generic request wrapper.
  makeRequest(method, path, body, qs) {

    // Return a promise to allow developers to appropriately handle API responses.
    return new Promise((resolve, reject) => {

      request({
        method,
        qs,
        body,
        json: true,
        url: `${this.base}/${path}`,
        headers: {
          'Authorization': `Bearer ${this.jwt}`
        }
      }, (error, response, responseBody) => {

        // If there is a request error, reject the Promise.
        if (error) {
          return reject(error);
        }

        // If there is an error on the response body, reject the Promise.
        if (responseBody && responseBody.error) {
          return reject(responseBody.error);
        }

        // If we receive a status code other than 200 OK, reject the Promise.
        if (response.statusCode !== 200) {
          return reject(`Error encountered during request to StreamElements. Status Code: ${response.statusCode}`);
        }

        // If no errors have been encountered, resolve the Promise with the response body.
        return resolve(responseBody);

      });

    });

  }

  // /activities
  getActivities(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `activities/${channel}`);
  }
  getActivity(activityId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `activities/${channel}/${activityId}`);
  }
  replayActivity(activityId, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `activities/${channel}/${activityId}/replay`);
  }

  // /bot
  getBotStatus(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/${channel}`);
  }
  botPartChannel(channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/${channel}/part`);
  }
  botSay(message, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/${channel}/say`, { message });
  }
  botJoinChannel(channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/${channel}/join`);
  }
  botMute(channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/${channel}/mute`);
  }
  botUnmute(channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/${channel}/unmute`);
  }
  getBotUserLevels(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/${channel}/levels`);
  }
  setBotUserLevel(username, level, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/${channel}/levels`, { username, level });
  }
  deleteBotUserLevel(username, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `bot/${channel}/levels/${username}`, { id: 'levels' });
  }

  // /bot/commands
  getBotCommands(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/commands/${channel}`);
  }
  createBotCommand(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/commands/${channel}`, options);
  }
  getDefaultBotCommands(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/commands/${channel}/default`);
  }
  updateDefaultBotCommand(commandId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `bot/commands/${channel}/default/${commandId}`, options);
  }
  getBotCommand(commandId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/commands/${channel}/${commandId}`);
  }
  updateBotCommand(commandId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `bot/commands/${channel}/${commandId}`, options);
  }
  deleteBotCommand(command, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `bot/commands/${channel}/${commandId}`);
  }

  // /bot/timers
  getBotTimers(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/timers/${channel}`);
  }
  createBotTimer(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `bot/timers/${channel}`, options);
  }
  getBotTimer(timerId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `bot/timers/${channel}/${timerId}`);
  }
  updateBotTimer(timerId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `bot/timers/${channel}/${timerId}`, options);
  }
  deleteBotTimer(timerId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `bot/timers/${channel}/${timerId}`);
  }

  // /changelogs
  getLatestChangelog() {
    return this.makeRequest(HTTP.GET, `changelogs/latest`);
  }
  getFirstChangelog() {
    return this.makeRequest(HTTP.GET, `changelogs/first`);
  }

  // /channels
  getCurrentChannel() {
    return this.makeRequest(HTTP.GET, `channels/me`);
  }
  getChannel(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `channels/${channel}`);
  }
  getChannelEmotes(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `channels/${channel}/emotes`);
  }
  getChannelDetails(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `channels/${channel}/details`);
  }
  updateChannelProfile(options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `channels/${channel}/profile`, options);
  }
  getChannelUsers(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `channels/${channel}/users`);
  }
  updateUserAccessLevel(userId, role, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `channels/${channel}/users/${userId}`, { role })
  }
  deleteUserAccess(userId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `channels/${channel}/users/${userId}`);
  }
  roleplayAsUser(channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `channels/${channel}/roleplay`);
  }

  // /contests
  getContests(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `contests/${channel}`);
  }
  createContest(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `contests/${channel}`, options);
  }
  getCompletedContests(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `contests/${channel}/history`);
  }
  getContest(contestId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `contests/${channel}/${contestId}`);
  }
  updateContest(contestId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `contests/${channel}/${contestId}`, options);
  }
  deleteContest(contestId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `contests/${channel}/${contestId}`);
  }
  createContestBet(contestId, optionId, amount, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `contests/${channel}/${contestId}/bet`, { optionId, amount });
  }
  getContestBet(contestId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `contests/${channel}/${contestId}/bet`);
  }
  startContest(contestId, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `contests/${channel}/${contestId}/start`);
  }
  setContestWinner(contestId, winnerId, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `contests/${channel}/${contestId}/winner`, { winnerId });
  }
  refundContest(contestId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `contests/${channel}/${contestId}/refund`);
  }
  closeContest(contestId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `contests/${channel}/${contestId}/stop`);
  }

  // /giveaways
  getGiveaways(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `giveaways/${channel}`);
  }
  createGiveaway(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `giveaways/${channel}`);
  }
  getPastGiveaways(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `giveaways/${channel}/history`);
  }
  getGiveaway(giveawayId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `giveaways/${channel}/${giveawayId}`);
  }
  buyGiveawayTickets(giveawayId, tickets, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `giveaways/${channel}/${giveawayId}`, { tickets });
  }
  updateGiveaway(giveawayId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `giveaways/${channel}/${giveawayId}`, options);
  }
  deleteGiveaway(giveawayId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `giveaways/${channel}/${giveawayId}`);
  }
  getUserGiveawayStatus(giveawayId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `giveaways/${channel}/${giveawayId}/joined`);
  }
  completeGiveaway(giveawayId, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `giveaways/${channel}/${giveawayId}/complete`);
  }
  refundGiveaway(giveawayId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `giveaways/${channel}/${giveawayId}/refund`);
  }
  closeGiveaway(giveawayId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `giveaways/${channel}/${giveawayId}/close`);
  }

  // /logs
  getLogs(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `logs/${channel}`);
  }

  // /loyalty
  getLoyaltySettings(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `loyalty/${channel}`);
  }
  updateLoyaltySettings(options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `loyalty/${channel}`);
  }

  // /overlays
  getOverlays(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `overlays/${channel}`);
  }
  createOverlay(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `overlays/${channel}`, options);
  }
  getOverlay(overlayId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `overlays/${channel}/${overlayId}`);
  }
  updateOverlay(overlayId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `overlays/${channel}/${overlayId}`, options);
  }
  deleteOverlay(overlayId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `overlays/${channel}/${overlayId}`);
  }

  // /points
  updatePoints(options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `points/${channel}`, options);
  }
  getUserPoints(userId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `points/${channel}/${userId}`);
  }
  deleteUserPoints(userId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `points/${channel}/${userId}`);
  }
  addUserPoints(userId, amount, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `points/${channel}/${userId}/${Math.abs(amount)}`);
  }
  removeUserPoints(userId, amount, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `points/${channel}/${userId}/${-Math.abs(amount)}`);
  }
  getUserRank(userId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `points/${channel}/${userId}/rank`);
  }
  resetPointsLeaderboard(channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `points/${channel}/reset/current`);
  }
  resetAlltimePointsLeaderboard(channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `points/${channel}/reset/alltime`);
  }
  getTopPointsUsersAlltime(limit, offset, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `points/${channel}/alltime`, {}, { limit, offset });
  }
  getTopPointsUsers(limit, offset, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `points/${channel}/top`, {}, { limit, offset });
  }

  // /sessions
  getUserSessionData(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `sessions/${channel}`);
  }
  updateUserSessionData(options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `sessions/${channel}`, options);
  }
  resetUserSessionData(channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `sessions/${channel}/reset`);
  }
  reloadUserSessionData(channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `sessions/${channel}/reload`);
  }

  // /songrequest
  getSongRequestSettings(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `songrequest/${channel}/settings`);
  }
  updateSongRequestSettings(options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `songrequest/${channel}/settings`, options);
  }
  getPublicSongRequestSettings(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `songrequest/${channel}/public`);
  }
  getSongRequestQueue(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `songrequest/${channel}/queue`);
  }
  createSongRequest(song, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `songrequest/${channel}/queue`, { song });
  }
  getSongRequestHistory(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `songrequest/${channel}/queue/history`);
  }
  skipCurrentSong(channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `songrequest/${channel}/queue/skip`);
  }
  deleteSongRequest(songId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `songrequest/${channel}/queue/${songId}`);
  }
  clearSongRequestQueue(channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `songrequest/${channel}/clear`);
  }
  getCurrentSong(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `songrequest/${channel}/playing`);
  }

  // /speech
  generateSpeech(text, voice = 'Joanna') {
    return this.makeRequest(HTTP.GET, `speech`, {}, { text, voice });
  }
  getSpeechVoices() {
    return this.makeRequest(HTTP.GET, `speech/voices`);
  }

  // /stats
  getDailyStats(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `stats/${channel}/daily`);
  }
  getMonthlyStats(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `stats/${channel}/monthly`);
  }

  // /store
  getStoreItems(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `store/${channel}/items`);
  }
  createStoreItem(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `store/${channel}/items`, options);
  }
  getStoreItem(itemId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `store/${channel}/items/${itemId}`);
  }
  updateStoreItem(itemId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `store/${channel}/items/${itemId}`);
  }
  deleteStoreItem(itemId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `store/${channel}/items/${itemId}`);
  }
  getStoreRedemptions(limit, offset, pending, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `store/${channel}/redemptions`, {}, { limit, offset, pending });
  }
  getStoreRedemption(redemptionId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `store/${channel}/redemptions/${redemptionId}`);
  }
  updateStoreRedemption(redemptionId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `store/${channel}/redemptions/${redemptionId}`, options);
  }
  deleteStoreRedemption(redemptionId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `store/${channel}/redemptions/${redemptionId}`);
  }
  createStoreRedemption(itemId, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `store/${channel}/redemptions/${itemId}`);
  }

  // /streams
  getStreams(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `streams/${channel}`);
  }
  getStreamStatus(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `streams/${channel}/live`);
  }
  getStreamDetails(streamId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `streams/${channel}/${streamId}`);
  }

  // /themes
  getThemes() {
    return this.makeRequest(HTTP.GET, `themes`);
  }
  getTheme(themeId) {
    return this.makeRequest(HTTP.GET, `themes/${themeId}`);
  }
  createOverlayFromTheme(themeId, options) {
    return this.makeRequest(HTTP.POST, `themes/${themeId}`, options);
  }
  rateTheme(themeId, rating) {
    return this.makeRequest(HTTP.POST, `themes/${themeId}/rate`, { rating });
  }
  getThemeRatingForChannel(themeId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `themes/${themeId}/${channel}/rating`);
  }

  // /tipping
  getTippingExchangeRates() {
    return this.makeRequest(HTTP.GET, `tipping/rates`);
  }
  getTippingSettings(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `tipping/${channel}`);
  }
  updateTippingSettings(options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `tipping/${channel}`, options);
  }

  // /tips
  getTips(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `tips/${channel}`);
  }
  createTip(options, channel = this.accountId) {
    return this.makeRequest(HTTP.POST, `tips/${channel}`, options);
  }
  getTopTippers(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `tips/${channel}/top`);
  }
  getTipLeaderboard(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `tips/${channel}/leaderboard`);
  }
  getRecentTips(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `tips/${channel}/moderation`);
  }
  getTip(tipId, channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `tips/${channel}/${tipId}`);
  }
  updateTip(tipId, options, channel = this.accountId) {
    return this.makeRequest(HTTP.PUT, `tips/${channel}/${tipId}`, options);
  }
  deleteTip(tipId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `tips/${channel}/${tipId}`);
  }

  // /uploads
  getAssets(channel = this.accountId) {
    return this.makeRequest(HTTP.GET, `uploads/${channel}`);
  }
  deleteAsset(assetId, channel = this.accountId) {
    return this.makeRequest(HTTP.DELETE, `uploads/${channel}/${assetId}`);
  }

  // /users
  getCurrentUser() {
    return this.makeRequest(HTTP.GET, `users/current`);
  }
  getUserChannels() {
    return this.makeRequest(HTTP.GET, `users/channels`);
  }
  getChannelAccess() {
    return this.makeRequest(HTTP.GET, `users/access`);
  }

}

module.exports = StreamElements;