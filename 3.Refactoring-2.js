// Задача №2
function drawRating(vote){
    if (vote == 0) {
        vote = 1;
    }
    let a = '★'.repeat(Math.ceil((vote) / 100 * 5));
    a += '☆'.repeat(5 - a.length);
    return a;
}

// Проверка работы результата
console.log(drawRating(0) ); // ★☆☆☆☆
console.log(drawRating(1) ); // ★☆☆☆☆
console.log(drawRating(50)); // ★★★☆☆
console.log(drawRating(99)); // ★★★★★

/*
Что можно улучшить? Как бы вы переписали функцию drawRating при условии что на вход функции drawRating должна приходить переменная vote, содержащая значение от 0 до 100. Интересует именно логика реализации функции, не визуальное отображение звезд.
*/
