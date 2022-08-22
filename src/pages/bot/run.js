const robot = require('robotjs')
const opn = require('opn')
const copyToClipboard = require('sf-copy-to-clipboard')
const roomsJson = require('./rooms.json')
const { meta } = require('./meta')
const { delay } = require('./utils')
const { Actions } = require('./const')

function keyTapByAction(action) {
  const { key, modified } = meta[action]
  robot.keyTap(key, modified)
}
const bot = async() => {
  // eslint-disable-next-line no-console
  console.log('start')
  // const { groupName, sendData } = await view();
  // await delay(1000)
  opn('C:/Program Files (x86)/Tencent/WeChat/WeChat.exe')

  const rooms = roomsJson.default
  // const rooms = roomsJson[groupName];
  for (const roomName of rooms)
    await main(roomName)

  async function main(roomName) {
    await delay(1000)
    keyTapByAction(Actions.findInWeChat)

    await delay(1000)
    robot.keyTap('enter')

    await delay(1000)
    copyToClipboard(roomName)
    keyTapByAction(Actions.copy)

    // 现在进入群了
    await delay(2000)
    robot.keyTap('enter')

    // 输入文字
    await delay(1000)
    copyToClipboard('我是中文测试。我成功了')
    await delay(1000)
    keyTapByAction(Actions.copy)

    // 发送消息
    await delay(1000)
    robot.keyTap('enter')
  }
}

bot()

module.exports = {
  bot,
}
