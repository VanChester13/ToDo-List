let addMessage = document.querySelector('.message');   // input
let addButton = document.querySelector('.add');       // кнопка
let todoList = [];                                   // массив для сохренения задач
let todo = document.querySelector('.todo');         // лист задач
let clear = document.querySelector('.delete');     //  удаление задачи
let saveLocalStorage = localStorage.getItem('todo');  

    // Каждый раз при обновлении страницы получаем данные из localStorage и отрисовываем todoList
 if (saveLocalStorage)  {  // можно было и так  (localStorage.getItem('todo').  Сценарий такой, что если что-то там существует, то мы парсим файл  
  console.log('Что под капотом ' + saveLocalStorage);  
  todoList = JSON.parse(localStorage.getItem('todo'));         // После парсинга нам нужно избавиться от null в массиве
  Object.keys(todoList).forEach(key => todoList[key] === '' || todoList[key] === null || todoList[key] === undefined ? delete todoList[key] : '');
  displayMessages();  // если при отрисовке ключ будет null,  то конечно же будет ошибка
}

 /*   // Если ничего не сохранено
else if (!saveLocalStorage) {
    console.log(`2 путь`);
    console.log('Что под капотом ' + saveLocalStorage);
    let count = 0;
    for (let i = 0; i < todoList.length; i++) {
    if (todoList[i] === null ) {
        count++;
        console.log(count);
    if (count == todoList.length) {
        todo.innerHTML = '';
        console.log('хуй');
      
    }
  }
 }
}*/

//  Добавление нового дела в список задач

addButton.addEventListener('click', newCase);

function newCase() {
if (!addMessage.value) return;    // если значение пустое прерываем функцию с помощью return;

   let newTodo = {               // Название объекта
   todo: addMessage.value,
   cheсked: false,             // проверка, выполнено дело или нет   
   important: false           //  важность
  }

 todoList.push(newTodo);
 console.log(todoList);
 displayMessages();
 localStorage.setItem('todo', JSON.stringify(todoList));
 addMessage.value = '';  //  очищаем поле ввода
}


 //  Отрисовка списка

 function displayMessages () {
  let displayMessage = '';
  let count = 0; // счетчик null 
  for (let i = 0; i < todoList.length; i++) {
  if (todoList[i] === null || todoList[i] === undefined) {
      count++;
      console.log(count);
  if (count == todoList.length) {
      todo.innerHTML = '';
      console.log('слишком намудрил с кодом, я в курсе)');
  }
}

  /* todoList.todo = '';
 */  }
 
  todoList.forEach((item, i) => {         // В таком переборе главное избавиться от null в массиве
   displayMessage += `
     <li> 
        <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
        <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.todo}</label>
     </li>
     `
     todo.innerHTML = displayMessage;
  }) 
  console.log(`Избавляемся от null в массиве ${todoList}`);
}


 // Навешиваем обработчик на изменение checkbBox 

todo.addEventListener('change', function(event) {
   
  let idInput = event.target.getAttribute('id');             // получаем атрибут id элемента на котором произошло событие  пример:  item_3
  let forLabel = todo.querySelector('[for=' +idInput+ ']'); //  ищем с таким же значением атрибут __for__     <label for='item_3' class </label> 
  
  todoList.forEach((item) => {                            // Далее нам нужно найти это значение (т.е. что ввели - input )  среди значений объектов внитри  todoList
     if (item.todo == forLabel.innerHTML) {              //  item.todo  - введенное сообщение,   forLabel.innerHTML - что находится в атрибуте
       item.checked = !item.checked;                    //   инвертируем в противоположное значение
       localStorage.setItem('todo', JSON.stringify(todoList));   
     }
   });
});

 
// Помечаем важные дела

todo.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  todoList.forEach((item) => {
   if (item.todo == event.target.textContent) {
      item.important = !item.important;
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
   }
  })
});


 // Удаляем все отмеченные (выполненные) дела

clear.addEventListener('click', () => {
  todoList.forEach((item, i) => {
   if (item.checked) {
    delete todoList[i];
    console.log(`что происходит после удаления с объектом:  ${todoList[i]}`);   // undefined
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));
     }   
   });  
   console.log(`что происходит после цикла с массивом с :  ${todoList}`);  // в массиве отражается как null

});
