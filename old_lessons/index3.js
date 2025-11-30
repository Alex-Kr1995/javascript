/// if else альтернатива
// Вместо if else можно использовать очень удобный switch case. Работает он следующим образом:
//Мы создаем свич кейс, и передаем в него переменную за которой следим. И в зависимости от того что будет в этой переменной 
//можем описать поведение, т.е. выбрать функцию которая сработает в зависимости от содержания переменной. 
const v = 'Alex1'
switch(v){
    case 'Helen':
        alert('Hello Helen');
        break;
    case 'Alex': 
        console.log('Hello Alex');
        break;
    default:
        console.log('Hello everyone')
}

// Так-же мы можем группировать поведение, например для трех вариантов переменной один вариант поведения

switch(v){
    case 'Helen':
    case 'Julia':
    case 'Viktoria':
        alert('Hello Girls');
        break;
    case 'Alex': 
    case 'Bob': 
    case 'Mark': 
        console.log('Hello Boys');
        break;
    default:
        console.log('Hello everyone')
}

//Switch case это конструкция, которая позволяет обработать конкретные условия, и они должны быть простыми.
//  Для более сложных проверок, таких как пол и возраст например, что должен быть мужчина старше 20 лет - то тут уже 
// switch case тут не поможет, и придется использовать if else


// Тернарный оператор - прсто надо это знать
// короткая форма, ну или альтернатива if..else
const age = 30;
const v1 = 'Alex1'
const ter = (v1 == 'Alex1' && age == 30) ? 'ok' : 'nok';
console.log('Ter ' + ter) //ok

//Проще говоря мы пишем условие, и если оно true? то будет этот вариант : или этот если false

