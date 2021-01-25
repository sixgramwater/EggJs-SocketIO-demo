'use strict';

// 这个中间件的作用是将接收到的数据再发送给客户端
module.exports = app => {
  return function* (next) {
    // this.socket.emit('res', 'packet received!');
    console.log('packet:', this.packet);
    yield* next;
  };
};
