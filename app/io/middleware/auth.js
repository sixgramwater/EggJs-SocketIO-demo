'use strict';

// 这个中间件的作用是提示用户连接与断开的，连接成功的消息发送到客户端，断开连接的消息在服务端打印
module.exports = app => {
  return async function (ctx, next) {
    // const { ctx } = this;
    const { socket } = ctx;
    // const { service } = this;
    const nsp = app.io.of('/');
    // const para = ctx.args[0] || {};
    // const para = {};
    const id = socket.id;
    const room = 'defaultRoom';
    const rooms = [room];
    socket.join(room);
    // nsp.adapter.clients(rooms, (err, clients) => [
    //   nsp.to(room).emit('online', {
    //     clients,
    //     action: 'join',
    //     target: 'player',
    //     message: `User(${id}) joined.`,
    //     socketId: id,
    //   })
    // ])
    const PREFIX = 'onlineUser'
    let para = {
      socketId: id,
      user: null,
    }
    await app.redis.set(`${PREFIX}:${id}`, JSON.stringify(para));
    let temp = await app.redis.get(`${PREFIX}:${id}`);
    console.log(temp);
    console.log('#middleware: connection');

    // await service.chess.addOnlineList(id);
    // await console.log(service.chess.getOnlineList());
    // yield* next;
    await next();
    socket.leave(room);
    nsp.adapter.clients(rooms, (err, clients) => [
      nsp.to(room).emit('offline', {
        clients,
        action: 'leave',
        target: 'player',
        message: `User(${id}) leaved.`,
        socketId: id,
      })
    ])
    console.log('#middleware: disconnection!');
    temp = await app.redis.del(`${PREFIX}:${id}`);
    
    console.log(temp);
    // await service.chess.removeOnlineList(id);
    // await console.log(service.chess.getOnlineList());
  };
};

// module.exports = ()=>{
//   return async(ctx, next) => {
    

//     await next();

//   }
// }
