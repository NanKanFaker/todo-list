const inputBox = document.getElementById('inputContent');
const listContainer = document.querySelector('.list');
const list = document.querySelector('.text');


//creatElenent創建新元素，將新元素append到listContainer
function addTask(){
  if(inputBox.value === ''){
    alert('請填入代辦事項!');
    saveData();
    return;
  }
  let li = document.createElement('li');
  let text = document.createTextNode('text');
  let inputContent = inputBox.value
  li.innerHTML = `
       <span class='text'>${inputContent}</span><div class='delete'>✘</div>
  `
  listContainer.appendChild(li);  
  inputBox.value = '';
  saveData();
}

//將todo list 的 listContainer的資料儲存到瀏覽器。
//每次執行添加和刪除時，皆調用saveData。
function saveData(){
  localStorage.setItem('data',listContainer.innerHTML);
}

// 當listContainer裡面span標籤被觸及時，添加checked樣式。
// 當DIV也就是刪除標籤被觸及時，.remove()刪除element
listContainer.addEventListener('click',function(res){
  if(res.target.nodeName === 'SPAN'){
    res.target.parentElement.classList.toggle('checked');
    totalFinishTask();
    saveData();
    return;
  }
  if(res.target.nodeName === 'DIV'){
    res.target.parentElement.remove();
    totalFinishTask();
    saveData();
    return;
  }
})


//將儲存的資料呈現
function showTask(){
  listContainer.innerHTML = localStorage.getItem('data');
}

//結算完成的任務，取得名為checked的class，物件的長度
function totalFinishTask(){
  let check = document.getElementsByClassName('checked');
  let totalFinish = document.querySelector('.totalFinish');
  totalFinish.innerHTML = `<span>&#127873;</span>你已完成了${check.length}項任務`;
}

function deletAll(){
//   let totaltList = listContainer.getElementsByTagName('li');
//   console.log(totaltList)
//   delete totaltList;
//   for(let i=0;i<totaltList.length;i++){
//      delete totaltList[i];
//   }
//   // saveData();
  listContainer.innerHTML = ``;
  totalFinishTask();
  saveData();
}

showTask();
totalFinishTask();