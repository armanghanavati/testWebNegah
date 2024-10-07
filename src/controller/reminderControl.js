const Reminder = require("../model/reminder");
const asyncWrapper = require("../middleware/asyncWrapper");
const { StatusCodes } = require("http-status-codes");

const addReminder = asyncWrapper(async (req, res) => {
  const { text, date } = req.body;

  // چک کردن ورودی‌های کاربر
  if (!text || !date) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "متن و تاریخ یادآوری الزامی است" });
  }

  // ایجاد یادآوری جدید
  const reminder = new Reminder({
    userId: req.user.userId, // از کاربر احراز هویت شده
    text,
    date: new Date(date), // تبدیل رشته تاریخ به شیء Date
  });

  // ذخیره یادآوری در دیتابیس
  await reminder.save();

  // ارسال پاسخ موفقیت
  res.status(StatusCodes.CREATED).json({ msg: "یادآوری با موفقیت تنظیم شد" });
});

// صدور روتر و تابع
module.exports = addReminder;
