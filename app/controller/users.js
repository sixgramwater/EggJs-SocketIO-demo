'use strict';

const Controller = require('../core/base_controller');
// const Controller = require('egg').Controller;

class UsersController extends Controller {
    async index() {
    //   const { ctx } = this;
			const { ctx, service } = this;
			const users = await service.users.findAll();
			console.log(users);
			ctx.body = users;
			ctx.status = 200;
      // ctx.body = 'hi, egg';
		}
		
		async show() {
			const { ctx, service } = this;
			const uid = ctx.params.id;
			const user = await service.users.find(uid);
			ctx.body = user;
			ctx.status = 200;
		}

		async edit() {

		}

		async create() {
      const { ctx, service } = this;
      const { userName, password } = ctx.request.body;
      let userNameExist = await service.users.checkUsernNameExist(userName);
      if(userNameExist) {
        this.fail(402, '用户名已存在');
        return false;
      }
      let userId = await service.users.create(userName, password);
      let result = {
        userId
      }
      this.success(result);
			// const new_user = ctx.params;

    }
    
    async login() {
      const { ctx, service } = this;
      const { userName, password } = ctx.request.body;
      console.log(userName);
      let user;
      user = await service.users.login(userName, password);
      console.log(user);
      if(!user){
        return this.fail(401, '账号或密码错误');
      }
      // const { userName, userId, points, level } = user;
      let token = 'sixgramwater123456';
      let result = {
        userName: user.userName,
        userId: user.userId,
        token: user.token,
        points: user.points,
        level: user.level,
        token,
      }
      // const result = { userName, userId, token, points, level };
      this.success(result);

    }

    async modifyPassword() {

    }

    // async 
  }
  
module.exports = UsersController;