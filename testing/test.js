/*		Задача №2
Необходимо разработать javascript-компонент для сортировки таблиц с данными.

Функционал

	1. Сортировка по столбцам: при нажатии на название столбца строки таблицы сортируются по возрастанию, при повторном клике - по убыванию. Графическим элементом или текстовым сообщением указывается направление сортировки.
	2. Клиентская пагинация: данные необходимо отображать постранично, максимум 50 элементов на страницу. Необходимо предоставить пользовательскую навигацию для перехода по страницам.
	3. Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку Найти.
	4. По клике на строку таблицы значения полей выводятся в дополнительном блоке под таблицей.
	5. Данные в таблицу загружаются с сервера. Способ загрузки с сервера на ваш выбор.

	Для демонстрации работы компонента необходимо сделать простую HTML страницу. Пользователю предлагается выбрать набор данных: маленький или большой. При выборе набора данных он загружается с сервера и по данным строится таблица.

Формат данных от сервера

Сервер возвращает JSON-массив данных. Пример данных:

[
	{
		id: 101,
		firstName: "Sue",
		lastName: "Corson",
		email: "DWhalley@in.gov",
		phone: "(612)211-6296",
		adress: {
			streetAddress: "9792 Mattis Ct",
			city: "Waukesha",
			state: "WI",
			zip: "22178"
		},
		description: "et lacus magna dolor..."
	}
}
Маленький объем данных берется по ссылке http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

Большой объем данных берется по ссылке http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

Замечания

 	1. Особое внимание следует уделить скорости работы. Зависание интерфейса при выполнении операций загрузки данных, фильтрации, сортировки недопустимо.
	2. Во время загрузки данных стоит показать какой-то индикатор
	3. Разрешённые библиотеки: jQuery, Lodash/Underscore, Backbone, самописный. Но вам придется объяснить выбор и причину использования. Использование сторонних библиотек будет плюсом только в случае если это оправданно и вы сможете объяснить причину выбора. Показав свои знания в грамотном применении сторонних готовых решений, вы имеете шанс повысить свою профессиональную привлекательность для нас.
	4. Пишите код так, как бы вы его писали в работе - внутренности задания будут оцениваться даже тщательней, чем внешнее соответствие заданию. Код должен быть организован так, чтобы его можно было заново использовать.
	5. Помните про обработку ошибок!
	6. Верстка может быть самая простая. Визуализацию и украшение делаете на ваш вкус. Мы не против использования http://getbootstrap.com/ или похожего UI фреймворк, но только для UI представления (нельзя использовать JS код для решения задачи, но можно использовать для оформительских эффектов(анимации и тому подобное))!
Дополнительным плюсом будет:

Использование TypeScript или ES6+(babel).
Схема визуального представления данных

	+------+------------+-----------------+-----------------+---------------+
	| id ? | firstName ?| lastName      ? | email          ?| phone        ?|
	+------+------------+-----------------+-----------------+---------------+
	| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+

	Если выбран пользователем с id = 101 , то под таблицей выводим следующую информацию:

	Выбран пользователь <b>Sue Corson</b>
	Описание:
	<textarea>
	et lacus magna dolor...
	</textarea>
	Адрес проживания: <b>9792 Mattis Ct</b>
	Город: <b>Waukesha</b>
	Провинция/штат: <b>WI</b>
	Индекс: <b>22178</b>
	Дополнительно напишите нам, как вы тестировали результат своей работы. Какие используете инструменты и как вы осуществляете тестирование.
*/


// http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

// частично по гайду: https://developer.mozilla.org/ru/docs/Learn/JavaScript/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B/JSON


// Этап 1. Получение данных "от сервера"

let requestURL = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";
//let requestURL = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";
let requestJSON = new XMLHttpRequest();	// новый экземпляр объекта запроса из конструктора XMLHttpRequest
requestJSON.open('GET', requestURL);
requestJSON.responseType = 'json'; //устанавливаем responseType в JSON, так что XHR знает, что сервер будет возвращать JSON и, что это должно быть преобразовано за кулисами в объект JavaScript
requestJSON.send();	// Запрос
let myTable = document.querySelector("#myDataTable");
let tableBody;
let userData = [];
let tableFields = [`id`, `firstName`, `lastName`, `email`, `phone`]; // используемые поля
let numOfUsers = 0; // количество записей
let allTdElements;



requestJSON.onload = function() {	// при упешном выполнении запроса и загрузке ответа выполняется функция
	userData = requestJSON.response;
	//console.log(`___________________user data is:`);
	console.log(userData);
	numOfUsers = userData.length;
	//console.log(numOfPages);

	// Этап 2. Создание и заполнение таблицы с данными.	
	// шапка таблицы для сортировки
	let tRow = document.createElement('tr');
	for (let j = 0; j < tableFields.length; j++) {
		let th = document.createElement('th');
		th.innerHTML = tableFields[j];
		th.setAttribute(`onclick`, `sortTableCol(${j})`); // при клике будет запускаться функция сортировки
		tRow.appendChild(th);
	}
	myTable.appendChild(tRow);

	tableBody = document.createElement('tbody');
	myTable.appendChild(tableBody);
	
	tableFiller(userData, tableBody);
	makePagination();
}

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
		tRow.setAttribute(`id`, tableData[i][`id`]);	// добавляем id с номером пользователя
		tRow.setAttribute(`class`, `tableRow`);	// добавляем обозначение
		tRow.style.display = "none";	// прячем строчку
		tableRows.appendChild(tRow);
	}
	//table.appendChild(tableBody);
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
// https://ru.stackoverflow.com/questions/555303/%D0%9A%D0%B0%D0%BA-%D1%80%D0%B5%D0%B0%D0%BB%D0%B8%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D1%8C-%D0%BF%D0%BE%D0%B4%D0%BE%D0%B1%D0%BD%D1%8B%D0%B9-pagination-js
let activePage;
let rowsToShow;
let rowPerPage;
function makePagination(){
	// отображение переходов на странице
	rowPerPage = 10; // строк на странице
	let numOfPages = Math.ceil(numOfUsers / rowPerPage); // количество страниц с данными
	let paginator = document.querySelector("#pagination");
	let page = "";
	for (let i = 0; i < numOfPages; i++) {
		page += `<span data-page=${i*rowPerPage} id="page${(i + 1)}"> ${(i + 1)} </span>`;
	}
	paginator.innerHTML = page;

	// 
	rowsToShow = document.querySelectorAll(".tableRow");
	//console.log(rowsToShow.length);
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
	//console.log(target);	
	//console.log(target.dataset);	
	//console.log(target.dataset.page);	
	
	if (target.tagName.toLowerCase() != "span") return; // если действие применено не к блоку переходов
	
	//let num_ = id.substr(4); // id с 4(5) символа
	let pageRowStart = +target.dataset.page;	// c какого номера начинается отображение элементов
	activePage.classList.remove("paginator_active");
	activePage = document.getElementById(id);
	activePage.classList.add("paginator_active");

	let j = 0;
	for (let i = 0; i < rowsToShow.length; i++) {	// по количеству выводимых строк
	  let data_num = rowsToShow[i].dataset.tableRow;	
	  rowsToShow[i].style.display = "none";
	}
	for (let i = pageRowStart; i < rowsToShow.length; i++) {
	  if (j >= rowPerPage) break;
	  rowsToShow[i].style.display = "table-row";
	  j++;
	}
}

let infoBlock = document.querySelector('.infoBlock');
function tdClick(x){
	//console.log(`yeah ${x}`)
	//console.log(userData)
	let targetUser = userData.find(user => user.id == x);
	infoBlock.innerHTML = `<div id="infoBlockPart">Выбран пользователь <b>${targetUser.firstName} ${targetUser.lastName}</b></div>`;
	infoBlock.innerHTML += `<div id="infoBlockPart">Описание:<br><textarea>${targetUser.description}</textarea></div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Адрес проживания: <b>${targetUser.adress.state}, ${targetUser.adress.city}, ${targetUser.adress.streetAddress}, ${targetUser.adress.zip}</b></div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Город: <b>${targetUser.adress.city}</b> </div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Провинция/штат: <b>${targetUser.adress.state}</b></div>`;
	infoBlock.innerHTML +=`<div id="infoBlockPart">Индекс: <b>${targetUser.adress.zip}</b></div>`;
}	

// 3. Фильтрация: компонент предоставляет текстовое поле, в которое пользователь может ввести текст и строки таблицы, данные которых не содержат подстроку, введённую пользователем, скрываются. Перефильтрация осуществляется по нажатию на кнопку Найти.
let filtration = document.querySelector('#inputFind');
let btnFind = document.querySelector('#btnFind');
btnFind.onclick = function(){
	console.log(filtration.value);
	//let targetUser = userData.find(user => user.includes(filtration.value));
	//console.log(targetUser);
	for (let i = 0; i < userData.length; i++) {
		console.log(userData[i]);
		for (key in userData[i]) {
			//console.log(key)
			//console.log(userData[i][key])
			let toStringer = userData[i][key].stringify();
			console.log(toStringer);
			//console.log(toString(userData[i][key]))
			//.find(filtration.value))
			//let gogog = userData[i][key].find(filtration.value);
			//console.log(gogog);

			//find(user => user.includes(filtration.value))
			//console.log(key)

		}
	}

	/*
	
		let j = 0;
	for (let i = 0; i < rowsToShow.length; i++) {	// по количеству выводимых строк
	  let data_num = rowsToShow[i].dataset.tableRow;	
	  rowsToShow[i].style.display = "none";
	}
	for (let i = pageRowStart; i < rowsToShow.length; i++) {
	  if (j >= rowPerPage) break;
	  rowsToShow[i].style.display = "table-row";
	  j++;
	}

	*/
}