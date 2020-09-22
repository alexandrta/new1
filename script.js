const taskField = document.getElementById('newTaskInput')
const taskUl = document.getElementsByClassName('todo-tasks')[0]

const addTask = () =>{
	let taskLI = document.createElement("li");
	let completeINPUT = document.createElement('input')
	let removeBTN = document.createElement('button')
	let textSPAN = document.createElement('span')

	textSPAN.className = "task-text"
	textSPAN.innerText = taskField.value;

	removeBTN.className = "remove-btn";
	removeBTN.innerHTML = "&#10005";
	removeBTN.onclick = removeTask;

	completeINPUT.type = "checkbox"

//	taskLI.innerText = taskField.value;
	taskLI.className = "task-item";

	taskLI.appendChild(completeINPUT);
	taskLI.appendChild(textSPAN);
	taskLI.appendChild(removeBTN);
	taskUl.appendChild(taskLI);
}

const removeTask = function() {
	this.parentElement.remove();
}


const loadTask = () =>{

}