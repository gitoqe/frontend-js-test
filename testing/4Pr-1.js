/*
		Практические задачи
Задача №1
Реализуйте функцию parseUrl(string), которая будет парсить URL строку и возвращать объект с распарсенными данными. Пример:
*/
//let a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo')

// Вернет объект, в котором будут следующие свойства:
/*
console.log( a.href == "http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo" )
console.log( a.hash == "#foo" )
console.log( a.port == "8080" )
console.log( a.host == "tutu.ru:8080" )
console.log( a.protocol == "http:" )
console.log( a.hostname == "tutu.ru" )
console.log( a.pathname == "/do/any.php" )
console.log( a.origin == "http://tutu.ru:8080" )
*/
/*
Желательно задачу решить как можно меньшим числом строк кода и затратив на реализацию минимум времени.
*/
function parseUrl(string){
	function a(string){
		this.href = string;
		this.hash = string.match(/#[a-z]*$/);
		this.host = string.match(/[a-zA-Z0-9]*\.[a-zA-Z0-9]*:[0-9]{2,5}/);
		this.port = (this.host[0]).match(/[0-9]+/);
		this.protocol = string.match(/^[a-zA-Z]{3,5}:/);
		this.origin = string.match(/^[a-z]*:\/\/[a-zA-Z0-9]*\.[a-z]*:[0-9]+/);

		this.hostname = string.match(/[a-zA-Z0-9]*\.[a-z]*/); //!
		
		this.pathname = string.match(/[/][a-z]+[/][a-zA-Z0-9]+\.[a-zA-Z0-9]+/);
	}
	var x = new a(string);
	return x;
}

let my = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');
console.log(my.href);
console.log(my.hash);
console.log(my.port);
console.log(my.host);
console.log(my.protocol);
console.log(my.hostname);
console.log(my.pathname);
console.log(my.origin);



//проверка

let a = parseUrl('http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo');
console.log(`\n___________test_____________`)
console.log( a.href == "http://tutu.ru:8080/do/any.php?a=1&b[]=a&b[]=b#foo" )
console.log( a.hash == "#foo" )
console.log( a.port == "8080" )
console.log( a.host == "tutu.ru:8080" )
console.log( a.protocol == "http:" )
console.log( a.hostname == "tutu.ru" )
console.log( a.pathname == "/do/any.php" )
console.log( a.origin == "http://tutu.ru:8080" )