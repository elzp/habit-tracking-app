export const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const generateDayDiv = (dayNumber, dayName) => `<div class="date">
<p class="day">${dayNumber}</p>
<p class="day_name">${dayName}</p>
<div class="result_button"></div>
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
