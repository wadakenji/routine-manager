/* eslint-disable no-unused-vars */ // グローバルな型定義がいくつかあるため無効化
/** 2020-01 のような年月を示すString型を定義 */
type OneDigitNumberString = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type YearString = `${'1' | '2'}${OneDigitNumberString}${OneDigitNumberString}${OneDigitNumberString}`
type MonthString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
type YmString = `${YearString}-${MonthString}`

/** 1日分の記録オブジェクト */
type DailyRecord = {
  weather: string
  temperature: number
  getUpTime: Date
  goToBedTime: Date
  feeling: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  awakening: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  ateThreeMealsRegularly: boolean
  didNotEatTooMuch: boolean
  didNotEatTooLate: boolean
  goodNutritionalBalance: boolean
  ateWithSomeone: boolean
  weight: number
  fatPercentage: number
  steps: number
  running: boolean
  training: boolean
  hiit: boolean
  meditation: number
  stretch: boolean
  bathing: boolean
  comment: string
}
/** JSONで表現した場合（日付型がないのでstringに置き換えている） */
type DailyRecordInJson = Partial<{
  [key in keyof DailyRecord]: DailyRecord[key] extends Date ? string : DailyRecord[key]
}>
/** インプット用のオブジェクト（一部のプロパティのみでも入力できる） */
type DailyRecordInput = Partial<DailyRecord>
/** スプレッドシートから取得した場合（値がないときは空文字列として取得される） */
type DailyRecordInSheet = { date: Date } & { [key in keyof DailyRecord]: DailyRecord[key] | '' }
