import './styles.css';
import {
  getDays,
  generateDayDiv,
  getDayName,
  getMonthName,
} from './additionalFn.js';
console.log('Hello!');

const daysOfMonthDivs = document.querySelectorAll('.days');
const daysOfMonth = getDays(2022, 12);
daysOfMonthDivs[0].innerHTML = daysOfMonth;

const arrOfNumbersOfDays = [...Array(daysOfMonth).keys()].map((it) => it + 1);
let daysDivs = [];
arrOfNumbersOfDays.forEach((it) => {
  const date = new Date(2022, 11, it);
  daysDivs.push(generateDayDiv(it, getDayName(date.getDay())));
});
const monthBodies = document.querySelectorAll('.month__body');
monthBodies[0].innerHTML = daysDivs.join('\n');
console.log('daysDivs', daysDivs.join('\n'));
