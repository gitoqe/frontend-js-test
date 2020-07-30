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
    }
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