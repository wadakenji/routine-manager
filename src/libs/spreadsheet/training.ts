import { TRAINING_SPREADSHEET_ID } from '../../configs/constant'

/** 筋トレ記録用スプレッドシート */
const ss = SpreadsheetApp.openById(TRAINING_SPREADSHEET_ID)

/** 記録シートを取得する */
const getRecordSheet = () => {
  const sheet = ss.getSheetByName('記録')
  if (!sheet) throw new Error('getRecordSheet: Record sheet not found.')
  return sheet
}

/** 種目シートを取得する */
const getExerciseSheet = () => {
  const sheet = ss.getSheetByName('種目')
  if (!sheet) throw new Error('getExerciseSheet: Exercise sheet not found.')
  return sheet
}

/** 全種目行を返す */
const getAllExerciseRows = () => {
  const sheet = getExerciseSheet()
  const lastRowIndex = sheet.getLastRow()
  return sheet.getRange(2, 1, lastRowIndex - 1, 2).getValues()
}

/** 筋トレ記録を追加する */
export const addTrainingRecordRow = (date: Date, exercise: string, weight: number, rep: number) => {
  getRecordSheet().appendRow([date, exercise, weight, rep])
}

/** 種目リストに既に存在する種目かを判定する */
export const isExistingExercise = (part: string, exercise: string) => {
  const exerciseRows = getAllExerciseRows()
  return !!exerciseRows.find(row => row[0] === exercise && row[1] === part)
}

/** 種目を追加する */
export const addExerciseRow = (part: string, exercise: string) => {
  getExerciseSheet().appendRow([exercise, part])
}

/** 全種目をデータフォーマットして返す */
export const getAllExercises = () => {
  const exerciseRows = getAllExerciseRows()

  const legExercises = exerciseRows.filter(([, part]) => part === '脚').map(([exercise]) => exercise)
  const chestExercises = exerciseRows.filter(([, part]) => part === '胸').map(([exercise]) => exercise)
  const backExercises = exerciseRows.filter(([, part]) => part === '背中').map(([exercise]) => exercise)
  const shoulderExercises = exerciseRows.filter(([, part]) => part === '肩').map(([exercise]) => exercise)
  const armExercises = exerciseRows.filter(([, part]) => part === '腕').map(([exercise]) => exercise)
  const absExercises = exerciseRows.filter(([, part]) => part === '腹').map(([exercise]) => exercise)

  return {
    leg: legExercises,
    chest: chestExercises,
    back: backExercises,
    shoulder: shoulderExercises,
    arm: armExercises,
    abs: absExercises,
  }
}
