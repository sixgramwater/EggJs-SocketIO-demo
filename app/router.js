'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  router.post('/api/users/login', controller.users.login);
  router.get('/api/users/index', controller.users.index);
  // router.get('/api/user')
  // 这里表示对于监听到的 chat 事件，将由 app/io/controller/chat.js 处理
  io.of('/').route('chat', io.controller.chat.broadcast);
  io.of('/').route('connection', io.controller.chess.connection);
  io.of('/').route('drop',io.controller.chess.drop);

};
