/*
        Рефакторинг
Задачи на работу с чужим кодом.

Задача №1
Посмотрите на код:
*/
function func(s, a, b) {

	if (s.match(/^$/)) {
		return -1;
	}
	
	var i = s.length -1;
	var aIndex =     -1;
	var bIndex =     -1;
	
	while ((aIndex == -1) && (bIndex == -1) && (i >= 0)) {
	    if (s.substring(i, i +1) == a) {
	    	aIndex = i;
    	}
	    if (s.substring(i, i +1) == b) {
	    	bIndex = i;
    	}
	    i = i - 1;
	}
	
	if (aIndex != -1) {
	    if (bIndex == -1) {
	        return aIndex;
	    }
	    else {
	        return Math.max(aIndex, bIndex);
	    }
	}
	
	if (bIndex != -1) {
	    return bIndex;
	}
	else {
	    return -1;
	}
}
//Что можно улучшить? Как бы вы его переписали?




// по результатам проверок работы функции и ознакомления с кодом можно сделать вывод, что данная функция возвращает позицию одного из двух переданных функции символов, при этом отправляется последний по индексу в строке встреченный символ

// из некорректных срабатываний я бы выделил:
// - функция не берет в рассчет символ строки с индексом 0
// - функция не производит поиск более чем одного символа

/*
    для замены такой функции нужно выполнить несколько действий:
    1. найти переданные в функцию символы внутри строки, при этом необходимо выбирать только последний встреченный
    2. сравнить индексы полученных в п.1 символов и вывести наибольшее значение
    
    Для поиска можно использовать функцию lastIndexOf() https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf
*/

function altFunc(s, a, b){
    let indexA = s.lastIndexOf(a);
    let indexB = s.lastIndexOf(b);
    return Math.max(indexA,indexB);
}

// функция для сравнения и проверки корректности результатов оригинальной функции func и альтернативной altFunc
function testFunc(s,a,b){
    console.log(`${func(s,a,b)} == ${altFunc(s,a,b)}? ${func(s,a,b) == altFunc(s,a,b)}`)
}

// проверка работы функции и сравнение результатов
console.log(` _____________________TEST_____________________`)
testFunc('123456789','9','0');
testFunc('123456789','1','0');
testFunc('123456789','1','5');
testFunc('123456789','5','1');
testFunc('123456789','1','1');
testFunc('123456789','8','2');
console.log(`\n`);
testFunc('abcde','e','c');
testFunc('abcde','ab','cd');
testFunc('abcde','a','b');
testFunc('eeabcaaade','a','e');
testFunc('eeabcaaadea','a','e');
console.log(`\n`);
testFunc('abcde','z','1');
testFunc('abcde','2','1');
testFunc('abcde','z','x');
testFunc('abcde','ё','я');
testFunc('abcde12','2','1');
testFunc('1abcde12','e','1');