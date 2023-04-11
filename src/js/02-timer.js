// JavaScript код
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
// Инициализация библиотеки
Notiflix.Notify.init(); 

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownIntervalId;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};
Notiflix.Notify.success(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
Notiflix.Notify.success(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
Notiflix.Notify.success(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

startButton.addEventListener('click', () => {
  // Получение значение даты ввода
  const datetimePicker = document.getElementById('datetime-picker');
  const targetDate = new Date(datetimePicker.value);

  // Очистка предыдущий интервал обратного отсчета
  clearInterval(countdownIntervalId);

  // Обновление обратного отсчета каждую секунду
  countdownIntervalId = setInterval(() => {
    const now = new Date().getTime();
    const timeDifference = targetDate - now;

    // Если обратный отсчет завершен, очистить интервал
    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
    } else {
      // Получение объекта с значениями дней, часов, минут и секунд
      const { days, hours, minutes, seconds } = convertMs(timeDifference);

      // Обновить DOM значениями обратного отсчета
      daysElement.textContent = String(days).padStart(2, '0');
      hoursElement.textContent = String(hours).padStart(2, '0');
      minutesElement.textContent = String(minutes).padStart(2, '0');
      secondsElement.textContent = String(seconds).padStart(2, '0');
    }
  }, 1000);
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    // Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future.");
    } else {
      // Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
      startButton.removeAttribute('disabled');
    }
  },
};

flatpickr("#datetime-picker", options);