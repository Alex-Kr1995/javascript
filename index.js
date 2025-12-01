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

const tabWithCounter = document.querySelector('[data-goods-count]');

const goodsInCart = []
let activeTabId = 'goods' //если не будет значения в самом начале -код сломается
const tabsContainer = document.querySelector('.tabs');
renderTabContentById(activeTabId);

const addToCartButtons = document.querySelectorAll('button[data-add-to-cart="true"]');

function addToCartHandler(e){
    const product = createProduct();

    goodsInCart.push(product);
    tabWithCounter.dataset.goodsCount = goodsInCart.length;
}
function addClickListeners(buttons, handler, event = 'click'){
    for (let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener(event, handler)
    }
}
addClickListeners(addToCartButtons, addToCartHandler)
let initialTab = getActiveTab();
initialTab.classList.add('active');

addClickListeners(tabs, clickHandler)

function createProduct(){
    return {
        name: 'Уроки по HTML',
        price: 500,
    }
}



function getActiveTab(){
     return document.querySelector(`button[data-tab-id="${activeTabId}"]`)
}






function clickHandler(event){

    const activeTab = getActiveTab();
    activeTab.classList.remove('active');
    event.target.classList.add('active');
    activeTabId = event.target.dataset.tabId; // тут внимательно!!! в html запись через -, но в объекте оно сохранено в кемел кейсе
    removeActiveTabContent();
    renderTabContentById(activeTabId);
} 

//============================== Третий варик  - конец ===================================================================


//============================== Четвертый варик  - ===================================================================
// Это если что 17.1 урок  если захочу пересмотреть 
// В другом видосе говорили что можно обработчик вешать на родительский элемент, и так-же определять на каком из дочерних клик
// Вот тут начинается следующий урок 17.2, но выше тоже парочку вещей скорректировали

function renderTabContentById(tabId){
    let html = '';
    if(  tabId === 'goods'){
        html = renderGoods();
    } else {
    html = renderCart();
    }
    tabsContainer.insertAdjacentHTML('afterend', html)
} 
function removeActiveTabContent(){
    const activeContent = document.querySelector(`
        [data-active-tab-content="true"]
        `);
    activeContent.remove()
}
function renderGoods(){
    return `<div data-active-tab-content="true" class="product_items">
        <div class="product_item">
            <div class="img">Типа картинка товара </div>
            <div class="product_list">
                 <h3>Уроки по css</h3>
                <p class="price">300 р</p>
                <button data-add-to-cart="true" class="button" >В корзину</button>
            </div>
        </div>
        <div class="product_item">
                <div class="img">Типа картинка товара</div>
                <div class="product_list">
                    <h3>Уроки по js</h3>
                    <p class="price">500 р</p>
                    <button data-add-to-cart="true" class="button" >В корзину</button>
                </div>
                
        </div>
        <div class="product_item">
            <div class="img">Типа картинка товара</div>
            <div class="product_list">
                <h3>Уроки по html</h3>
                <p class="price">400 р</p>
                <button data-add-to-cart="true" class="button" >В корзину</button>
            </div>

        </div>
    </div>
    
    `
}
function renderCart(){
    return `    <div data-active-tab-content="true" class="cart_items">
        <div class="cart_item">
            <div class="cart_item_title">Уроки по css</div>
            <div class="cart_item_count">3шт.</div>
            <div class="cart_item_price">150р</div>
        </div>
        <div class="cart_item">
            <div class="cart_item_title">Уроки по js</div>
            <div class="cart_item_count">3шт.</div>
            <div class="cart_item_price">150р</div>
        </div>
        <div class="cart_item">
            <div class="cart_item_title">Уроки по html</div>
            <div class="cart_item_count">3шт.</div>
            <div class="cart_item_price">150р</div>
        </div>
    </div>`
}

