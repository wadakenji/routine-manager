import isValid from 'date-fns/isValid'

/** 記録をポストするテキストに変換する */
export const recordToText = ({
  weather,
  getUpTime,
  goToBedTime,
  feeling,
  awakening,
  weight,
  fatPercentage,
  eating,
  steps,
  walking,
  running,
  hiit,
  training,
  meditation,
  stretch,
}: DailyRecordInSheet) =>
  (weather ? `天気：${weather}\n` : '') +
  (getUpTime ? `起床時間：${getUpTime}\n` : '') +
  (goToBedTime ? `就寝時間：${goToBedTime}\n` : '') +
  (feeling ? `気分：${feeling}\n` : '') +
  (awakening ? `寝起き：${awakening}\n` : '') +
  (weight ? `体重：${weight}\n` : '') +
  (fatPercentage ? `体脂肪率：${fatPercentage}\n` : '') +
  (eating ? `食生活：${eating}\n` : '') +
  (steps ? `歩数：${steps}\n` : '') +
  (walking ? `散歩：${walking}\n` : '') +
  (running ? `ランニング：${running}\n` : '') +
  (hiit ? `HIIT：${hiit}\n` : '') +
  (training ? `筋トレ：${training}\n` : '') +
  (meditation ? `瞑想：${meditation}\n` : '') +
  (stretch ? `ストレッチ：${stretch}\n` : '')

/** JSONとして送られてきた記録を入力用のオブジェクトに変換する */
export const recordJsonToInput = (json: DailyRecordInJson): DailyRecordInput =>
  Object.fromEntries(
    Object.entries(json).map(([k, v]) => {
      if (typeof v === 'string' && isValid(v)) return [k, new Date(v)]
      return [k, v]
    })
  )
