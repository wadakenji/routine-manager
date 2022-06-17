/** 記録管理のスプレッドシートID */
export const ROUTINE_SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty('ROUTINE_SPREADSHEET_ID') || ''

/** ポストするSlackのwebhook URL */
export const SLACK_HOOK_URL = PropertiesService.getScriptProperties().getProperty('SLACK_HOOK_URL') || ''

/** 各項目名の日本語テキスト */
export const RECORD_ITEM_TEXT_JA: { [k in keyof DailyRecordInSheet]: string } = {
  date: '日付',
  weather: '天気',
  temperature: '気温',
  getUpTime: '起床',
  goToBedTime: '就寝',
  feeling: '気分',
  awakening: '寝起き',
  weight: '体重',
  fatPercentage: '体脂肪率',
  steps: '歩数',
  running: 'ランニング',
  training: '筋トレ',
  hiit: 'HIIT',
  meditation: '瞑想',
  stretch: 'ストレッチ',
}

/** emoji用テキスト */
export const EMOJI: Record<string, `:${string}:`> = {
  SUNNY: ':sunny:',
  CLOUDY: ':cloud:',
  RAINY: ':umbrella_with_rain_drops:',
  SUNNY_CLOUDY: ':partly_sunny:',
  CLOUDY_RAINY: ':rain_cloud:',
  SUNNY_CLOUDY_RAINY: ':partly_sunny_rain:',
  SUN_WITH_FACE: ':sun_with_face:',
  MOON_WITH_FACE: ':full_moon_with_face:',
  WALKING: ':man-walking:',
  FIRE: ':fire:',
  RUNNING: ':man-running:',
  TRAINING: ':man-lifting-weights:',
  SEAL: ':seal:',
  MEDITATION: ':man_in_lotus_position:',
  BATHING: ':bath:',
  THUMBS_UP: ':thumbsup:',
  SOB: ':sob:',
}
