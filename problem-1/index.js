/** Using For Loop */
const sumToN_1 = (n) => {
    let result = 0;
    for( let i = 0; i <=n; i++) {
        result += i;
    }
    return result;
}

/** Using Math Formular */
const sumToN_2 = (n) => {
    return (n * (n + 1)) / 2; 
}

/** Using Generator Function */
const sumToN_3 = (n) => {

    const range = function*() {
        let i = 0;
        while (i <= n) yield i++
    }

    let result = 0;

    for(let i of range()) {
        result += i
    }

    return result
}
