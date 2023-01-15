import './styles.css';
import {
  getDays,
  generateDayDiv,
  getDayName,
  getMonthName,
  generateMonthDiv,
} from './additionalFn.js';

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
const habitNameString = 'habitName';
const habitNameFromLocal = localStorage.getItem(habitNameString);
const sharedHabitName = window.location.href
  .split('/')
  [window.location.href.split('/').length - 1].split('H-N')[1];

if (habitNameFromLocal !== null) {
  if (sharedHabitName === undefined || sharedHabitName === '') {
    input.placeholder = habitNameFromLocal;
    localStorage.setItem(habitNameString, `${habitNameFromLocal}`);
  } else {
    input.placeholder = sharedHabitName;
    localStorage.setItem(habitNameString, `${sharedHabitName}`);
  }
}

input.addEventListener('change', (e) => {
  if (e.target.value !== '') {
    e.target.placeholder = e.target.value;
  }
  if (habitNameFromLocal === null) {
    localStorage.setItem(habitNameString, `${e.target.value}`);
  } else {
    if (habitNameFromLocal !== e.target.value) {
      localStorage.setItem(habitNameString, `${e.target.value}`);
    }
  }
});

// update status in month
const results = document.querySelectorAll('.result');
// get data from localSorage
const getProgressFromLocal = () => {
  monthsAsNumbers.forEach((item) => {
    if (localStorage.getItem(`${item}`) !== null) {
      const currentState = localStorage.getItem(`${item}`).split(',');
      const buttonsInMonth = document.querySelectorAll(
        `.month${item} > .result_button`
      );
      currentState.forEach((checked) => {
        buttonsInMonth[checked - 1].style['background-color'] = 'green';
      });
      results[item - 1].innerHTML = currentState.length;
    }
  });
};
// set at start checked buttons based on localStorage
//first check if website is opened with shared url
const sharedProgressData = window.location.href
  .split('/')
  [window.location.href.split('/').length - 1].split('H-N')[0];
const localSharedUrl = localStorage.getItem('sharedUrl');

if (sharedProgressData !== '' && sharedProgressData !== localSharedUrl) {
  localStorage.setItem('sharedUrl', sharedProgressData);
  const chunksAboutMonths = sharedProgressData.split(';');
  const editedData = chunksAboutMonths.map((it) => {
    return {
      month: it.split('d')[0].match(/\d/)[0],
      days: it.split('d')[1].split('-'),
    };
  });
  editedData.forEach((it) => {
    const buttonsInMonth = document.querySelectorAll(
      `.month${it.month} > .result_button`
    );
    localStorage.setItem(it.month, `${it.days.join(',')}`);
    getProgressFromLocal();
    results[it.month - 1].innerHTML = it.days.length;
  });
} else {
  // get data from localSorage
  getProgressFromLocal();
}
//generating path to link to share
const shareButton = document.querySelector('.share');
const shareUrl = document.querySelector('.share_url');

shareButton.addEventListener('click', () => {
  let resultArray = [];
  monthsAsNumbers.forEach((it) => {
    if (localStorage.getItem(`${it}`) !== null) {
      const days = localStorage.getItem(`${it}`);
      resultArray.push(`m${it}d${days.split(',').join('-')}`);
    }
  });
  shareUrl.innerHTML =
    window.location.href.split('/m')[0] +
    resultArray.join(';') +
    'H-N' +
    (localStorage.getItem(habitNameString) ?? '');
});

const buttons = document.querySelectorAll('.result_button');

buttons.forEach((it) => {
  if (sharedProgressData == '') {
    it.addEventListener('click', (e) => {
      const numberofMonthInArray =
        it.parentElement.classList[1].match(/\d/g).join('') - 1;
      const currentValueOfMonthResult = results[numberofMonthInArray].innerHTML;
      const day = it.parentElement.classList[2].match(/\d/g).join('');
      const monthAsString = it.parentElement.classList[1].match(/\d/g).join('');

      if (it.style['background-color'] !== 'green') {
        it.style['background-color'] = 'green';
        results[numberofMonthInArray].innerHTML =
          Number(currentValueOfMonthResult) + 1;
        //show date of 'greens'

        if (localStorage.getItem(monthAsString) === null) {
          // check if key with month exist in localStorage
          localStorage.setItem(
            monthAsString,
            `${it.parentElement.classList[2].match(/\d/g).join('')}`
          );
        } else {
          const currentState = localStorage.getItem(monthAsString).split(',');
          const isDayIsIn = currentState.some((it) => it === day);
          if (!isDayIsIn) {
            const newState = [...currentState, day].join(',');
            localStorage.setItem(monthAsString, newState);
          }
        }
      } else {
        it.style['background-color'] = 'rgb(146, 143, 143)';
        results[numberofMonthInArray].innerHTML =
          Number(currentValueOfMonthResult) - 1;

        if (localStorage.getItem(monthAsString) !== null) {
          const currentState = localStorage.getItem(monthAsString).split(',');
          const newState = currentState.filter((it) => it !== day).join(',');
          localStorage.setItem(monthAsString, newState);
        }
      }
    });
  }
});

const leftButton = document.querySelector('.left');
const rightButton = document.querySelector('.right');
const monthsContainer = document.querySelectorAll('.months > *');
let toLeftCount = 1;
rightButton.addEventListener('click', (e) => {
  if (toLeftCount + 1 !== 13) {
    monthsContainer.forEach((it) => {
      it.style.transform = `translateX(-${toLeftCount * 241.5}px)`;
    });
    toLeftCount++;
  }
});
leftButton.addEventListener('click', (e) => {
  if (toLeftCount - 1 !== -1) {
    monthsContainer.forEach((it) => {
      it.style.transform = `translateX(-${(toLeftCount - 1) * 241.5}px)`;
    });
    toLeftCount--;
  }
});
