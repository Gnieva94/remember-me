let selectedImage = './images/default.svg'
const listPrincipal = document.querySelector('#listPrincipal')
const list =  document.querySelector('#list')
const popUp = document.querySelector('#popUp')
const taskHolder = document.querySelector('#taskHolder')
const inputTask = document.querySelector('#inputTask')
const selectedImgPreview = document.querySelector('#selectedImgPreview')
const imgBtnTask = document.querySelector('#imgBtnTask')
const chocolateImg = document.querySelector('#chocolateImg')
const imgList = document.querySelector('#imgList')
const timeSelect = document.querySelector('#timeSelect')
const checkSelect = document.querySelector('#checkSelect')
const taskBtnSubmit = document.querySelector('#taskBtnSubmit')
const addTask = document.querySelector('#addTask')
let listTasks = localStorage.getItem('listTasks') ? JSON.parse(localStorage.getItem('listTasks')) : []



addTask.addEventListener('click',(e)=>{
    e.preventDefault()
    addTask.classList.toggle('d-none')
    popUp.classList.toggle('d-none')
    inputTask.focus()
    if(timeSelect.value == '1'){
        checkSelect.innerHTML = `
        <option value="hora">hora</option>
        <option value="minuto">minuto</option>
        `
    }else{
        checkSelect.innerHTML = `
        <option value="horas">horas</option>
        <option value="minutos">minutos</option>
        `
    }
})

popUp.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!(e.target.id == 'taskHolder' || e.target.id == 'inputTask' || e.target.id == 'taskBtnSubmit' || e.target.id == 'imgBtnTask' || e.target.id == 'timeSelect' || e.target.id == 'chocolateImg' || e.target.localName == 'li' || e.target.localName == 'img'|| e.target.localName == 'ul' || e.target.localName == 'select' || e.target.localName == 'label')){
        popUp.classList.toggle('d-none')
        addTask.classList.toggle('d-none')
    }
})
imgBtnTask.addEventListener('click', (e)=>{
    e.preventDefault()
    chocolateImg.classList.toggle('d-none')
})
imgList.childNodes.forEach(li =>{
    li.addEventListener('click',(e)=>{
        e.preventDefault()
        selectedImage = e.target.src
        selectedImgPreview.src = e.target.src
        chocolateImg.classList.toggle('d-none')
    })
})

timeSelect.addEventListener('change',(e)=>{
    e.preventDefault()
    if(e.target.value == '1'){
        checkSelect.innerHTML = `
        <option value="hora">hora</option>
        <option value="minuto">minuto</option>
        `
    }else{
        checkSelect.innerHTML = `
        <option value="horas">horas</option>
        <option value="minutos">minutos</option>
        `
    }
})

taskBtnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    if(inputTask.value == ''){
        return
    }
    let task = {
        img: selectedImage,
        desc: inputTask.value,
        time: timeSelect.value,
        check: checkSelect.value
    }
    listTasks.push(task)
    localStorage.setItem('listTasks',JSON.stringify(listTasks))
    list.innerHTML = getTasks();
    taskHolder.reset()
    selectedImage = './images/default.svg'
    selectedImgPreview.src = selectedImage
    popUp.classList.toggle('d-none')
    addTask.classList.toggle('d-none')
    listPrincipal.classList.remove('d-none')
})

const deleteTask = (index) =>{
    listTasks.splice(index,1)
    localStorage.setItem('listTasks',JSON.stringify(listTasks))
    list.innerHTML = getTasks();
}

const getTasks = () =>{
    list.innerHTML = ''
    if(listTasks.length == 0) return list.innerHTML = `<h2>No hay tareas</h2>`
    else{
        listTasks.forEach((task,index) =>{
            list.innerHTML += `
            <li class="card">
                <button onclick="deleteTask(${index})">X</button>
                <img src="${task.img}" alt="Bike">
                <div class="p-holder">
                    <p>${task.desc}</p>
                    <p>Tiempo: ${task.time} ${task.check}</p>
                </div>
            </li>`
        })
        return list.innerHTML
    } 
}

list.innerHTML = getTasks();


