const Image = {
    selectedImage: './images/default.svg',
    altImage: "Default"
}
const listPrincipal = document.querySelector('#listPrincipal')
const list =  document.querySelector('#list')
const popUp = document.querySelector('#popUp')
const taskHolder = document.querySelector('#taskHolder')
const inputTask = document.querySelector('#inputTask')
const selectedImgPreview = document.querySelector('#selectedImgPreview')
const imgBtnTask = document.querySelector('#imgBtnTask')
const chocolateImg = document.querySelector('#chocolateImg')
const imgList = document.querySelector('#imgList')
const numberSelect = document.querySelector('#numberSelect')
const timeSelect = document.querySelector('#timeSelect')
const taskBtnSubmit = document.querySelector('#taskBtnSubmit')
const addTask = document.querySelector('#addTask')
let listTasks = localStorage.getItem('listTasks') ? JSON.parse(localStorage.getItem('listTasks')) : []

addTask.addEventListener('click',(e)=>{
    e.preventDefault()
    addTask.classList.toggle('d-none')
    popUp.classList.toggle('d-none')
    inputTask.focus()
    if(numberSelect.value == '1'){
        timeSelect.innerHTML = `
        <option value="dia">Dia</option>
        <option value="hora">Hora</option>
        <option value="minuto">Minuto</option>
        `
    }else{
        timeSelect.innerHTML = `
        <option value="dias">Dias</option>
        <option value="horas">Horas</option>
        <option value="minutos">Minutos</option>
        `
    }
})

popUp.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!(e.target.id == 'taskHolder' || e.target.id == 'inputTask' || e.target.id == 'taskBtnSubmit' || e.target.id == 'imgBtnTask' || e.target.id == 'timeSelect' || e.target.id == 'chocolateImg' || e.target.localName == 'li' || e.target.localName == 'img'|| e.target.localName == 'ul' || e.target.localName == 'select' || e.target.localName == 'label' || e.target.id == 'timeSelectHolder')){
        popUp.classList.toggle('d-none')
        addTask.classList.toggle('d-none')
        chocolateImg.classList.add('d-none')
        selectedImgPreview.src = './images/default.svg'
        inputTask.value = ''
    }
})

imgBtnTask.addEventListener('click', (e)=>{
    e.preventDefault()
    chocolateImg.classList.toggle('d-none')
})

imgList.childNodes.forEach(li =>{
    li.addEventListener('click',(e)=>{
        e.preventDefault()
        Image.selectedImage = e.target.src
        Image.altImage = e.target.alt
        selectedImgPreview.src = e.target.src
        chocolateImg.classList.toggle('d-none')
    })
})

numberSelect.addEventListener('change',(e)=>{
    e.preventDefault()
    if(e.target.value == '1'){
        timeSelect.innerHTML = `
        <option value="dia">Dia</option>
        <option value="hora">Hora</option>
        <option value="minuto">Minuto</option>
        `
    }else{
        timeSelect.innerHTML = `
        <option value="dias">Dias</option>
        <option value="horas">Horas</option>
        <option value="minutos">Minutos</option>
        `
    }
})

taskBtnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    if(inputTask.value == ''){
        return
    }
    let task = {
        img: Image.selectedImage,
        alt: Image.altImage,
        desc: inputTask.value,
        createTime: Date.now(),
        numberSelect: parseInt(numberSelect.value),
        timeSelect: timeSelect.value
    }
    listTasks.push(task)
    localStorage.setItem('listTasks',JSON.stringify(listTasks))
    list.innerHTML = getTasks();
    taskHolder.reset()
    Image.selectedImage = './images/default.svg'
    Image.altImage = "Default"
    selectedImgPreview.src = Image.selectedImage
    popUp.classList.toggle('d-none')
    addTask.classList.toggle('d-none')
    listPrincipal.classList.remove('d-none')
})

const deleteTask = (index) =>{
    listTasks.splice(index,1)
    localStorage.setItem('listTasks',JSON.stringify(listTasks))
    list.innerHTML = getTasks();
}

const resetTask = (index) =>{
    if(listTasks.length == 0) return
    else{
        listTasks[index].createTime = Date.now()
        localStorage.setItem('listTasks',JSON.stringify(listTasks))
        list.innerHTML = getTasks();
    }
}

const timeDiff = (task) =>{
    let tiempoFuturo = task.createTime
    switch(task.timeSelect){
        case 'dias':
        case 'dia':
            tiempoFuturo += task.numberSelect * (1000*60*60*24)
            break;
        case 'horas':
        case 'hora':
            tiempoFuturo += task.numberSelect * (1000*60*60)
            break;
        case 'minutos':
        case 'minuto':
            tiempoFuturo += task.numberSelect * (1000*60)
            break;
    }
    let intervalo = tiempoFuturo - task.createTime
    let ahoraHastaFuturo = tiempoFuturo - Date.now()
    if(ahoraHastaFuturo < intervalo*0.3){
        return "bg-red"
    }
    else if(ahoraHastaFuturo >= intervalo*0.3 && ahoraHastaFuturo < intervalo*0.7){
        return "bg-yellow"
    }
    else if(ahoraHastaFuturo >= intervalo*0.7){
        return "bg-green"
    }
}

const getTasks = () =>{
    list.innerHTML = ''
    if(listTasks.length == 0) return list.innerHTML = `<h2>No hay tareas</h2>`
    else{
        listTasks.forEach((task,index) =>{
            list.innerHTML += `
            <li class="card ${timeDiff(task)}" >
                <button type="button" onclick="resetTask(${index})">⏱</button>
                <button type="button" onclick="deleteTask(${index})">❌</button>
                <img src="${task.img}" alt="${task.alt}">
                <div class="p-holder">
                    <p>${task.desc}</p>
                    <p>Tiempo: ${task.numberSelect} ${task.timeSelect}</p>
                </div>
            </li>`
        })
        return list.innerHTML
    } 
}

list.innerHTML = getTasks();
