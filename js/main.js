const addTask = document.querySelector('#addTask')
const inputTask = document.querySelector('#inputTask')
const popUp = document.querySelector('#popUp')


addTask.addEventListener('click',(e)=>{
    e.preventDefault()
    addTask.classList.toggle('d-none')
    popUp.classList.toggle('d-none')
    inputTask.focus()
})
popUp.addEventListener('click',(e)=>{
    e.preventDefault()
    if(!(e.target.id == 'taskHolder' || e.target.id == 'inputTask' || e.target.id == 'taskBtnSubmit')){
        popUp.classList.toggle('d-none')
        addTask.classList.toggle('d-none')
    }
})


console.log(addTask)