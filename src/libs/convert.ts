import isValid from 'date-fns/isValid'

/** 記録をポストするテキストに変換する */
export const recordToText = (record: DailyRecordInSheet) => `
天気：${record.weather}
起床時間：${record.getUpTime}
就寝時間：${record.goToBedTime}
気分：${record.feeling}
寝起き：${record.awakening}
体重：${record.weight}
体脂肪率：${record.fatPercentage}
食生活：${record.eating}
歩数：${record.steps}
散歩：${record.walking}
ランニング：${record.running}
HIIT：${record.hiit}
筋トレ：${record.training}
瞑想：${record.meditation}
ストレッチ：${record.stretch}
`

/** JSONとして送られてきた記録を入力用のオブジェクトに変換する */
export const recordJsonToInput = (json: DailyRecordInJson): DailyRecordInput =>
  Object.fromEntries(
    Object.entries(json).map(([k, v]) => {
      if (typeof v === 'string' && isValid(v)) return [k, new Date(v)]
      return [k, v]
    })
  )
