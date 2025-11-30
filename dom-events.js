// ========================================================================================================================
//click, input, scroll, keydown, resize, mouseenter, mouseleave
//addEventListener, removeEventListener
//https://learn.javascript.ru/introduction-browser-events 
//https://developer.mozilla.org/ru/docs/Web/API/Document_Object_Model/Events
// ========================================================================================================================


const btn = document.querySelector('.btn')
let i = 0;
function clickHandler(){
    console.log('Clicked ', i++)
    switch(i){
        case 1: 
            btn.style.background = 'red'
        break;

        case 2: 
        btn.style.background = 'green'
        break;

        case 3: 
        btn.style.background = 'blue'
        break;

        case 4: 
        btn.style.background = 'violet'
        break;

        case 5: 
        btn.style.background = 'aqua'
        break;
        default: 
        btn.removeEventListener('click', clickHandler); //Удаляем событие
            break;
    }
        
}

btn.addEventListener('click', clickHandler ) //Вешаем событие

// ========================================================================================================================
// Самое важное - если событие больше не используется - его надо удалить!
// ========================================================================================================================
//В следующем примере мы сделаем инпут, считаем с него данные, и проверим эти данные. Нам для данного примера нужно 
//ограничить ввод, поэтому мы сделаем так чтобы нельзя было писать скобки 
// ========================================================================================================================



    // console.log("input", e.target.value) //Так предпочтительнее
    // console.log("input", input.value) //Можно но не нужно
    // console.log("input", e.data) // достает по одной букве в момент нажатия

//Вообще даже сам автор говорит что пример малость жиденький и эту конкретную задачу можно решить куда проще через блокировку 
// нажатия в этом поле скобочек, и пример больше показательный чтобы поработать с событием. 
// Урок #16 если что, вдруг надо будет пересмотреть
const input = document.querySelector('[name="my_input"]');
let prevValue = input.value;
function evHandler(e){

    const userData = e.target.value;
    if(userData.includes('(') || userData.includes(')') ){
        console.log('Скобочки незя)))))')
        input.value = prevValue;
        return
    }
    input.value = userData;
    prevValue = userData;



}
input.addEventListener('input', evHandler)

document.addEventListener('scroll', (event) => { //событие скролла, срабатывает только если можно скроллить,
//  если же высоты недостаточно то и скролла не будет
    console.log(event.target.scrollingElement.scrollTop);
    event.target.scrollingElement.scrollTop >=1000 ? event.target.scrollingElement.scrollTop = 0  : false;
});

document.addEventListener ('keydown', (event)=>{ //Событие нажатия клавиш, можем отслеживать что нажал пользователь и что-то делать
    console.log(event) 
})
//следующие два события рассмотрим вместе потому что они часто используются вместе, наводим - что-то происходит, убираем - тоже
// По сути как hover в css только вместо стилей на это дело можем навесить функцию
btn.addEventListener('mouseenter', (e)=>{
    console.log('Enter')
})

btn.addEventListener('mouseleave', (e)=>{
    console.log('leave')
})

// ДЗ - изучить событие submit https://learn.javascript.ru/forms-submit