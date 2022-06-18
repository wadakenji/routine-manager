import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import { ja } from 'date-fns/locale'
import { EMOJI } from '../configs/constant'

/** 天気のテキストをemojiに変換する */
const weatherToEmoji = (weather: DailyRecordInSheet['weather']) => {
  const includesSunny = weather.includes('晴')
  const includesCloudy = weather.includes('曇')
  const includesRainy = weather.includes('雨')

  if (includesSunny && includesCloudy && includesRainy) return EMOJI.SUNNY_CLOUDY_RAINY
  if (includesSunny && includesCloudy) return EMOJI.SUNNY_CLOUDY
  if (includesCloudy && includesRainy) return EMOJI.CLOUDY_RAINY
  if (includesRainy && includesSunny) return EMOJI.SUNNY_CLOUDY_RAINY
  if (includesSunny) return EMOJI.SUNNY
  if (includesCloudy) return EMOJI.CLOUDY
  if (includesRainy) return EMOJI.RAINY
  return ''
}

/**
 * 10段階評価をバーの絵ような文字列に変換する
 * ex. 4 → ▮▮▮▮▯▯▯▯▯▯
 */
const scaleOfTenToBar = (scale: DailyRecordInSheet['feeling' | 'awakening']) => {
  if (scale === '') return ''
  return '▮'.repeat(scale) + '▯'.repeat(10 - scale)
}

/** booleanをチェックボックスに変換する */
const booleanToCheckbox = (boolean: boolean | '') => (boolean ? '☒' : '☐')

/** 歩数をemojiに変換する */
const stepsToEmoji = (steps: DailyRecordInSheet['steps']) => {
  let repeatCount: number
  if (!steps || steps < 3000) repeatCount = 0
  else if (steps < 6000) repeatCount = 1
  else if (steps < 10000) repeatCount = 2
  else if (steps < 15000) repeatCount = 3
  else if (steps < 30000) repeatCount = 4
  else repeatCount = 5

  return EMOJI.WALKING.repeat(repeatCount)
}

/** 記録から評価コメントを算出する */
const recordToAdvice = ({
  getUpTime,
  goToBedTime,
  ateThreeMealsRegularly,
  didNotEatTooMuch,
  didNotEatTooLate,
  goodNutritionalBalance,
  ateWithSomeone,
  weather,
  steps,
  hiit,
  training,
  running,
  bathing,
  stretch,
  meditation,
}: DailyRecordInSheet) => {
  // レベル1（まずクリアするべき課題に対するアドバイス）
  const level1: string[] = []
  // 9時より前に起床する
  if (!getUpTime || format(getUpTime, 'HH:mm') >= '09:00') {
    level1.push('決まった時間に起きよう')
  }
  // 23時までに寝る
  if (!goToBedTime || format(goToBedTime, 'HH:mm') > '23:00') {
    level1.push('早く寝よう')
  }
  // 基本的な食生活をクリアする（誰かと食べたときは条件がゆるくなる）
  if (!ateThreeMealsRegularly || (!ateWithSomeone && (!didNotEatTooMuch || !didNotEatTooLate))) {
    level1.push('食生活に気をつけよう')
  }
  // 散歩する
  if (!weather.includes('雨') && steps < 3000) {
    level1.push('散歩でもして日光を浴びよう')
  }

  // レベル1のアドバイスが1つでもあればそれのみを表示する
  if (level1.length > 0) return level1

  // レベル2（レベル1が全てクリアできてからクリアするべき課題に対するアドバイス）
  const level2: string[] = [`いい日だったね これを続けよう ${EMOJI.THUMBS_UP}`]
  // 強度の高い運動をする
  if (!hiit && !training && !running) {
    level2.push('強度の高い運動もしてみよう')
  }
  // 良好な栄養バランスの食事をする
  if (!goodNutritionalBalance) {
    level2.push('栄養バランスにも気を遣ってみよう')
  }
  // 入浴する
  if (!bathing) {
    level2.push('入浴すると体にいいらしい')
  }
  // ストレッチをする
  if (!stretch) {
    level2.push('ストレッチしてリラックスするとよく寝れそう')
  }
  // 瞑想をする
  if (!meditation) {
    level2.push('瞑想をすると集中力が上がるらしい')
  }

  // レベル2のアドバイスがあれば表示する
  if (level2.length > 1) return level2

  // すべてクリアできれば最高の1日
  return [`最高の1日だ ${EMOJI.SOB}`]
}

/** 記録をポストするテキストに変換する */
export const recordToText = (record: DailyRecordInSheet) => {
  // その日の情報の段落
  const { date, weather, temperature } = record
  const dateSection = [
    `*★ ${format(date, 'yyyy年M月d日（E）', { locale: ja })}★*`,
    `天気：${weather} ${weatherToEmoji(weather)}`,
    `気温：${temperature}℃`,
  ].join('\n')

  // 基本情報の段落
  const { getUpTime, goToBedTime, weight, fatPercentage, awakening, feeling } = record
  const baseSection = [
    `${getUpTime && format(getUpTime, 'H:mm')}起床 ${EMOJI.SUN_WITH_FACE} 〜 ${
      goToBedTime && format(goToBedTime, 'H:mm')
    }就寝 ${EMOJI.MOON_WITH_FACE}`,
    `${weight || ' - '}kg / ${fatPercentage || ' - '}%`,
    `寝起の気分：${scaleOfTenToBar(awakening)}`,
    `一日の気分：${scaleOfTenToBar(feeling)}`,
  ].join('\n')

  // 食生活の段落
  const { ateThreeMealsRegularly, didNotEatTooMuch, didNotEatTooLate, goodNutritionalBalance, ateWithSomeone } = record
  const eatingSection = [
    '*【食生活】*',
    `${booleanToCheckbox(ateThreeMealsRegularly)} 3食規則正しく食べた`,
    `${booleanToCheckbox(didNotEatTooMuch)} 食べすぎなかった`,
    `${booleanToCheckbox(didNotEatTooLate)} 夜遅くに食べなかった`,
    `${booleanToCheckbox(goodNutritionalBalance)} 栄養バランスが良かった`,
    `${booleanToCheckbox(ateWithSomeone)} 人と食べた`,
  ].join('\n')

  // 運動項目の段落
  const { steps, hiit, running, training, stretch } = record
  const activitySection = [
    '*【運動】*',
    [
      `${stepsToEmoji(steps)} ${steps}歩`,
      `${hiit ? `${EMOJI.FIRE} HIIT` : ''}`,
      `${running ? `${EMOJI.RUNNING} ランニング` : ''}`,
      `${training ? `${EMOJI.TRAINING} 筋トレ` : ''}`,
      `${stretch ? `${EMOJI.SEAL} ストレッチ` : ''}`,
    ]
      .filter(str => str) // 空文字列排除
      .join('   '),
  ].join('\n')

  // その他の項目の段落（何も実施されなかった場合は表示しない）
  const { meditation, bathing } = record
  const othersSection =
    (meditation || bathing) &&
    [
      '*【その他】*',
      [`${meditation ? `${EMOJI.MEDITATION} 瞑想${meditation}分` : ''}`, `${bathing ? `${EMOJI.BATHING} 入浴` : ''}`]
        .filter(str => str) // 空文字列排除
        .join('   '),
    ].join('\n')

  // ひとことの段落（入力がなければ表示しない）
  const { comment } = record
  const commentSection = comment && ['*【ひとこと】*', comment].join('\n')

  // 評価コメントの段落
  const adviseSection = recordToAdvice(record)
    .map(str => `*★★★ ${str}*`)
    .join('\n')

  return [
    dateSection,
    '\n\n',
    baseSection,
    '\n\n\n',
    eatingSection,
    '\n\n\n',
    activitySection,
    // その他・ひとことは表示しない場合もある
    othersSection ? '\n\n\n' : '',
    othersSection || '',
    commentSection ? '\n\n\n' : '',
    commentSection || '',
    '\n\n\n\n',
    adviseSection,
  ].join('')
}

/** JSONとして送られてきた記録を入力用のオブジェクトに変換する */
export const recordJsonToInput = (json: DailyRecordInJson): DailyRecordInput =>
  Object.fromEntries(
    Object.entries(json).map(([k, v]) => {
      if (typeof v === 'string' && isValid(v)) return [k, new Date(v)]
      return [k, v]
    })
  )
