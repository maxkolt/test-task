document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('orderForm');

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Предотвращаем отправку формы по умолчанию

    // Проверка валидности номера телефона
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^\+[0-9]{1,3}\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    if (!phonePattern.test(phoneInput.value)) {
      alert('Пожалуйста, введите корректный номер телефона.');
      return;
    }

    // Отправка данных через fetch
    fetch('https://order.drcash.sh/v1/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer NWJLZGEWOWETNTGZMS00MZK4LWFIZJUTNJVMOTG0NJQXOTI3',
      },
      body: JSON.stringify({
        stream_code: 'iu244',
        client: {
          name: document.getElementById('name').value,
          phone: phoneInput.value,
        },
        sub1: document.getElementById('sub1').value,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Переход на страницу "спасибо за заказ" в случае успешного ответа
        window.location.href = '../page/thank_you_page.html';
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        // Переход на страницу с текстом "ошибка" в случае ошибки
        window.location.href = '../page/error_page.html';
      });
  });
});