/*
		Задача №2
Реализовать функцию checkSyntax(string), проверяющую на синтаксическую верность последовательность скобок. Задача не сводится к простой проверке сбалансированности скобок. Нужно еще учитывать их последовательность (вложенность).

Обратите внимание на производительность вашего решения.
Решение должно быть компактным.
Решение должно быть простым, умещаться в одном файле и содержать минимум строк кода.
Покажите решение, если нужно проверять следующий набор скобок: <,[,{,(

Изменится ли ваше решение, если нужно проверять только такой набор скобок: <,[,{

В случае ошибки возвращаем 1.
В остальных случаех возвращаем 0.
*/

function checkSyntax(string){
	console.log(string);
	let br = "<>[]{}()";
	let someBrPos;
	let foundBr = [];
	for (let i = 0; i < string.length; i++) {
		someBrPos=-1
		someBrPos = br.indexOf(string[i]);
		if (someBrPos != -1){
			if (someBrPos % 2 == 0){
				foundBr += string[i];
			}else{
				if (foundBr.length > 0) {
					if (br[someBrPos-1] == foundBr[foundBr.length-1]){ 
                        foundBr = foundBr.slice(0,-1);
					}else{
						return 1;
					}
				}else{	
					return 1;
				}
			}
		}
	}
	if (foundBr.length == 0) {
		return 0;
	}else{
		return 1;
	}
}

// Тесты для 1го набора:

console.log(checkSyntax("---(++++)----") == 0);
console.log(checkSyntax("") == 0);
console.log(checkSyntax("before ( middle []) after ") == 0);
console.log(checkSyntax(") (") == 1);
console.log(checkSyntax("} {") == 1);
console.log(checkSyntax("<(   >)") == 1);
console.log(checkSyntax("(  [  <>  ()  ]  <>  )") == 0);
console.log(checkSyntax("   (      [)") == 1);