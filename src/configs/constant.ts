/** 記録管理のスプレッドシートID */
export const ROUTINE_SPREADSHEET_ID =
  PropertiesService.getScriptProperties().getProperty('ROUTINE_SPREADSHEET_ID') || ''
/** ポストするSlackのwebhook URL */
export const SLACK_HOOK_URL = PropertiesService.getScriptProperties().getProperty('SLACK_HOOK_URL') || ''
