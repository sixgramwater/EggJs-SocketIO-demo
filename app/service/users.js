'use strict';

// const md5 = require('md5');
const Service = require('egg').Service;

let users = [
  {
    userId: 0,
    userName: 'Ryuk',
    password: '123456',
    level: 1,
    points: 7550,
  },
  {
    userId: 1,
    userName: 'sixgramwater',
    password: '123456',
    level: 2,
    points: 6080,
    
  },
  {
    userId: 2,
    userName: 'user3',
    password: '123456',
    level: 2,
    points: 1000,
  },
  {
    userId: 3,
    userName: 'user4',
    password: '123456',
    level: 2,
    points: 1000,
  }
]
class UsersService extends Service{
  async login(userName, password){
    return await users.find(u => {
      return u.userName === userName && u.password === password;
      // console.log(u);
    });
  }

  async addUsers(userName, password) {
    
  }
}

module.exports = UsersService;
// export default UsersService;