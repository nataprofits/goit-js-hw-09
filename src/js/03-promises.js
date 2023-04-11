import Notiflix from 'notiflix';
// Инициализация библиотеки
Notiflix.Notify.init(); 

// Ожидаем полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
  // Получаем форму и добавляем обработчик события submit
  const form = document.querySelector('.form');
  form.addEventListener('submit', onSubmit);

  // Обработчик события submit
  async function onSubmit(event) {
    event.preventDefault();

    // Получаем значения полей формы
    const delayInput = form.querySelector('[name="delay"]');
    const stepInput = form.querySelector('[name="step"]');
    const amountInput = form.querySelector('[name="amount"]');
    const initialDelay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

    // Создаем промисы с задержками
    let delay = initialDelay; // Используем отдельную переменную для увеличения задержки
    for (let i = 0; i < amount; i++) {
      try {
        await createPromise(i + 1, delay);
        Notiflix.Notify.success(`✅ Fulfilled promise ${i + 1} in ${delay}ms`);
      } catch {
        Notiflix.Notify.success(`❌ Rejected promise ${i + 1} in ${delay}ms`);
      }

      delay += step; // Увеличиваем задержку на шаг для следующего промиса
    }
  }

  // Функция создания промиса с задержкой
  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
});

