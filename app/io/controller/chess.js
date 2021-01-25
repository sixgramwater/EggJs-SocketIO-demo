'use strict';

// 将收到的消息发送给客户端
// module.exports = app => {
//   return function* () {
//     const message = this.args[0];
//     console.log('chat 控制器打印', message);
//     this.socket.emit('res', `Hi! I've got your message: ${message}`);
//   };
// };
const UserList = [];
const Controller = require('egg').Controller;

class ChessController extends Controller {
    async ping() {
			const { ctx, app } = this;
			const message = ctx.args[0];
			console.log(message);
			await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
		}

		async index() {
			const { ctx, app } = this;
      const para = ctx.args[0] || {};
      const nsp = app.io.of('/');
      // defaultRoom 连接信息列表
      nsp.adapter.clients(['defaultRoom'], (err, clients) => {
          console.log(JSON.stringify(clients));
      }); 
			// console.log(para);
			await ctx.socket.in('defaultRoom').emit('res', para);
			
    }

    async drop() {
      const { ctx, app } = this;
      const para = ctx.args[0] || {};
      console.log('#drop', para);
      const { x, y, player } = para;
 
      // await ctx.socket.broadcast.emit('drop',para);
      await ctx.socket.to('defaultRoom').emit('drop', para);
    }

    async select() {
      const { ctx, app } = this;
      const para = ctx.args[0] || {};
      const { socket } = ctx;
      const id = socket.id;
      const { index, user } = para;
      console.log('#selectPos', para);
      const PREFIX = 'atTable'
      
      app.redis.set(`${PREFIX}:${index}`, JSON.stringify(user));

      await ctx.socket.to('defaultRoom').emit('selectPos', para);
    }

    async connection() {
      const { ctx, app } = this;
      const { socket, logger } = ctx;
      const nsp = app.io.of('/');
      const para = ctx.args[0] || {};
      const id = socket.id;
      const room = 'defaultRoom';
      const rooms = [room];
      socket.join(room);
      console.log('收到连接请求',para);
      const PREFIX = 'onlineUser';
      let item = JSON.parse(await app.redis.get(`${PREFIX}:${id}`));
      item.user = para;
      await app.redis.set(`${PREFIX}:${id}`, JSON.stringify(item));
      // await app.redis.scan(0,`${PREFIX}*`)
      // 获取当前房间的所有用户
      const keys = await app.redis.keys(`${PREFIX}*`);
      console.log('keys',keys);
      let onlineList = await app.redis.mget(...keys);
      onlineList = onlineList.map(item=>{
        return JSON.parse(item);
      })
      onlineList = onlineList.filter(item=>{
        return item.user !== null;
      })
      console.log('onlineList', onlineList);
      console.log(onlineList.length);
      ctx.socket.emit('updateOnlineList', onlineList);
      nsp.adapter.clients(rooms, (err, clients) => {
        logger.debug('#online_join', clients);

        // 更新在线用户列表
        nsp.to(room).emit('online', {
          clients,
          action: 'join',
          target: 'participator',
          message: `User(${id}) joined.`,
          user: para,
          socketId: id,
          // onlineList,
        });
      });
    }
}

module.exports = ChessController;
