import { NOTIFICATION_TEMPLATE, NOTIFICATION_TITLE } from "../data/notification.define";

/**
 * Request notification permission
 */
export async function requestNotificationPermission() {
  
  // If we don't have to request permission - do nothing
  if (Notification.permission === 'granted') {
    return;
  }

  // Requesting permission
  const permission = await Notification.requestPermission();

  switch (permission) {
  case 'denied':
    // TODO: Some tasks, if user denied notifications
    alert('We need a permission for pomodoro timer only');
    break;
  default:
    return;
  }
}

/**
 * Send notification to user
 * @param text Text in notification body
 */
export function sendNotification(text: string) {

  // If we don't have persmission - do nothing
  if (Notification.permission !== 'granted') {
    return;
  }

  // Using template for notification
  const template = {...NOTIFICATION_TEMPLATE};
  
  // Setting our text
  template.body = text;
  
  // Sending notification
  new Notification(NOTIFICATION_TITLE, NOTIFICATION_TEMPLATE);

  // Playing audio
  new Audio('/notification.mp3').play();
}