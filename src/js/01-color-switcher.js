function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }
// Получаем ссылки на кнопки и на тело документа
  const startBtn = document.querySelector('[data-start]');
  const stopBtn = document.querySelector('[data-stop]');
  const body = document.querySelector('body');
  let intervalId;

//   Создаем функцию, которая меняет цвет фона тела на случайный цвет, полученный из функции getRandomHexColor()
  function changeColor() {
    body.style.backgroundColor = getRandomHexColor();
  }
// Обработка клика по кнопке start
startBtn.addEventListener('click', () => {
    // дезактивация повторного нажатия кнопки start   
     startBtn.disabled = true; 
    intervalId = setInterval(changeColor, 1000);
  });

  stopBtn.addEventListener('click', () => {
    startBtn.disabled = false;
    clearInterval(intervalId);
  });