// UI vars

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();


// call event listener
eventListeners();

function eventListeners(){
    // submit event
    form.addEventListener('submit',addNewItem);

    // delete an item
    taskList.addEventListener('click', deleteItem);

    // delete all items
    btnDeleteAll.addEventListener('click',deleteItemAll);

}

function loadItems(){

    items = getItemsFromLS();
    items.forEach(function(item){
        createItem(item);
    });

}
// get items from local storage
function getItemsFromLS() {
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to local storage

function setItemToLS(text) {
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// delete item from local s
function deleteItemFromLS(text){
    items = getItemsFromLS(); // items ı alıyoruz
    items.forEach(function(item,index){ // elemanlara ulaşıyoruz
        if(item === text){
            items.splice(index,1); 
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}


function createItem(text){
    // create li
    const li = document.createElement('li');
    li.className='list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));


    // create a
    const a = document.createElement('a');
    a.classList='delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML='<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // ad li to ul
    taskList.appendChild(li);
}

// add new item
function addNewItem(e){
    if(input.value === ''){
        alert('add new item');
    }

    
    // create item
    createItem(input.value);

    // save to storage
    setItemToLS(input.value);


    // clear input
    input.value='';

    console.log(li);


    e.preventDefault();
}

// delete an item
function deleteItem(e){

    
    if(e.target.className === 'fas fa-times'){
        if(confirm('silmek istiyor musun?')){
        e.target.parentElement.parentElement.remove();

        // delete item from local storage
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }

    e.preventDefault();
}
}

// delete item all
function deleteItemAll(e){

    if(confirm('hepsini silmek mi istiyorsun?')){
        // taskList.innerHTML='';
       while(taskList.firstChild){
           taskList.removeChild(taskList.firstChild);
       }
        localStorage.clear();
    }
    e.preventDefault();

}

