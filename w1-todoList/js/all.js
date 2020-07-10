// 本作業有參考範例程式碼

var input = document.getElementById('input');
var submit = document.getElementById('submit'); //新增按鈕
var clearTask = document.getElementById('clearTask'); //清除所有任務
var todoList = document.getElementById('todoList'); //任務列表清單
var taskCount = document.getElementById('taskCount'); //任務總數

//點擊事件監聽
submit.addEventListener('click', addTodo);
clearTask.addEventListener('click', removeAll);
todoList.addEventListener('click', doSomething);
input.addEventListener('keypress', enterKey);


//關注點分離，資料和畫面分開管理
var data = [];  //存放資料的空物件
renderPage(data); //畫面初始化


//新增資料
function addTodo() {
  var newTodo = input.value.trim(); //trim：讓前後空白消失
  var timeStamp = Math.floor(Date.now()); //用日期產生隨機整數id，回傳自1970/01/01UTC經過的毫秒數並取小於這個數的最大整數
  if (newTodo !== '') {    //不為空則推資料到 data 陣列裡
    data.push({
      id: timeStamp,    //給每個 todo 賦予一個獨一無二的參數作為 id
      title: newTodo,   //去除空白後的input內容
      completed: false, //預設剛加入的待辦事項都是未完成的，布林值false代表這個項目尚未標記為完成
    })
    renderPage(data);  //重新渲染畫面
    input.value = ''; //資料送出後把輸入欄內的資料清掉，以利再次填寫
  } else {
    //沒有輸入的話跳提醒訊息
    alert("尚未輸入內容，請重新確認>_0");
  }
}

//刪除單一資料
function removeTodo(id) { //傳進來的id是timeStamp那串id 
  var newIndex = 0;
  data.forEach((item, key) => { //將陣列資料forEach出來
    if (id == item.id) { //若傳進來的id等於item.id的話，就讓newIndex等於data的索引值
      newIndex = key;
    }
  })
  data.splice(newIndex, 1); //刪除陣列索引值位子資料1筆
  renderPage(data);
}

//刪除全部資料
function removeAll(e) {
  e.preventDefault(); //避免網址跳轉，取消a連結預設回到頁面最上方功能
  data = [];  //清空資料
  renderPage(data);
}

//完成待辦事項，點選checkbox打勾
function completeTodo(id) {
  data.forEach((item) => {
    if (id == item.id) {
      //如果傳進來id等於item.id，就把item.completed修改成false-三元運算
      //false代表這個項目尚未標記為完成
      item.completed = item.completed ? false : true;
    }
  })
  renderPage(data);
}

//按 Enter 新增資料
function enterKey(e) {
  console.log(e.keyCode);
  if (e.keyCode == 13) {  //對應 ASCII Enter keycode
    addTodo();
  }
}

// 判斷'刪除'或'完成'待辦事項 
function doSomething(e) { //參數 e (Event Object) 也可以自己定義名稱
  //會選到span文字，回到父層 button 屬性為action 
  //e.target：指的是實際觸發事件的物件
  var action = e.target.parentNode.dataset.action;
  var id = e.target.parentNode.dataset.id;  //會選到input ckeckbox，回到父層屬性為id
  if (action == 'remove') { //若自定義 data-action等於remove就執行removeTodo(id)
    removeTodo(id);
  } else if (action === 'complete') {
    completeTodo(id);
  }
}

//把資料呈現到畫面上
function renderPage(data) {
  var string = '';
  data.forEach((item) => {
    //100-點 checkbox 文字有刪除線，反之，所以 data-action="complete" 寫在上層，讓兩個連動
    //101-如果completed 為true 就加上 checked 顯示勾選狀態
    //102-如果completed 為true 就加上 completed 刪除線 的class
    string += `<li class="list-group-item">
    <div class="d-flex">
    <div class="form-check" data-action="complete" data-id="${item.id}">
    <input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''}>
    <label class="form-check-label ${item.completed ? 'completed' : ''}"> ${item.title}</label>
    </div>
    <button type="button" class="close ml-auto remove" aria-label="Close" data-action="remove" data-id="${item.id}">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    </li>`;
  })
  todoList.innerHTML = string;  //內容寫入todoList
  taskCount.textContent = data.length;  //陣列長度等於有幾筆資料
}