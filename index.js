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


let goodsInCart = [
   
]
const tabs = document.querySelectorAll('button.tab')

const tabWithCounter = document.querySelector('[data-goods-count]');

let activeTabId = 'cart' //если не будет значения в самом начале -код сломается

renderTabContentById(activeTabId);

const addToCartButtons = document.querySelectorAll('button[data-add-to-cart="true"]');

function addToCartHandler(product){
    return () => {
        let hasProduct = false;
        let index = null;
        let count = 1;

       for(let i = 0; i < goodsInCart.length; i++){
        const productInCart = goodsInCart[i];
        if(product.id === productInCart.id){
            hasProduct = true; 
            index = i;
            count = productInCart.count;
           
        }

        }

        if(hasProduct){
             goodsInCart[index].count += 1;
          
        } else {
            const productWithCount = {...product, count: 1};
            goodsInCart.push(productWithCount);
        }
        let fullSize = 0;
        for(let i = 0; i < goodsInCart.length; i++){
            const productInCart = goodsInCart[i];
            fullSize += productInCart.count;
        }
        tabWithCounter.dataset.goodsCount = fullSize;
 
         
    }
   
}

function removeFromCart(productId){
    
    return ()=> {
        const newGoodsInCart = [];
       
        for( let i = 0; i < goodsInCart.length ; i++){
            const product = goodsInCart[i];

            if(productId === product.id){
                if(product.count > 1){
                    newGoodsInCart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        count: product.count - 1,
                    })
                    updateCartItem(product.id, product.count, product.price)
                    tabWithCounter.dataset.goodsCount = tabWithCounter.dataset.goodsCount -= 1; 
                } else {
                    tabWithCounter.dataset.goodsCount = tabWithCounter.dataset.goodsCount -= 1;
                     updateCartItem(product.id, 0)
                }
            } else {newGoodsInCart.push(product)}

        }
        goodsInCart = newGoodsInCart;
        

        // -

        
    }
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

function createProduct(product){
    return {
        id: product.id,
        name: product.name,
        price: product.price,
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
    let html = null;
    const tabsContainer = document.querySelector('.tabs');
    if(  tabId === 'goods'){
     html =  renderGoods();   
    } else {
    html = renderCart();
    }
    tabsContainer.after(html); //Из-за того что теперь html это реальный html-тег а не строка как раньше, используется after (это аналог afterend из insertAdjacentHTML)
    
} 
function removeActiveTabContent(){
    const activeContent = document.querySelector(`
        [data-active-tab-content="true"]
        `);
    activeContent.remove()
}
function renderGoods(){
    const div = document.createElement('div')
    div.dataset.activeTabContent = "true";
    div.className = 'product-items';


    for(let i = 0; i < GOODS.length; i++){
        const product = createProduct(GOODS[i]);
        
      
       
        
        const price = product.price === null ? `<p>Товар закончился</p>` : `<p class="price">${product.price}$</p>`;
        // console.log(price)

        const productBlock = document.createElement('div');
        productBlock.className = 'product_item';
        productBlock.innerHTML =  `
            <div class="img">Типа картинка товара </div>
            <div class="product-list">
                <h3>${product.name}</h3>
                <p class="price">${price}</p>
            </div>
        `;
        if(product.price !== null) {
        const clickHandler = addToCartHandler(product);
        const button = document.createElement('button');
        button.className = 'button';
        button.textContent = 'В корзину'
        button.addEventListener('click',  clickHandler);

        productBlock.querySelector('.product-list').append(button);
    } 
    div.append(productBlock)

        
    }
    return div;
}
function renderCart() {
    const container = document.createElement('div');
    container.className = 'cart_items';
    container.dataset.activeTabContent = 'true';
    container.dataset.activeTabContent = 'true';
    for(let i = 0; i < goodsInCart.length; i++){
        const item = goodsInCart[i];
        const cartItem = document.createElement('div');
        cartItem.dataset.elementId = item.id;
        cartItem.className = 'cart_item';
        cartItem.innerHTML = `
            <div class="cart_item_title">${item.name}</div>
            <div class="cart_item_count">${item.count} шт.</div>
            <div class="cart_item_price">${item.price * item.count}р</div>
    
    `
    const btn = document.createElement('button');
       const clickHandler = removeFromCart(item.id)
       btn.addEventListener('click', clickHandler )
    btn.className = 'cart_item_delete';
    // btn.textContent = 'x'
    btn.innerText = 'x';
    cartItem.append(btn)

    container.append(cartItem)
    }
    return container;
}
function updateCartItem(id, count, price){
    
    const cartItem = document.querySelector(`[data-element-id="${id}"]`);
    if(count > 1 ){
        let fullPrice = count * price;
        const countElement = cartItem.querySelector('.cart_item_count');
        const fullPriceElement = cartItem.querySelector('.cart_item_price');
        fullPriceElement.textContent = `${fullPrice-price}р`;
        countElement.textContent = `${count -1 } шт.`;
        // fullPriceElement.textContent = `${fullPriceElement}`;
        console.log( `${fullPriceElement} aahhahasd`)
    }   
    else  {
        console.log( ' ))))))))))))))))))')
         cartItem.remove();
    }
}