const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const upperEl = document.getElementById("uppercase");
const lowerEl = document.getElementById("lowercase");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const clipboardEl = document.getElementById("clipboard");
const generateEl = document.getElementById("generate");

const randomFunc ={
    upper: getUpper,
    lower: getLower,
    number: getNumber, 
    symbol: getSymbol  
}
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = upperEl.checked;
    const hasLower = lowerEl.checked;
    const hasNumber = numberEl.checked;
    const hasSymbol = symbolEl.checked;

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

clipboardEl.addEventListener('click', () =>  { 
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText; 

    if (!password) { return ;}

    textarea.value = password; 
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
    alert("Password coped to Clipbaord.");
});
function generatePassword(upper, lower, number, symbol, length) { 
    let generatedPassword = '';
    const typesCount = upper + lower + number + symbol ; 
    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    if (typesCount === 0 ) { 
        return '';
    }
    
    for (let i = 0 ; i <length ; i+=typesCount ) { 
        typesArr.forEach( type => { 
            const funcName =Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    
    return finalPassword;
}

function getUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 65);
}

function getLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26 ) + 97);
}

function getNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10 ) + 48);
}

function getSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,."; 
    return symbols[(Math.floor(Math.random() * symbols.length))];
}
