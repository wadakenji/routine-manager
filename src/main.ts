import { getRecord, updateRecord } from './libs/spreadsheet/routine'
import { recordJsonToInput, recordToText } from './libs/convert'
import { postSlackMessage } from './libs/slack'
import { addExerciseRow, addTrainingRecordRow, getAllExercises, isExistingExercise } from './libs/spreadsheet/training'

// gas-webpack-pluginの使い方として、gasで叩ける関数はglobalオブジェクトに紐付ける
// cf. https://github.com/fossamagna/gas-webpack-plugin
declare const global: Record<string, unknown>

/**
 * 1日の記録をSlackにポストする
 *
 * @param dateValue - 日付を表す値 渡されなければ今日の記録をポストする
 */
global.postDailyReport = (dateValue: string | number | Date = new Date()) => {
  const date = new Date(dateValue)
  const record = getRecord(date)
  const text = recordToText(record)
  postSlackMessage(text)
}

/**
 * 記録を入力/更新する
 *
 * @param record - 記録の内容
 * @param dateValue - 日付を表す値 渡されなければ今日の記録として処理する
 */
global.update = (record: DailyRecordInJson, dateValue: string | number | Date = new Date()) => {
  const date = new Date(dateValue)
  const input = recordJsonToInput(record)
  updateRecord(date, input)
}

/**
 * 筋トレ記録を追加する
 *
 * @param part - 体の部位
 * @param exercise - 種目
 * @param weight - 重量
 * @param rep - 回数（レップ数）
 * @return { exists: boolean } - 種目が既に存在していたかどうかを返す
 */
global.addTrainingRecord = (part: string, exercise: string, weight: number, rep: number) => {
  const exerciseExists = isExistingExercise(part, exercise)
  if (!exerciseExists) addExerciseRow(part, exercise)
  addTrainingRecordRow(new Date(), exercise, weight, rep)
  return { exerciseExists }
}

/**
 * 筋トレの種目データを返す
 */
global.getExercises = () => getAllExercises()
