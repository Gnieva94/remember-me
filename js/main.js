const addTask = document.querySelector('#addTask')
const inputTask = document.querySelector('#inputTask')
const timeSelect = document.querySelector('#timeSelect')
const popUp = document.querySelector('#popUp')
const imgBtnTask = document.querySelector('#imgBtnTask')
const chocolateImg = document.querySelector('#chocolateImg')
const imgList = document.querySelector('#imgList')
let selectedImage = './images/default.svg';
const list =  document.querySelector('#list')
const taskHolder = document.querySelector('#taskHolder')
const taskBtnSubmit = document.querySelector('#taskBtnSubmit')


addTask.addEventListener('click',(e)=>{
    e.preventDefault()
    addTask.classList.toggle('d-none')
    popUp.classList.toggle('d-none')
    inputTask.focus()
})
popUp.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!(e.target.id == 'taskHolder' || e.target.id == 'inputTask' || e.target.id == 'taskBtnSubmit' || e.target.id == 'imgBtnTask' || e.target.id == 'timeSelect' || e.target.id == 'chocolateImg' || e.target.localName == 'li' || e.target.localName == 'img'|| e.target.localName == 'ul' )){
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
        chocolateImg.classList.toggle('d-none')
    })
})

taskBtnSubmit.addEventListener('click',(e)=>{
    e.preventDefault()
    let task = {
        img: selectedImage,
        desc: inputTask.value,
        time: timeSelect.value
    }
    list.innerHTML += `<li class="card">
    <img src="${task.img}" alt="Bike">
    <p>${task.desc}</p>
    <p>tiempo: ${task.time}</p>
</li>`
    taskHolder.reset()
    popUp.classList.toggle('d-none')
    addTask.classList.toggle('d-none')
})

