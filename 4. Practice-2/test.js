let tableName = document.querySelector('#tableName');
let myDataTable = document.querySelector("#myDataTable");
// шапка таблицы для сортировки
let userData = [];
let tableFields = [`id`, `firstName`, `lastName`, `email`, `phone`]; // используемые поля
let numOfUsers = 0; // количество записей
// шапка таблицы для сортировки
let tRow = document.createElement('tr');
for (let j = 0; j < tableFields.length; j++) {
	let th = document.createElement('th');
	th.innerHTML = tableFields[j];
	th.setAttribute(`onclick`, `sortTableCol(${j})`); // при клике будет запускаться функция сортировки
	tRow.appendChild(th);
}
myDataTable.appendChild(tRow);
let tableBody = document.createElement('tbody');
myDataTable.appendChild(tableBody);

// кнопки для загрузки данных и их процедуры
let btnLoadSmallData = document.querySelector('#btnLoadSmallData');
let btnLoadBigData = document.querySelector('#btnLoadBigData');
btnLoadSmallData.onclick = function(){	// загрузка малого набора данных	
	let requestURL = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";
	begin(requestURL)
}
btnLoadBigData.onclick = function(){ // загрузка большого набора данных
	let requestURL = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";
	begin(requestURL)
}

function begin(url){
	tableName.innerText = `\n\n\nПроизводится загрузка данных.\n Пожалуйста, подождите\n\n\n`
	let requestJSON = new XMLHttpRequest();	// экземпляр объекта запроса из конструктора XMLHttpRequest
	requestJSON.open('GET', url);
	requestJSON.responseType = 'json'; // ожидаемый тип ответа - JSON
	requestJSON.send();
	requestJSON.onload = function() {	// при упешном выполнении запроса и загрузке ответа выполняется функция
		userData = requestJSON.response;
		numOfUsers = userData.length;
		tableBody.innerHTML = "";
		tableName.innerText = `Данные в таблице:`
		tableFiller(userData, tableBody);
		makePagination();
	}
}

// заполнение таблицы
function tableFiller(tableData, tableRows){	
	tableRows.innerHTML = "";
	//добавление полей в строку
	// id ? | firstName ?| lastName      ? | email          ?| phone 
	for (let i = 0; i < tableData.length; i++) {
		let tRow = document.createElement('tr');
		for (let j = 0; j < tableFields.length; j++) {
			let tCell = document.createElement('td');
			tCell.innerHTML = tableData[i][tableFields[j]];
			tCell.setAttribute(`onclick`, `tdClick(${tableData[i].id})`);
			tRow.appendChild(tCell);
		}
		// добавляем id с номером пользователя и именем-фамилией
		tRow.setAttribute(`id`,`${tableData[i][`id`]}${tableData[i][`firstName`]}${tableData[i][`lastName`]}`);
		tRow.setAttribute(`class`, `tableRow`);	// добавляем обозначение
		tRow.style.display = "none";	// прячем строчку
		tableRows.appendChild(tRow);
	}
}

// сортировка таблицы
let tableFieldsSort = [`no`,`no`,`no`,`no`,`no`]; // варианты сортировки. `no` - не сортировано, asc - восх, desc - нисх
function sortTableCol(x){
	let thFields = document.getElementsByTagName('th');
	if (tableFieldsSort[x] == `no` || tableFieldsSort[x] == `desc`) {	// определение направления сортировки
		tableFieldsSort[x] = `asc`; // сортировано по возрастанию
		thFields[x].innerHTML = `${tableFields[x]} v`;
		// встроенная сортировка с сравнением соседних строк по заданным полям
		userData.sort(function (a, b) {	
			if (a[tableFields[x]] > b[tableFields[x]]) {return 1;}
			if (a[tableFields[x]] < b[tableFields[x]]) {return -1;}
			return 0;					
		});
	}else{
		thFields[x].innerHTML = `${tableFields[x]} ^`;
		tableFieldsSort[x] = `desc`; // сортировано по убыванию
		userData.sort(function (a, b) {	
			if (a[tableFields[x]] < b[tableFields[x]]) {return 1;}
			if (a[tableFields[x]] > b[tableFields[x]]) {return -1;}
			return 0;					
		});
	}
	console.log(`sorted by ${tableFields[x]} (${tableFieldsSort[x]})`);
	tableFiller(userData, tableBody);
	makePagination();
}

// пагинация на странице
let activePage;
let rowsToShow;
let rowPerPage = 50; // строк на странице
function makePagination(){
	// отображение переходов на странице
	let numOfPages = Math.ceil(numOfUsers / rowPerPage); // количество страниц с данными
	let paginator = document.querySelector("#pagination");
	let page = "";
	for (let i = 0; i < numOfPages; i++) {
		page += `<span data-page=${i*rowPerPage} id="page${(i + 1)}"> ${(i + 1)} </span>`;
	}
	paginator.innerHTML = page;

	rowsToShow = document.querySelectorAll(".tableRow");
	for (var i = 0; i < rowsToShow.length; i++) {
		if (i < rowPerPage) {	// отображение первой "страницы" с записями
			rowsToShow[i].style.display = "table-row";
		}
	}
	// отмечаем активную страницу
	activePage = document.getElementById("page1");
	activePage.classList.add("paginator_active");
}



// переходы внутри страниц	  
function pagination(event) {
	let e = event || window.event;	// действие
	let target = e.target;	// цель дейсвтия
	let id = target.id;	// id цели действия
	
	if (target.tagName.toLowerCase() != "span") return; // если действие применено не к блоку переходов
	
	let pageRowStart = +target.dataset.page;	// c какого номера начинается отображение элементов
	activePage.classList.remove("paginator_active");
	activePage = document.getElementById(id);
	activePage.classList.add("paginator_active");

	let j = 0;
	for (let i = 0; i < rowsToShow.length; i++) {	// по количеству выводимых строк	
	  rowsToShow[i].style.display = "none";
	}
	
	for (let i = pageRowStart; i < rowsToShow.length; i++) {
	  if (j >= rowPerPage) break;
	  rowsToShow[i].style.display = "table-row";
	  j++;
	}
}

// вывод информации о пользователе
let infoBlock = document.querySelector('.infoBlock');
function tdClick(x){
	let targetUser = userData.find(user => user.id == x );
	infoBlock.innerHTML = `<div id="infoBlockPart">Выбран пользователь <b>${targetUser.firstName} ${targetUser.lastName}</b></div>`;
	infoBlock.innerHTML += `<div id="infoBlockPart">Описание:<br><textarea>${targetUser.description}</textarea></div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Адрес проживания: <b>${targetUser.adress.state}, ${targetUser.adress.city}, ${targetUser.adress.streetAddress}, ${targetUser.adress.zip}</b></div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Город: <b>${targetUser.adress.city}</b> </div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Провинция/штат: <b>${targetUser.adress.state}</b></div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Индекс: <b>${targetUser.adress.zip}</b></div>`;
}	

// 3. Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку Найти.
let filtration = document.querySelector('#inputFind');	// искомый текст
let btnFind = document.querySelector('#btnFind');
btnFind.onclick = function (){
	let whatToFind = (filtration.value).toLowerCase();
	let subStrFound = -1;
	let stringedData;
	for (let i = 0; i < userData.length; i++) {
		rowsToShow[i].style.display = "none"; // скрытие строк по умолчанию
		stringedData = (JSON.stringify(userData[i].id +` `+ userData[i].firstName +` `+ userData[i].lastName +` `+ userData[i].email +` `+ userData[i].phone)).toLowerCase();

		subStrFound = stringedData.indexOf((whatToFind));	// поиск подстроки

		if (subStrFound >= 0) {
			rowsToShow[i].style.display = "table-row";
		}else{
			rowsToShow[i].style.display = "none";
		}
	}
}