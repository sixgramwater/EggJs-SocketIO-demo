'use strict';

// const md5 = require('md5');
const Service = require('egg').Service;

let onlineList = [];

class ChessService extends Service{
  async addOnlineList(user={}, socketId){
    const i = onlineList.findIndex(item=>{
      return item.socketId === socketId;
    })
    if(i==-1){
      const para = {
        user,
        socketId,
        time: Date.now,
      }
      await onlineList.push(para);
      return onlineList.length;
    }
    else{
      return -1;
    }
  }

  async removeOnlineList(socketId){
    onlineList = await onlineList.filter(item=>{
      return item.socketId === socketId;
    })
  }

  async setUserInfo(user, socketId) {
    const i = await onlineList.findIndex(item=>{
      return item.socketId === socketId;
    })
    if(i==-1){
      return -1;
    }
    else{
      onlineList[i].user = user;
      return i;
    }
  }
  async getOnlineList(){
    return await onlineList;
  }

}

module.exports = ChessService;