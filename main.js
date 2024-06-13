
let tasks =[]
function getTasksFromStorage(){
    
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks")) 
    tasks = retrievedTasks ?? []
    // if(retrievedTasks == null){
    //     tasks = []
    // }else{
    //     tasks = retrievedTasks
    // }
}

getTasksFromStorage()
 
function fillTaskOnThePage(){
    document.getElementById("tasks").innerHTML =""
    let index = 0
    for (task of tasks){
    
    let content =
        `
    <!--TASK-->
    <div class="task ${task.isDone ? 'done' : ''}  ">
    
        <!--TASK INFO-->
        <div class="task-info">
            <h2>${task.title}</h2>
            <div class="date">
                <span class="material-symbols-outlined">
                    calendar_month
                    </span>
                <span>${task.date}</span>
            </div>
        </div>
        <!--//TASK INFO//-->
         <!--TASK ACTIONS-->
         <div class="task-actions">
            <button  onclick="deleteTask(${index})"  class="circular btn-clor_1"><span class="material-symbols-outlined">
                delete
                </span></button>
            
            <button   onclick="editTask(${index})"  class="circular btn-clor_3"><span class="material-symbols-outlined">
                edit
                </span></button>
            ${task.isDone ? 
            ` <button   onclick="toggleTskCompletion(${index})"  class="circular btn-clor_4">
                <span class="material-symbols-outlined">
                cancel
                </span>
                </button> 
             `   
             : 

            `
            <button   onclick="toggleTskCompletion(${index})"  class="circular btn-clor_2">
                <span class="material-symbols-outlined">
                done
                </span>
            </button>
            ` 
            }
               
         </div>
         <!--//TASK ACTIONS//-->
    </div>
    <!--//TASK//-->
    `
    document.getElementById("tasks").innerHTML += content
    index++
    
    }
}


fillTaskOnThePage()


document.getElementById("add-btn").addEventListener("click", function(){
  
   let taskNamne= prompt("Veuillez entrer le nom du livre")
    let now =  new  Date()
   let date = now.getDate() + "/" + (now.getMonth()+1)    + "/" + now.getFullYear() + " | " + now.getHours() + " | " +now.getMinutes() + "|" + now.getSeconds()
   let taskObj ={
    "title" : taskNamne,
    "date" : date,
    "isDone": false

   }
   tasks.push(taskObj)

   //On appel la fonction de storage
   storageTasks()
 
  
   fillTaskOnThePage()
})

function deleteTask(index){
    let task = tasks[index]
    let isConfirme = confirm(  "vous être sur le point de supprimer ce livre :" + task.title )
    if(isConfirme){
        tasks.splice(index, 1)
        storageTasks()
        fillTaskOnThePage()
    }
   

}


function editTask(index){
  let task = tasks[index]
  let newTaskTitle = prompt( "Veuillez entrer le nom du livre :", task.title )
  task.title = newTaskTitle
  storageTasks()
  fillTaskOnThePage()
  
    }
   

    function toggleTskCompletion(index){
        let task = tasks[index]
        task.isDone = !task.isDone
        // if(task.isDone){
        //     task.isDone = false
        // }else {
        //     task.isDone = true
        // }
        storageTasks()
        fillTaskOnThePage()
        
          }

    //===============STROAGE FUNCTIONS ========      

    function storageTasks()
    {
          //On convertit le tableau en string 
        let tasksStorage = JSON.stringify(tasks)
        localStorage.setItem("tasks",  tasksStorage)
    }