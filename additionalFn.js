export const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const generateDayDiv = (
  dayNumber,
  dayName,
  numberOfMonth
) => `<div class="date ${numberOfMonth}">
<p class="day ${dayNumber}">${dayNumber}</p>
<p class="day_name">${dayName}</p>
<div class="result_button"></div>
</div>`;
export const generateMonthDiv = (nameOfMonth, numberOfDays) => `
<div class="month">
        <div class="month__head">
          <div class="month__name">
            ${nameOfMonth}
          </div>
          <div class="month__result">
            <div class="result">0</div>
            <div>/</div>
            <div class="days">${numberOfDays}</div>
          </div>
        </div>
        <div class="month__body">
        </div>
      </div>`;
const dayNames = ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thurs.', 'Fri.', 'Sat.'];
export const getDayName = (numberOfWeekDay) => dayNames[numberOfWeekDay];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const getMonthName = (realNumberOfMonth) =>
  monthNames[realNumberOfMonth];
