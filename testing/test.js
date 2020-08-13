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



requestJSON.onload = function() {	// при упешном выполнении запроса и загрузке ответа выполняется функция
	userData = requestJSON.response;
	//console.log(`___________________user data is:`);
	//console.log(userData);
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
			tRow.appendChild(tCell);
		}
		tRow.setAttribute(`id`, tableData[i][`id`]);
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
}

// пагинация на странице
function makePagination(){
	let rowPerPage = 50; // строк на странице
	let numOfPages = Math.ceil(numOfUsers / rowPerPage); // количество страниц с данными
	let paginator = document.querySelector("#pagination");
	let page = "";
	for (let i = 0; i < numOfPages; i++) {
		page += `hello there`;
	  //page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
	}
	paginator.innerHTML = page;
}