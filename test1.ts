import * as fs from "fs";

const startDate = new Date("2024-05-25");
const endDate = new Date("2024-06-24");

function findDateDiff() {
  const diffDay = endDate.getTime() - startDate.getTime() / 1000 / 60 / 60 / 24;
  console.log(diffDay);
}

function countHolidayDateInRange(startDate: Date, endDate: Date) {
  let rawData = fs.readFileSync("holiday.json", "utf8");
  let data = JSON.parse(rawData);

  let count = 0;
    const startDateMillis = startDate.getTime();
    const endDateMillis = endDate.getTime();

    for (const dates of data) {
        const dateMillis = new Date(dates['dateTime']).getTime();
        if (startDateMillis <= dateMillis && dateMillis <= endDateMillis) {
          console.log(dates['holidayDescription']);
            count++;
        }
    }
    return count;
}

console.log(countHolidayDateInRange(startDate, endDate));

// findDateDiff();
// let read = new Date('2567-01-01T00:00:00.000Z');
// let date = new Date('2567-01-01T00:00:00.000Z');
// console.log(date);
// console.log(read);
// console.log(date.toString() == read.toString());

// result: finDiff - holiday - sat/sun
