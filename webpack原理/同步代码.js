// index.js
import Resgiter from './Resgiter'

const resgiter = new Resgiter()
// A，B，C接力跑
resgiter.hooks.syncHook.tap('grabRedEnvelopePligin', sum => {
    console.log('A，跑完了！')
})
resgiter.hooks.syncHook.tap('grabRedEnvelopePligin', sum => {
    console.log('B，跑完了！')
})
resgiter.hooks.syncHook.tap('grabRedEnvelopePligin', sum => {
    console.log('C，跑完了！')
})
//执行顺序： A，跑完了 => B，跑完了！=> C，跑完了！
resgiter.syncHook()
