'use strict';

// 将收到的消息发送给客户端
// module.exports = app => {
//   return function* () {
//     const message = this.args[0];
//     console.log('chat 控制器打印', message);
//     this.socket.emit('res', `Hi! I've got your message: ${message}`);
//   };
// };
const Controller = require('egg').Controller;

class DefaultController extends Controller {
  
    async ping() {
			const { ctx, app } = this;
			const message = ctx.args[0];
			console.log(message);
			await ctx.socket.emit('res', `Hi! I've got your message: ${message}`);
		}

		async broadcast() {
			const { ctx, app } = this;
			const para = ctx.args[0];
			console.log(para);
			await ctx.socket.in('defaultRoom').emit('res', para);
			
		}
}

module.exports = DefaultController;
