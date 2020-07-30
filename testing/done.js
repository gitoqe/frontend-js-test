

/*
Задача №1
Написать функцию dscount, которая подсчитывает количество идущих подряд символов s1 и s2 в строке, без учёта регистра. Функция должна пройти следующие тесты, как минимум:
*/
function dscount(n,s1,s2){
    let z = 0;
    n = n.toLowerCase();
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    for (let i = 1; i < n.length; i++) {
        if ((n[i-1] == s1) && (n[i] == s2)) {z++};
        //console.log(`${n[i-1]}${n[i]}  ${s1}${s2} ${z}`);
    }
    //console.log(`line is ${n}, answer is ${z}`);
    return z;
}

try {
    test(dscount, ['ab___ab__', 'a', 'b'], 2);
    test(dscount, ['___cd____', 'c', 'd'], 1);
    test(dscount, ['de_______', 'd', 'e'], 1);
    test(dscount, ['12_12__12', '1', '2'], 3);
    test(dscount, ['_ba______', 'a', 'b'], 0);
    test(dscount, ['_a__b____', 'a', 'b'], 0);
    test(dscount, ['-ab-аb-ab', 'a', 'b'], 2);
    test(dscount, ['aAa', 'a', 'a'], 2);

    console.info("Congratulations! All tests passed.");
} catch(e) {
    console.error(e);
}

// Простая функция тестирования
function test(call, args, count, n) {
    let r = (call.apply(n, args) === count);
    console.assert(r, `Found items count: ${count}`);
    if (!r) throw "Test failed!";
}

/*
        Алгоритмы
Задача №1
Есть 2 сковороды для оладьев, каждая из которых вмещает ровно по 1 блинчику за 1 раз.
Есть 3 панкейка (блинчика), которые надо пожарить.
За 1 минуту жарится 1 сторона блинчика.
Блинчики надо обжарить с 2х сторон.
Итерацией считать процесс жарки 1й стороны 2х блинчиков на 2х сковородах. Сколько нужно времени (итераций) при оптимальном распределении чтобы пожарить 3 панкейка?

Релизуйте ваш алгоритм в виде кода. Это может быть как ООП код, так и функциональный и даже процедурный. Выбор подхода обоснуйте.

Обязательно опишите алгоритм, как бы вы решали эту задачу в физическом мире (в какой момент и как жарили бы эти блинчики).
*/
// решение через функцию в данном случае мне кажется самым простым, также его можно проверять при различных количествах сковород и блинчиков

// без учета минут обжарки и сторон блинчика
function flame(pan, pancake){ 
    let side = 2;
    return (side * pancake) / pan;
}
// с учетом времени обжарки и количества сторон изделия
function flameExtra(pan, pancake, side=2, time=1){
    return (time * side * pancake) / pan;
}
let pan = 2; // количество жарящих поверхностей - сковородок
let pancake = 3; // количество блинчиков
let time = 1; // время на жарку одной стороны
let side = 2; // количество сторон для обжарки
console.log(`${flame(pan, pancake)} iterations`);
console.log(`${flameExtra(pan,pancake,side,time)} iterations`);
console.log(`${flameExtra(pan,pancake)} iterations`);



// описание решения в физическом мире
/*
    Условно можно обозначить блины:
    Б1 Б2 Б3
    
    У каждого блинчика по две стороны, их можно обозначать отдельной цифрой:
    Б1-1 Б1-2
    Б2-1 Б2-2
    Б3-1 Б3-2

    Процесс жарки (итерацию) надо провести с двух сторон.
    Первая итерация  может применяться на любой паре блинчиков:
    1) Б1-1 Б2-1        Первый и второй блинчик обжарены с стороны 1
    2) Б1-2 Б3-1        Первый блинчик обжаривается с стороны 2, третий блинчик обжаривается с стороны 1
    3) Б2-2 Б3-2        Второй и третий блинчики обжрариваются с сторон 2



*/


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
// после ознакомления с содержимым можно провести несколько проверок работы функции

// по результатам проверок и ознакомления с кодом можно сделать вывод, что данная функция возвращает позицию одного из двух переданных функции символов, при этом отправляется  последний (по индексу в строке) встреченный символ

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

function testFunc(s,a,b){
    console.log(`${func(s,a,b)} == ${altFunc(s,a,b)}? ${func(s,a,b) == altFunc(s,a,b)}`)
}
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



// Задача №2
function drawRating(vote) {
	if (vote >= 0 && vote <= 20) {
    	return '★☆☆☆☆';
	}
	else if (vote > 20 && vote <= 40) {
		return '★★☆☆☆';
	}
	else if (vote > 40 && vote <= 60) {
		return '★★★☆☆';
	}
	else if (vote > 60 && vote <= 80) {
		return '★★★★☆';
	}
	else if (vote > 80 && vote <= 100) {
		return '★★★★★';
	}
}
function myDrawRating(vote){
    if (vote == 0) {
        vote = 1;
    }
    let a = '★'.repeat(Math.ceil((vote) / 100 * 5));
    a += '☆'.repeat(5 - a.length);
    return a;
}

console.log(`---------------------------`)

// Проверка работы результата
//for (let i = 0; i <= 100; i++) {    console.log(myDrawRating(i));}

console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★
console.log(drawRating(100)); // ★★★★★
console.log('newline_____')
console.log(myDrawRating(0), 0); // ★☆☆☆☆
console.log(myDrawRating(1), 1 ); // ★☆☆☆☆
console.log(myDrawRating(50), 50); // ★★★☆☆
console.log(myDrawRating(99), 99); // ★★★★★
console.log(myDrawRating(100), 100); // ★★★★★

/*
Что можно улучшить? Как бы вы переписали функцию drawRating при условии что на вход функции drawRating должна приходить переменная vote, содержащая значение от 0 до 100. Интересует именно логика реализации функции, не визуальное отображение звезд.
*/