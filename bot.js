const express = require('express')
const app = express()
app.get('/', (req, res) => res.send('Bot is running ✅'))
app.listen(process.env.PORT || 3000, () => console.log('Web server started'))

const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'V7n30.aternos.me',
  port: 29953,
  username: 'V7z',
  version: false,
})

bot.once('spawn', () => {
  console.log('✅ البوت دخل السيرفر بنجاح!')
  startAntiAFK()
})

bot.on('kicked', (reason) => console.log('❌ تم طرد البوت:', reason))
bot.on('error', (err) => console.log('⚠️ خطأ:', err))
bot.on('end', () => console.log('🔌 انقطع الاتصال بالسيرفر'))

function startAntiAFK() {
  setInterval(() => {
    randomAction()
  }, 60 * 1000)
}

function randomAction() {
  const actions = ['jump', 'look', 'walk']
  const action = actions[Math.floor(Math.random() * actions.length)]

  switch (action) {
    case 'jump':
      bot.setControlState('jump', true)
      setTimeout(() => bot.setControlState('jump', false), 500)
      console.log('🦘 قفز')
      break
    case 'look':
      const yaw = Math.random() * Math.PI * 2
      const pitch = (Math.random() - 0.5) * Math.PI * 0.5
      bot.look(yaw, pitch, true)
      console.log('👀 هز الرأس')
      break
    case 'walk':
      const dir = ['forward', 'back', 'left', 'right'][Math.floor(Math.random() * 4)]
      bot.setControlState(dir, true)
      setTimeout(() => bot.setControlState(dir, false), 1000)
      console.log('🚶 تحرك:', dir)
      break
  }
}
