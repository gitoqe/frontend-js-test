/*		������ �2
���������� ����������� javascript-��������� ��� ���������� ������ � �������.

����������

	1. ���������� �� ��������: ��� ������� �� �������� ������� ������ ������� ����������� �� �����������, ��� ��������� ����� - �� ��������. ����������� ��������� ��� ��������� ���������� ����������� ����������� ����������.
	2. ���������� ���������: ������ ���������� ���������� �����������, �������� 50 ��������� �� ��������. ���������� ������������ ���������������� ��������� ��� �������� �� ���������.
	3. ����������: ��������� ������������� ��������� ����, � ������� ������������ ����� ������ ����� � ������ �������, ������ ������� �� �������� ���������, �������� �������������, ����������. �������������� �������������� �� ������� �� ������ �����.
	4. �� ����� �� ������ ������� �������� ����� ��������� � �������������� ����� ��� ��������.
	5. ������ � ������� ����������� � �������. ������ �������� � ������� �� ��� �����.

	��� ������������ ������ ���������� ���������� ������� ������� HTML ��������. ������������ ������������ ������� ����� ������: ��������� ��� �������. ��� ������ ������ ������ �� ����������� � ������� � �� ������ �������� �������.

������ ������ �� �������

������ ���������� JSON-������ ������. ������ ������:

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
��������� ����� ������ ������� �� ������ http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

������� ����� ������ ������� �� ������ http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

���������

 	1. ������ �������� ������� ������� �������� ������. ��������� ���������� ��� ���������� �������� �������� ������, ����������, ���������� �����������.
	2. �� ����� �������� ������ ����� �������� �����-�� ���������
	3. ����������� ����������: jQuery, Lodash/Underscore, Backbone, ����������. �� ��� �������� ��������� ����� � ������� �������������. ������������� ��������� ��������� ����� ������ ������ � ������ ���� ��� ���������� � �� ������� ��������� ������� ������. ������� ���� ������ � ��������� ���������� ��������� ������� �������, �� ������ ���� �������� ���� ���������������� ����������������� ��� ���.
	4. ������ ��� ���, ��� �� �� ��� ������ � ������ - ������������ ������� ����� ����������� ���� ����������, ��� ������� ������������ �������. ��� ������ ���� ����������� ���, ����� ��� ����� ���� ������ ������������.
	5. ������� ��� ��������� ������!
	6. ������� ����� ���� ����� �������. ������������ � ��������� ������� �� ��� ����. �� �� ������ ������������� http://getbootstrap.com/ ��� �������� UI ���������, �� ������ ��� UI ������������� (������ ������������ JS ��� ��� ������� ������, �� ����� ������������ ��� �������������� ��������(�������� � ���� ��������))!
�������������� ������ �����:

������������� TypeScript ��� ES6+(babel).
����� ����������� ������������� ������

	+------+------------+-----------------+-----------------+---------------+
	| id ? | firstName ?| lastName      ? | email          ?| phone        ?|
	+------+------------+-----------------+-----------------+---------------+
	| 101  | Sue        | Corson          | DWhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 102  | Lor        | Ipsumd          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+
	| 103  | Ips        | Umdolo          | dwhalley@in.gov | (612)211-6296 |
	+------+------------+-----------------+-----------------+---------------+

	���� ������ ������������� � id = 101 , �� ��� �������� ������� ��������� ����������:

	������ ������������ <b>Sue Corson</b>
	��������:
	<textarea>
	et lacus magna dolor...
	</textarea>
	����� ����������: <b>9792 Mattis Ct</b>
	�����: <b>Waukesha</b>
	���������/����: <b>WI</b>
	������: <b>22178</b>
	������������� �������� ���, ��� �� ����������� ��������� ����� ������. ����� ����������� ����������� � ��� �� ������������� ������������.
*/


// http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}

// �������� �� �����: https://developer.mozilla.org/ru/docs/Learn/JavaScript/%D0%9E%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B/JSON


// ���� 1. ��������� ������ "�� �������"

let requestURL = "http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";
//let requestURL = "http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}";
let requestJSON = new XMLHttpRequest();	// ����� ��������� ������� ������� �� ������������ XMLHttpRequest
requestJSON.open('GET', requestURL);
requestJSON.responseType = 'json'; //������������� responseType � JSON, ��� ��� XHR �����, ��� ������ ����� ���������� JSON �, ��� ��� ������ ���� ������������� �� �������� � ������ JavaScript
requestJSON.send();	// ������
let myTable = document.querySelector("#myDataTable");
let tableBody;
let userData = [];
let tableFields = [`id`, `firstName`, `lastName`, `email`, `phone`]; // ������������ ����
let numOfUsers = 0; // ���������� �������



requestJSON.onload = function() {	// ��� ������� ���������� ������� � �������� ������ ����������� �������
	userData = requestJSON.response;
	//console.log(`___________________user data is:`);
	//console.log(userData);
	numOfUsers = userData.length;
	//console.log(numOfPages);

	// ���� 2. �������� � ���������� ������� � �������.	
	// ����� ������� ��� ����������
	let tRow = document.createElement('tr');
	for (let j = 0; j < tableFields.length; j++) {
		let th = document.createElement('th');
		th.innerHTML = tableFields[j];
		th.setAttribute(`onclick`, `sortTableCol(${j})`); // ��� ����� ����� ����������� ������� ����������
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
	//���������� ����� � ������
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

// ���������� �������
let tableFieldsSort = [`no`,`no`,`no`,`no`,`no`]; // �������� ����������. `no` - �� �����������, asc - ����, desc - ����
function sortTableCol(x){
	let thFields = document.getElementsByTagName('th');
	if (tableFieldsSort[x] == `no` || tableFieldsSort[x] == `desc`) {	// ����������� ����������� ����������
		tableFieldsSort[x] = `asc`; // ����������� �� �����������
		thFields[x].innerHTML = `${tableFields[x]} v`;
		// ���������� ���������� � ���������� �������� ����� �� �������� �����
		userData.sort(function (a, b) {	
			if (a[tableFields[x]] > b[tableFields[x]]) {return 1;}
			if (a[tableFields[x]] < b[tableFields[x]]) {return -1;}
			return 0;					
		});
	}else{
		thFields[x].innerHTML = `${tableFields[x]} ^`;
		tableFieldsSort[x] = `desc`; // ����������� �� ��������
		userData.sort(function (a, b) {	
			if (a[tableFields[x]] < b[tableFields[x]]) {return 1;}
			if (a[tableFields[x]] > b[tableFields[x]]) {return -1;}
			return 0;					
		});
	}
	console.log(`sorted by ${tableFields[x]} (${tableFieldsSort[x]})`);
	tableFiller(userData, tableBody);
}

// ��������� �� ��������
function makePagination(){
	let rowPerPage = 50; // ����� �� ��������
	let numOfPages = Math.ceil(numOfUsers / rowPerPage); // ���������� ������� � �������
	let paginator = document.querySelector("#pagination");
	let page = "";
	for (let i = 0; i < numOfPages; i++) {
		page += `hello there`;
	  //page += "<span data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
	}
	paginator.innerHTML = page;
}