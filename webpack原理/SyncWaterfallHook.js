// index.js
import Resgiter from './Resgiter'
const resgiter = new Resgiter()

// 某团队包含ABC三人，计算再一次比赛中三人的总得分
resgiter.hooks.syncWaterfallHook.tap('countTotalScorePligin', score => {
    console.log('A得10分！')
    return score + 10
})

resgiter.hooks.syncWaterfallHook.tap('countTotalScorePligin', score => {
    console.log('B得12分！')
    return score + 12
})

resgiter.hooks.syncWaterfallHook.tap('countTotalScorePligin', score => {
    console.log('C得11分！')
    return score + 11
})

resgiter.hooks.syncWaterfallHook.tap('countTotalScorePligin', score => {
    console.log(`A，B，C三人的总得分为：${score}`)
})

resgiter.syncWaterfallHook(0)
