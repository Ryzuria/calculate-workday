import * as fs from "fs";
import * as readline from "readline";

function countHoliday(
  dateList: string[],
  startDate: Date,
  endDate: Date
): number {
  let count = 0;
  const startDateMillis = startDate.getTime();
  const endDateMillis = endDate.getTime();

  for (const dateStr of dateList) {
    const date = new Date(dateStr);
    const dateMillis = date.getTime();
    const dayOfWeek = date.getDay();
    if (
      startDateMillis <= dateMillis &&
      dateMillis <= endDateMillis &&
      dayOfWeek !== 0 &&
      dayOfWeek !== 6
    ) {
      count++;
    }
  }
  return count;
}

function countSatSun(startDate: Date, endDate: Date) {
  let count = 0;
  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    if (date.getDay() === 6 || date.getDay() === 0) {
      count++;
    }
  }
  return count;
}

function numberOfDays(startDate: Date, endDate: Date) {
  const diffTime = endDate.getTime() - startDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}

async function askForMonth(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise<string>((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function start() {
  let startMonth = await askForMonth("Enter start month (1-12): ");
  let endMonth = await askForMonth("Enter end month (1-12): ");
  if (Number(startMonth) > Number(endMonth)) {
    console.log("Swapping start and end month");
    [startMonth, endMonth] = [endMonth, startMonth];
  }
  const startDate = new Date(`2024-${startMonth}-26`);
  const endDate = new Date(`2024-${endMonth}-25`);

  const rawData = fs.readFileSync("holiday.json", "utf8");
  const data = JSON.parse(rawData);

  const dates: string[] = [];

  for (const date in data) {
    dates.push(data[date]["dateTime"]);
  }
  const numDates = numberOfDays(startDate, endDate);
  const holiday = countHoliday(dates, startDate, endDate);
  console.log("Number of holiday:", holiday);
  
  const satSun = countSatSun(startDate, endDate);
  console.log("====================================");
  const workday = numDates - satSun - holiday;
  console.log("Number of workday:", workday);
}

start();