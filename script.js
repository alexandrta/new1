const taskField = document.getElementById('newTaskInput')
const taskUl = document.getElementsByClassName('todo-tasks')[0]

let tasksArray = [];


const addTask = (task = {}) =>{
	let taskLI = document.createElement("li");
	let completeINPUT = document.createElement('input')
	let removeBTN = document.createElement('button')
	let textSPAN = document.createElement('span')

	textSPAN.className = "task-text"
	textSPAN.innerText = task.desc || taskField.value;

	removeBTN.className = "remove-btn";
	removeBTN.innerHTML = "&#10005";
	removeBTN.onclick = removeTask;

	completeINPUT.type = "checkbox"

	task.id && (taskLI.dataset.taskId = String(task.id));
	taskLI.className = "task-item";

	if (!Object.keys(task).length) {
		const taskId = Math.floor(Math.random()* Math.floor(10000000))
		let taskObj = {
			id: taskId,
			desc: taskField.value
		};
		taskLI.dataset.taskId = String(taskId)
		addTaskToArray(taskObj);
		syncStorage();	
	}
	taskLI.appendChild(completeINPUT);
	taskLI.appendChild(textSPAN);
	taskLI.appendChild(removeBTN);
	taskUl.appendChild(taskLI);

	// зачеркиваем задачу при нажатии на чекбокс
    completeINPUT.onclick = function() {
        textSPAN.classList.toggle('decor');  //зачеркиваем
        taskLI.classList.toggle('done') //меняем цвет фона
    }
    // при нажатии на "Очистить выполненные" удаляем задачи с чекбоксом
    clearTask = function() {
        document.querySelectorAll('.done').forEach(elem => {
            elem.remove()
            removeTaskFromArray(elem.dataset.taskId)
            syncStorage();
		});  //ищем все li с классом done и удаляем
	}
}

const addTaskToArray = (task) => {
	tasksArray.push(task)
	//taskField.value = "";    // ---> очищает поле ввода
}

// удаляем элемент при нажатии на крестик
const removeTask = function() {
	this.parentElement.remove();
	removeTaskFromArray(this.parentElement.dataset.taskId);
	syncStorage();
}

// ======задизейблить кнопку
const buttonTask = document.getElementById("addTask");//изначально делаю кнопку не активной
		buttonTask.classList.add("disabled");
        buttonTask.setAttribute('disabled', 'disabled');
taskField.addEventListener('input', () => { //навешиваю слушатель на инпут, который срабатывает на ввод данных
    if (taskField.value !=="") {  //если инпут содержит данные, то код ниже
        buttonTask.removeAttribute('disabled');//делает кнопку активной
        buttonTask.classList.remove("disabled");//визуальная составляющая активности кнопки
      } else { //если инпут не содержит данные, то
        buttonTask.setAttribute('disabled', 'disabled');//делает кнопку неактивной
        buttonTask.classList.add("disabled");
      }
    });	


//добавляем задачу по кнопке "Добавить"
buttonTask.addEventListener('click', function() { //навешиваю слушатель на кнопку, который срабатывает на клик мышкой
    if (taskField.value!=="") { //если инпут содержит данные, то код ниже
        taskField.value = ""; //очищает инпут
        buttonTask.classList.add("disabled");// добавляет в список классов кнопки disabled, меняет цвет, убирает курсор
        buttonTask.setAttribute('disabled', 'disabled');//делает кнопку неактивной
    } 
}); 
// ========вариант замутить кнопку который не сработал===============
// function disabledButton() {
// 	if(taskField.value == '' ) {
// 		//buttonTask.setAttribute('disabled', 'disabled');
// 		console.log("замутили кнопку");
// 	};
//	
// function unDisabledButton() {
// 	buttonTask.removeAttribute('disabled');
// 	console.log("кнопка активна");
// 	};
//
// buttonTask.addEventListener("mouseenter", disabledButton);
// buttonTask.addEventListener("mouseleave", unDisabledButton);
// ===================================================================

// ====Запись задачи по нажатию на Enter + очистка поля ввода
taskField.addEventListener('keydown', function(e){   //слушаем поле ввода на нажатие кнопки
	if(e.keyCode === 13 && this.value && this.value !== ' ') {  //если это Enter и есть какое-то значение которое не равно пробелу
		addTask(); // добавляем таск 
		taskField.value = ""; // и очищаем поле ввода
		buttonTask.classList.add("disabled");// добавляет в список классов кнопки disabled, меняет цвет, убирает курсор
        buttonTask.setAttribute('disabled', 'disabled');//делает кнопку неактивной
	}
});


// записываем в localStorage
const syncStorage = () => {
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

// удаляем задание из массива
const removeTaskFromArray = (taskId) => {
	const index = tasksArray.findIndex(function(task) {
		return String(task.id) === taskId
	});
	tasksArray.splice(index, 1);
};

const loadTasksList = () => {
	tasksArray = JSON.parse(localStorage.getItem('tasks')) || [];
	tasksArray.forEach(task => {
		addTask();
	});
};
loadTasksList();


//    =================================================================================================================================================
//taskField.addEventListener //  keydown
// метод setAtribute
//taskField.addEventListener("input", ...)
//taskField.addEventListener("keydown", ...) //https://learn.javascript.ru/introduction-browser-events === https://keycode.info/ - выдает номер кнопки


// const doneTask = function (){
// 	document.querySelectorAll('.done').forEach(el => el.remove());
// 	restoreLocalStorage();
// }
// parentElement.classList.toggle ("done") // зачеркивает 

//taskField.value = '' // перезаписывает поле ввода на пустое

// как по нажатию выдать функцию
//   ====================================================================================================================================================
//localStorage



// ========= домашка 2
// const removeTask 



// addTask: async (task) => {
// 	await fetch('http')
// 	method: 'POST',
// 	Headers: {
// 		'content-type'
// 	}
// }

// const loadtasklist = 
// 	getTasks async () => {
// 		let responce = await fetch('http');

// 		return responce.json
// 	}

// const API = 
// 	getTasks async () => {
// 		let responce = await fetch('http');

// 		return responce.json();
// 	}
// =============================

// window.addEventListener("storage", (e)) => {      // слушает все вкладки и при переклюении на другую показывается последнее значение
// 	debugger
// 	console.log(e);
// });

// localStorage.setItem('test', 1);
