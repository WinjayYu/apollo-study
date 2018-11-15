const ads = require('../db/ads.json');
const users = require('../db/users.json');
const {
  filter: _filter,
  find: _find,
} = require('lodash/collection');

module.exports = {

  /**
   * Ad的相关查询操作
   */
  Query: {
    findAds: (root, {filter = {}}) => {
      return Object.keys(filter).length ?
        _filter(ads, filter) :
        ads
    },
  },

  /**
   * Ad schema 关联user
   */
  Ad: {
    user: (ad) => _find(users, {id: ad.userId})
  },

  /**
   * 针对用户相操作
   */
  UserOps: {
    createAd: (user, data) => {
      const newAd = Object.assign({
        id: ads.length + 1,
        createdTime: Math.floor(new Date() / 1000),
        userId: user.id
      }, data);
      ads.push(newAd);
      return newAd
    },
  }
};
