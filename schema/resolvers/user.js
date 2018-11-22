const users = require('../db/users.json');
const resumes = require('../db/resumes.json');
const {
  filter: _filter,
  find: _find,
} = require('lodash/collection');
const {
  isUndefined: _isUndefined,
} = require('lodash/lang');

const USER_TYPE = {
  TYPE_NORMAL: 0, // 平民百姓
  TYPE_MASTER: 1, // 管理员
  TYPE_SUPERMAN: 2, // 超人
  TYPE_AGENT: 3, // 代理商
};

const getUserType = (typeInt) => {
  return Object.keys(USER_TYPE)[Object.values(USER_TYPE).indexOf(typeInt)];
};

module.exports = {

  /**
   * User的相关查询操作
   */
  Query: {

    /**
     * 查询用户
     * @param root
     * @param filter
     * @returns {*}
     */
    findUsers:(root, {filter = {}}) => {
      let filterRules = {...filter};
      delete filterRules.hasResume;
      if (filterRules.isFF !== true) {
        delete filterRules.isFF;
      }

      // user type
      if (!_isUndefined(filterRules.type)) {
        filterRules.type = USER_TYPE[filterRules.type];
      }

      let userList = Object.keys(filterRules).length ?
        _filter(users, filterRules) :
        users;

      userList = userList.filter((user) => {
        if (filter.isFF === false) {
          return user.isFF !== true
        }

        const userResume = _find(resumes, {userId: user.id});
        if (filter.hasResume === true) {
          return !!userResume;
        } else if (filter.hasResume === false) {
          return !userResume
        }

        return true;
      });

      return userList;
    },
  },

  /**
   * Ad schema 关联user
   */
  User: {
    resume: (user) => _find(resumes, {userId: user.id}),
    type: (user) => {
      return getUserType(user.type);
    },
  },

  /**
   * 针对某用户相操作时查询当前user
   */
  Mutation: {
    user: (root, data) => {
      const user = _find(users, data);
      if (!user) {
        throw new Error('没有找到相关操作用户');
      }

      return _find(users, data);
    },
  },
};
