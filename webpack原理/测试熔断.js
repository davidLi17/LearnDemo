// index.js
import Resgiter from './Resgiter'
const resgiter = new Resgiter()

resgiter.hooks.syncBailHook.tap('grabRedEnvelopePligin', sum => {
    console.log('A，抢到了，真开心！')
})
resgiter.hooks.syncBailHook.tap('grabRedEnvelopePligin', sum => {
    console.log('B，抢到了，真开心！')
})
resgiter.hooks.syncBailHook.tap('grabRedEnvelopePligin', sum => {
    if (sum >= 3) {
        console.log('C，抢到了，真开心！')
    }

    if (sum < 4) {
        console.log('C，抢完了！')
        return false // 返回值不是undefind，就会熔断，D被熔断，不在执行
    }
})
resgiter.hooks.syncBailHook.tap('grabRedEnvelopePligin', sum => {
    if (sum >= 4) {
        console.log('D，抢到了，真开心！')
    }

    if (sum < 5) {
        console.log('D，抢完了！')
        return false
    }
})

resgiter.syncBailHook(3) // 发三个红包
