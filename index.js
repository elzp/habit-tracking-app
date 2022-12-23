import './styles.css';
import {
  getDays,
  generateDayDiv,
  getDayName,
  getMonthName,
  generateMonthDiv,
} from './additionalFn.js';
console.log('Hello!');
//generating 12 month divs
const monthsAsNumbers = [...Array(12).keys()].map((it) => it);
const containerOfMonths = document.querySelector('.months');
const monthDivs = [];
monthsAsNumbers.forEach((it) => {
  const date = new Date(2023, it, 1);
  monthDivs.push(
    generateMonthDiv(getMonthName(date.getMonth()), getDays(2023, it + 1))
  );
});

containerOfMonths.innerHTML = monthDivs.join('\n');
//generating days with data in 2 months
monthsAsNumbers.forEach((it) => {
  const daysOfMonth = getDays(2023, it + 1);

  const arrOfNumbersOfDays = [...Array(daysOfMonth).keys()].map((it) => it + 1);
  let daysDivs = [];

  arrOfNumbersOfDays.forEach((it2) => {
    const date = new Date(2023, it, it2);
    daysDivs.push(generateDayDiv(it2, getDayName(date.getDay())));
  });

  const monthBodies = document.querySelectorAll('.month__body');
  monthBodies[it].innerHTML = daysDivs.join('\n');
});
