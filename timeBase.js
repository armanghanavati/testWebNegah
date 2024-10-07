const cron = require("node-cron");
const Reminder = require("./model/reminder");
const sendReminderEmail = require("./email");

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const reminders = await Reminder.find({ date: { $lte: now } }).populate(
    "userId"
  );

  reminders.forEach((reminder) => {
    sendReminderEmail(reminder.userId.username, reminder.text);
  });

  await Reminder.deleteMany({ date: { $lte: now } });
});
