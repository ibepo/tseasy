const { Actions } = require('./const')

const meta = {
  [Actions.copy]: {
    key: 'v',
    modified: 'control',
  },
  [Actions.findInWeChat]: {
    key: 'f',
    modified: 'control',
  },
}

module.exports = {
  meta,
}
