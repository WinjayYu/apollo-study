const resumes = require('../db/resumes.json');
const users = require('../db/users.json');
const {
  filter: _filter,
  find: _find,
} = require('lodash/collection');
const {
  findIndex: _findIndex,
} = require('lodash/array');
const {
  isUndefined: _isUndefined,
} = require('lodash/lang');

module.exports = {

  /**
   * User的相关查询操作
   */
  Query: {

    /**
     * 简历查询接口
     * @param root
     * @param filter
     */
    findResumes:(root, {filter = {}}) => {
      let {
        expectedSalaryIntervalStart: sStart,
        expectedSalaryIntervalEnd: sEnd
      } = filter;

      delete filter.expectedSalaryIntervalStart;
      delete filter.expectedSalaryIntervalEnd;

      const resumeList = Object.keys(filter).length ?
        _filter(resumes, filter) :
        resumes;

      const isSalaryFind = !_isUndefined(sStart) || !_isUndefined(sEnd);
      if (isSalaryFind) {
        if (sStart < 0) sStart = 0;
        if (sEnd < 0) sEnd = 0;
        if (sStart > sEnd) throw new Error('期望工资区间参数错误');
      }

      return resumeList.filter((resume) => {
        const salary = resume.expectedSalary;
        if (!isSalaryFind) return true;
        return salary >= sStart && salary <= sEnd
      });
    },
  },

  /**
   * Ad schema 关联user
   */
  Resume: {
    user: (resume) => _find(users, {id: resume.userId})
  },


  /**
   * 针对用户相操作
   */
  UserOps: {

    /**
     * 对用户创建简历
     * @param user
     * @param data
     * @returns {*}
     */
    createResume: (user, data) => {
      // 先去捞一把看简历是否存在
      let resume = _find(resumes, {userId: user.id});
      if (resume) {
        throw new Error('用户简历已经存在');
      }

      resume = Object.assign({
        id: resumes.length + 1,
        userId: user.id
      }, data);

      resumes.push(resume);
      return resume
    },

    /**
     * 对用户更新简历
     * @param user
     * @param data
     */
    updateResume: (user, data) => {
      // 先去捞一把看简历是否存在
      let resume = _find(resumes, {userId: user.id});
      if (!resume) {
        throw new Error('用户简历不存在');
      }

      const newResume = Object.assign(resume, data);
      resumes.splice(_findIndex(resumes, {id: resume.id}), 1, newResume);

      return newResume;
    }
  }
};
