import * as Notifications from "expo-notifications";

export async function scheduleDailyLuckyColorNotification(luckyColorData) {
  const { status } = await Notifications.requestPermissionsAsync();
  console.log("Permission status:", status);
  if (status !== "granted") return;

  // Get today's weekday
  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  // Pull lucky colors as array of strings
  const todayColors = luckyColorData[weekday]?.lucky || [];
  const colorList = todayColors.join(", ");

  // Cancel any previous ones (optional during testing)
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule daily notification at 6:00 AM
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🔮 Your Lucky Color Today!",
      body: `Today's lucky colors : ${colorList}`,
    },
    trigger: {
      hour: 6,
      minute: 0,
      repeats: true,
    },
  });
}
