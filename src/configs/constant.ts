/** 記録管理のスプレッドシートID */
export const ROUTINE_SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty('ROUTINE_SPREADSHEET_ID') || ''

/** 記録管理のスプレッドシートID */
export const TRAINING_SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty('TRAINING_SPREADSHEET_ID') || ''

/** ポストするSlackのwebhook URL */
export const SLACK_HOOK_URL = PropertiesService.getScriptProperties().getProperty('SLACK_HOOK_URL') || ''

/** emoji用テキスト */
export const EMOJI = {
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
  BULB: ':bulb:',
  NO_MOUTH: ':no_mouth:',
  SMILE: ':slightly_smiling_face:',
  GRINNING: 'grinning',
  SOB: ':sob:',
}
