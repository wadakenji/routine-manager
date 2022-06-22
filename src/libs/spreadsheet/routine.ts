import { ROUTINE_SPREADSHEET_ID } from '../../configs/constant'
import { allDatesOfYm, dateToYm } from '../../utils/date'

type Sheet = GoogleAppsScript.Spreadsheet.Sheet

/** 日課記録用スプレッドシート */
const ss = SpreadsheetApp.openById(ROUTINE_SPREADSHEET_ID)

/** 渡された年月のシートを作成する */
const createSheetByYm = (ym: YmString) => {
  const templateSheet = ss.getSheetByName('テンプレート')
  if (!templateSheet) throw new Error('createSheetByName: Template sheet not found.')

  const dates = allDatesOfYm(ym)

  const newSheet = ss.insertSheet(ym, { template: templateSheet })
  // 1列目に該当年月の日付を入力する
  newSheet.getRange(3, 1, dates.length, 1).setValues(dates.map(d => [d]))

  return newSheet
}

/** 渡された年月のシートを取得する */
const getSheetByYm = (ym: YmString) => {
  let sheet = ss.getSheetByName(ym)
  // シートがなければ新しく作成する
  if (!sheet) sheet = createSheetByYm(ym)

  return sheet
}

/** 各項目のキーが記述された2行目を文字列の配列として取得する */
const getKeysRow = (sheet: Sheet) =>
  sheet
    .getRange('2:2')
    .getValues()[0]
    // 空文字列を排除する
    .filter(v => v)

/** 渡された日付の記録を取得する */
export const getRecord = (date: Date) => {
  const ym = dateToYm(date)
  const sheet = getSheetByYm(ym)
  const keysRow = getKeysRow(sheet)
  const rowNumber = date.getDate() + 2

  const dateRow = sheet.getRange(`${rowNumber}:${rowNumber}`).getValues()[0]

  // keysRowとキー、dateRowを値として合わせてオブジェクトにする
  return Object.fromEntries(keysRow.map((key, index) => [key, dateRow[index]])) as DailyRecordInSheet
}

/** 渡された日付、内容でスプレッドシートに記録を入力する */
export const updateRecord = (date: Date, record: DailyRecordInput) => {
  const ym = dateToYm(date)
  const sheet = getSheetByYm(ym)
  const keysRow = getKeysRow(sheet)
  const rowNumber = date.getDate() + 2

  // オブジェクトのプロパティごとにループ
  Object.entries(record).forEach(([key, value]) => {
    // 該当するキーが見つからないとき0となる
    const columnNumber = keysRow.findIndex(e => e === key) + 1
    if (columnNumber === 0) return

    sheet.getRange(rowNumber, columnNumber).setValue(value)
  })
}
