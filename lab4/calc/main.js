const digits = document.querySelector('.digits')
const other = document.querySelector('.other')
const screen = document.querySelector('.js_screen')

function priority(operation) {
    if (operation == '+') {
        return 1;
    } else if(operation == '-'){
        return 2;
    } else if(operation == '*'){
        return 3;
    } else if(operation == '/'){
        return 4;
    }
}

function isNumeric(str) {
    return /^\d+(.\d+){0,1}$/.test(str);
}

function isDigit(str) {
    return /^\d{1}$/.test(str);
}

function isOperation(str) {
    return /^[\+\-\*\/]{1}$/.test(str);
}

function tokenize(str) {
    let tokens = [];
    let lastNumber = '';
    for (char of str) {
        if (isDigit(char) || char == '.') {
            lastNumber += char;
        } else {
            if (lastNumber.length > 0) {
                tokens.push(lastNumber);
                lastNumber = '';
            }
        } 
        if (isOperation(char) || char == '(' || char == ')') {
            tokens.push(char);
        } 
    }
    if (lastNumber.length > 0) {
        tokens.push(lastNumber);
    }
    return tokens;
}

function compile(str) {
    let out = [];
    let stack = [];
    for (token of tokenize(str)) {
        if (isNumeric(token)) {
            out.push(token);
        } else if (isOperation(token)) {
            while (stack.length > 0 && 
                   isOperation(stack[stack.length - 1]) && 
                   priority(stack[stack.length - 1]) >= priority(token)) {
                out.push(stack.pop());
            }
            stack.push(token);
        } else if (token == '(') {
            stack.push(token);
        } else if (token == ')') {
            while (stack.length > 0 && stack[stack.length - 1] != '(') {
                out.push(stack.pop());
            }
            stack.pop();
        }
    }
    while (stack.length > 0) {
        out.push(stack.pop());
    }
    return out.join(' ');
}

function evaluate(str) {
    let tokens = tokenize(compile(str))
    let numStack = []
    for (let i = 0; i < tokens.length; i++) {
        let sum, lastArgument, firstArgument
        switch(tokens[i]){
            case "+":
                lastArgument = numStack.pop();
                firstArgument = numStack.pop();
                sum = +firstArgument + +lastArgument;
                numStack.push(sum)
                break;
            case "-":
                lastArgument = numStack.pop();
                firstArgument = numStack.pop();
                sum = +firstArgument - +lastArgument;
                numStack.push(sum)
                break;
            case "*": 
                lastArgument = numStack.pop();
                firstArgument = numStack.pop();
                sum = +firstArgument * +lastArgument;
                numStack.push(sum)
                break;
            case "/":
                lastArgument = numStack.pop();
                firstArgument = numStack.pop();
                sum = (+firstArgument / +lastArgument).toFixed(2);
                numStack.push(sum)
                break; 
            default:
                numStack.push([tokens[i]]);
               break;
        }
    }
    screen.innerText = numStack
}

function clickHandler(event) {
    digits.addEventListener('click', function(event) {
        let target = event.target;
        if (target.tagName != 'BUTTON') return;
        if (target.tagName = 'BUTTON') {
            screen.innerText += target.innerHTML
        }
    });
    other.addEventListener('click', function(event) {
        let target = event.target;
        if (target.tagName != 'BUTTON') return;
        screen.innerText += target.innerHTML
        if(target.classList.contains("clear")) screen.innerText = ''
        if(target.classList.contains("result")) {
            evaluate(screen.innerText)
        }
    });
}

window.onload = function () {
    clickHandler()
};
