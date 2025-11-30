//============================== Первый варик ============================================================
// const goods = document.querySelector('button[data-id="goods"]');
// const cart = document.querySelector('button[data-id="cart"]')
// // У нас несколько вариантов, один из них - создать обработчик событий клика и в зависимости от цели выполнить функцию обработчик
// // Ниже показано пару вариантов как получить id из data-аттрибута

// function clickHandler(event){
//     //console.dir(event.target.dataset.id) // Первый способ отличить кнопки - по id из data-attribute
//     // console.dir(event.target.getAttribute('data-id')) // Второй способ отличить кнопки - по id из data-attribute
//     const id = event.target.dataset.id;
//         goods.classList.toggle('active');
//         cart.classList.toggle('active');

// }
// cart.addEventListener('click', clickHandler )
// goods.addEventListener('click', clickHandler)
//============================== Первый варик - конец ============================================================

//============================== Альтернативный варик ============================================================
//Второй вариант - передавать в обработчик id, и уже в зависимости от этого что-то делать. Но в этом случае нужно переписать обработчик
//таким образом чтобы он все-равно работал с евентом
// function clickHandler1 (id){ // Т.е. тут мы уже принимаем id для работы, теперь функция должна вернуть другую ф-ю для обработки события
//         console.log(`ClickHandler ---- 2  id: ${id}`);
//         console.log('ClickHandler ---- 2')
//         return (event)=> {
//             console.log(event)
//         }
// }

// cart.addEventListener('click', clickHandler1('cart') )
// goods.addEventListener('click', clickHandler1('goods'))
//============================== Альтернативный варик - конец ============================================================

//============================== Третий варик ============================================================================
// Продолжение первого варика: автор говорит что есть небольшая проблема с тем, что мы дублируем код и по два раза пишем 
// получение элементов через document.querySelector, навешивание обработчиков да и вызов toggle тоже 
// не думаю что в этом примере это проблема, но если элементов было бы больше то это стало бы проблемой. Поэтому:
const tabs = document.querySelectorAll('button.tab')
let activeTabId = 'goods' //если не будет значения в самом начале -код сломается
let initialTab = document.querySelector(`button[data-tab-id="${activeTabId}"]`)
initialTab.classList.add('active');
for(let i=0; i < tabs.length; i++){
    tabs[i].addEventListener('click', clickHandler);
}
 
function clickHandler(event){
    const activeTab = document.querySelector(`button[data-tab-id="${activeTabId}"]`)
    activeTab.classList.remove('active');
    event.target.classList.add('active');
    activeTabId = event.target.dataset.tabId; // тут внимательно!!! в html запись через -, но в объекте оно сохранено в кемел кейсе
} 


//============================== Третий варик  - конец ===================================================================


//============================== Четвертый варик  - ===================================================================
// Это если что 17.1 урок  если захочу пересмотреть 
// В другом видосе говорили что можно обработчик вешать на родительский элемент, и так-же определять на каком из дочерних клик