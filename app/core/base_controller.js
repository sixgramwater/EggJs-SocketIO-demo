'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {
  // get user() {
  //   return this.ctx.session.user;
  // }

  success(data, status) {
    this.ctx.body = { code: 200, data };
    this.ctx.status = status || 200;
  }

  fail(code, message) {
    this.ctx.body = { code, message, data: {} };
    this.ctx.status = 200;
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}

module.exports = BaseController;