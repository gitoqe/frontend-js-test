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
let myTable;
let userData = [];
let tableFields = [`id`, `firstName`, `lastName`, `email`, `phone`]; // ������������ ����

requestJSON.onload = function() {	// ��� ������� ���������� ������� � �������� ������ ����������� �������
	userData = requestJSON.response;
	console.log(`___________________user data is:`);
	console.log(userData);
	// ���� 2. �������� � ���������� ������� � �������.
	myTable = document.querySelector("#myDataTable");
	
	// ����� ������� ��� ����������
	let tRow = document.createElement('tr');
	for (let j = 0; j < tableFields.length; j++) {
		let th = document.createElement('th');
		th.innerHTML = tableFields[j];
		th.setAttribute(`onclick`, `sortTableCol(${j})`); // ��� ����� ����� ����������� ������� ����������
		th.setAttribute(`direction`, `dsc`); // ����������� ��������� ���������� �� ��������
		tRow.appendChild(th);
	}
	tRow.setAttribute(`id`, `tableCols`)
	myTable.appendChild(tRow);

	tableFiller(myTable, userData);
}




function tableFiller(table, tableData){	
	//document.getElementsByClassName('row').remove();

	//���������� ����� � ������
	// id ? | firstName ?| lastName      ? | email          ?| phone 
	for (let i = 0; i < tableData.length; i++) {
		let tRow = document.createElement('tr');
		for (let j = 0; j < tableFields.length; j++) {
			let tCell = document.createElement('td');
			tCell.innerHTML = tableData[i][tableFields[j]];
			tRow.appendChild(tCell);
		}
		tRow.setAttribute(`id`, tableData[i][`id`])
		tRow.setAttribute(`class`, `row`)
		table.appendChild(tRow);
	}

	
}
// ���������� �������
let tableFieldsSort = [`no`,`no`,`no`,`no`,`no`]; // ��� ����������� �������� ����������. `no` - �� �����������, asc - ����, desc - ����
function sortTableCol(x){
	if (tableFieldsSort[x] == `no` || tableFieldsSort[x] == `desc`) {	// ����������� ����������� ����������
		tableFieldsSort[x] = `asc`; // ����������� �� �����������
		// ���������� ���������� � ���������� �������� ����� �� �������� �����
		userData.sort(function (a, b) {	
			if (a[tableFields[x]] > b[tableFields[x]]) {return 1;}
			if (a[tableFields[x]] < b[tableFields[x]]) {return -1;}
			return 0;					
		});
	}else{
		tableFieldsSort[x] = `desc`; // ����������� �� ��������
		userData.sort(function (a, b) {	
			if (a[tableFields[x]] < b[tableFields[x]]) {return 1;}
			if (a[tableFields[x]] > b[tableFields[x]]) {return -1;}
			return 0;					
		});
	}
	console.log(`sorted by ${tableFields[x]} (${tableFieldsSort[x]})`);
	tableFiller(myTable, userData);
}


/*	��� ������ ������ - ��
function sortTableCol(x){
		//console.log(`x is  ${x}`);
		// �������� https://html5css.ru/howto/howto_js_sort_table.php
		let table = document.getElementById('myDataTable');
		let direction = `asc`; // ����������� ����������
		let switching = true; // ���� �� ����� ����
		let needToSwitch;	// ������������� ����� ���� ��� ������
		let firstRow, secondRow; // ������ �� ���������
		let switchCount = 0; // ���������� ����
		let A;
		let tRows�
		while(switching){
			switching = false;	// ���� ���� �� ����
			tRows = table.getElementsByTagName('tr');	// ���� ���� ����� � �������
			for (let i = 1; i < (tRows.length -1); i++) {
				needToSwitch = false;
				firstRow = (tRows[i].getElementsByTagName('td'))[x];	// ��� �������� ������
				secondRow = (tRows[i + 1].getElementsByTagName('td'))[x];
				if(direction == `asc`){
					if(firstRow.innerHTML.toLowerCase() > secondRow.innerHTML.toLowerCase()){ // ���� ������ �� �� ����������� - ���� ������ �������
						needToSwitch = true;
						A = i;
						break;
					}
				}else if(direction = `desc`){
					if(firstRow.innerHTML.toLowerCase() < secondRow.innerHTML.toLowerCase()){ // ���� ������ �� �� �������� - ���� ������ �������
						needToSwitch = true;
						A = i;
						break;
					}
				}
			}
			if (needToSwitch) { // ���� ���� ������ �������
				tRows[A].parentNode.insertBefore(tRows[A + 1], tRows[A]);
				switching = true;	// ���� ����� ����
				switchCount++;
			}else{
				if (switchCount == 0 && direction == `asc`){ // ���� ���� �� ���� � ����������� ���������� -> ������
					direction = `desc`;
					switching = true;
				}
			}
		}
		
}
*/