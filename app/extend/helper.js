
// export default {
//   /**
//  * 封装 socket 请求数据格式
//  * @param action 事件
//  * @param payload 数据
//  * @param metadata 元信息
//  */
//   parseMsg(action, payload = {}, metadata = {}) {
//     // 封装 meta 数据,添加当前时间轴
//     const meta = Object.assign({}, {
//         timestamp: Date.now(),
//     }, metadata);
//     // 格式化返回数据
//     return {
//         meta,
//         data: {
//             action,
//             payload,
//         },
//     };
//   },
// };