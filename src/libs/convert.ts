import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import { RECORD_ITEM_TEXT_JA } from '../configs/constant'

/**
 * シートから取得した記録オブジェクトのvalueを表示用テキストに変換する
 * 例えば、{ weight: 60 } → { weight: '60kg' }
 */
const sheetRecordToDisplayingText = (record: DailyRecordInSheet) =>
  Object.fromEntries(
    Object.entries(record).map(([k, v]) => {
      // 日付は年月日を表示する
      if (k === 'date' && v instanceof Date) return [k, format(v, 'yyyy年M月d日')]
      // それ以外の日付は時分を表示する
      if (v instanceof Date) return [k, format(v, 'H:mm')]
      // booleanはtrueならばチェックマークのemojiを表示する
      if (typeof v === 'boolean') return [k, v ? ':white_check_mark:' : '']
      // 以下は数字に単位を付け足す
      if (k === 'temperature' && v) return [k, `${v}℃`]
      if (k === 'weight' && v) return [k, `${v}kg`]
      if (k === 'fatPercentage' && v) return [k, `${v}%`]
      if (k === 'steps' && v) return [k, `${v}歩`]
      if (k === 'meditation' && v) return [k, `${v}分`]
      // 未入力等はそのまま文字列にして返す
      return [k, String(v)]
    })
  )

/** 記録をポストするテキストに変換する */
export const recordToText = (record: DailyRecordInSheet) => {
  const displayingTextRecord = sheetRecordToDisplayingText(record)
  // keyを配列化したものをkeyの配列の型としてみなす
  return (Object.keys(record) as (keyof DailyRecordInSheet)[]).reduce((text, current) => {
    // 入力されていない項目はテキストに追加しない
    if (!displayingTextRecord[current]) return text
    return `${text}${RECORD_ITEM_TEXT_JA[current]}：${displayingTextRecord[current]}\n`
  }, '')
}

/** JSONとして送られてきた記録を入力用のオブジェクトに変換する */
export const recordJsonToInput = (json: DailyRecordInJson): DailyRecordInput =>
  Object.fromEntries(
    Object.entries(json).map(([k, v]) => {
      if (typeof v === 'string' && isValid(v)) return [k, new Date(v)]
      return [k, v]
    })
  )
