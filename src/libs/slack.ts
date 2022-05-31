import { SLACK_HOOK_URL } from '../configs/constant'

type URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions

/** Slackにメッセージをポストする */
export const postSlackMessage = (text: string) => {
  const options: URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text }),
  }

  UrlFetchApp.fetch(SLACK_HOOK_URL, options)
}
