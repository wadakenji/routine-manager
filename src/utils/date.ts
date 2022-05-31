import format from 'date-fns/format'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import eachDayOfInterval from 'date-fns/eachDayOfInterval'

/** Date型をyyyy-MMの文字列に変換する */
export const dateToYm = (date: Date) => format(date, 'yyyy-MM') as YmString // 型キャストして問題ない

/** 渡された年月に含まれる全ての日付を配列にして返却する */
export const allDatesOfYm = (ym: YmString) => {
  const start = new Date(`${ym}-01T00:00:00`)
  const end = lastDayOfMonth(start)
  return eachDayOfInterval({ start, end })
}
