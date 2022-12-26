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
    daysDivs.push(generateDayDiv(it2, getDayName(date.getDay()), it + 1));
  });

  const monthBodies = document.querySelectorAll('.month__body');
  monthBodies[it].innerHTML = daysDivs.join('\n');
});

// save inputted text as placeholder

const input = document.querySelector('input');

input.addEventListener('change', (e) => {
  console.log(e.target.value);
  if (e.target.value !== '') {
    e.target.placeholder = e.target.value;
  }
});

// update status in month

const buttons = document.querySelectorAll('.result_button');
const results = document.querySelectorAll('.result');
buttons.forEach((it) =>
  it.addEventListener('click', (e) => {
    const numberofMonthInArray = it.parentElement.classList[1] - 1;
    const currentValueOfMonthResult = results[numberofMonthInArray].innerHTML;
    console.log(numberofMonthInArray, currentValueOfMonthResult);
    if (it.style['background-color'] !== 'green') {
      it.style['background-color'] = 'green';
      results[numberofMonthInArray].innerHTML =
        Number(currentValueOfMonthResult) + 1;
    } else {
      it.style['background-color'] = 'rgb(146, 143, 143)';
      results[numberofMonthInArray].innerHTML =
        Number(currentValueOfMonthResult) - 1;
    }
  })
);
