import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export function useNotificationSender(deviceToken, title, body) {
  useEffect(() => {
    async function sendNotification() {
      // Создаем уведомление
      const notificationContent = {
        title: title,
        body: body,
      };

      // Отправляем уведомление на устройство с указанным токеном
      try {
        await Notifications.scheduleNotificationAsync({
          content: notificationContent,
          trigger: null, // Отправляем немедленно, без отложенного запуска
          to: deviceToken,
        });
        console.log('Notification sent successfully!');
      } catch (error) {
        console.error('Failed to send notification:', error);
      }
    }

    if (deviceToken) {
      sendNotification();
    }
  }, [deviceToken, title, body]);
}
