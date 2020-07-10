  let products = {
    plainBurger: {
       name: 'Гамбургер простой',
       price: 10000,
       kcall: 400,
       amount: 0,
       get calcSum() {
          return this.amount * this.price;
       },
       get calcKcall() {
          return this.amount * this.kcall;
       }
    },
    freshBurger: {
       name: 'Гамбургер FRESH',
       price: 20500,
       kcall: 500,
       amount: 0,
       get calcSum() {
          return this.amount * this.price;
       },
       get calcKcall() {
          return this.amount * this.kcall;
       }
    },
    freshCombo: {
       name: 'FRESH COMBO',
       price: 31900,
       kcall: 700,
       amount: 0,
       get calcSum() {
          return this.amount * this.price;
       },
       get calcKcall() {
          return this.amount * this.kcall;
       }
    }
 };
 let extraProducts = {
    doubleMayonnaise: {
       name: 'Двойной майонез',
       price: 500,
       kcall: 50
    },
    lettuce: {
       name: 'Салатный лист',
       price: 300,
       kcall: 10
    },
    cheese: {
       name: 'Сыр',
       price: 1500,
       kcall: 30
    }
 };
 
 let btnPlusOrMinus = document.querySelectorAll('.main__product-btn');
 // console.log(btnPlusOrMinus);
 //на все кнопки вешаем обработчик событий
 for (let btn of btnPlusOrMinus) {
    btn.addEventListener('click', function (e) {
       e.preventDefault();
       // console.log(this);
       //если на какую-то кнопку нажали то запускаем функцию plusOrMinus
       plusOrMinus(this);
    })
 }
 function plusOrMinus(element) {
    //.closest('selector') - метод подключается к ближайшему родительскому элементу с таким селектором
    //.getAttribute('att') - берет информацию которая лежит внутри этого атрибута
    let parent = element.closest('.main__product'),//ищем ближайший элемент к таким классом 
       parentId = parent.getAttribute('id'),//берем информацию из атрибута id
       elementSymbol = element.getAttribute('data-symbol'),//получаем символ нашей кнопки
       out = parent.querySelector('.main__product-num'),
       price = parent.querySelector('.main__product-price span'),
       kcall = parent.querySelector('.main__product-call span');
    // console.log(elementSymbol);
    if (elementSymbol == '+' && products[parentId].amount < 10) products[parentId].amount++;
    else if (elementSymbol == '-' && products[parentId].amount > 0) products[parentId].amount--;
    // console.log(products[parentId].amount);
 
    out.innerHTML = products[parentId].amount;
    price.innerHTML = products[parentId].calcSum;
    kcall.innerHTML = products[parentId].calcKcall;
 }
 
 let checkExtraProduct = document.querySelectorAll('.main__product-checkbox');
 // console.log(checkExtraProduct);
 for (let element of checkExtraProduct) {
    //пробегаем по всем инпутам
    element.addEventListener('click', function () {
       //при нажатии на какой-то из инпутов работает запускаем addExtraProduct и отправляем туда этот инпут на который нажали
       addExtraProduct(this);
    })
 }
 
 function addExtraProduct(element) {
    let parent = element.closest('.main__product'), //ищем родетиля(секцию)
       parentId = parent.getAttribute('id'),//берем id (ключ бургера в объекте products)
       elementName = element.getAttribute('data-extra'),//берем название доп продукта(ключ в extraProducts)
       price = parent.querySelector('.main__product-price span'),
       kcall = parent.querySelector('.main__product-call span');
    // console.log(elementName);
    // console.log(element.checked);
    products[parentId][elementName] = element.checked;
 
    if (products[parentId][elementName] == true) {
       products[parentId].price += extraProducts[elementName].price;
       products[parentId].kcall += extraProducts[elementName].kcall;
    }
    else {
       products[parentId].price -= extraProducts[elementName].price;
       products[parentId].kcall -= extraProducts[elementName].kcall;
    }
    // console.log(products[parentId]);
    price.innerHTML = products[parentId].calcSum;
    kcall.innerHTML = products[parentId].calcKcall;
 }
 
 let addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receiptWindow = document.querySelector('.receipt__window'),
    receiptOut = document.querySelector('.receipt__window-out'),
    receiptBtn = document.querySelector('.receipt__window-btn'),
    arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;
 
 addCart.addEventListener('click', function () {
    for (let key in products) {//перебираем весь объект
       if (products[key].amount > 0) {//пропускаем только те объекту, у которых amount > 0
          arrayProduct.push(products[key]);
          products[key].name += ` - ${products[key].amount}шт`;//к name добавляем количество
          for (let newKey in products[key]) {
             //  \n - перенос строки
             if (products[key][newKey] === true) {
                products[key].name += `\n\t${extraProducts[newKey].name}`;
             }
          }
       }
    }
    // console.log(arrayProduct);
    for (let burger of arrayProduct) {
       totalPrice += burger.calcSum;
       totalKcall += burger.calcKcall;
       totalName += `\n${burger.name}\n`;
    }
    // console.log(totalName);
    receiptOut.innerHTML = `Ваш заказ:\n${totalName}\nКалорийность: ${totalKcall} кКал.\nОбщая стоимость: ${totalPrice} сумм`;
 
    receipt.style.display = 'flex';
    setTimeout(function () { receipt.style.opacity = '1'; }, 100);
    setTimeout(function () { receiptWindow.style.top = '0'; }, 200);
    document.body.style.overflow = 'hidden';
    const outNum = document.querySelectorAll('.main__product-num');
    for(let el of outNum){
       el.innerHTML = 0;
    }
    const priceNum = document.querySelectorAll('.main__product-price span');
    for(let el of priceNum){
       el.innerHTML = 0;
    }
    const kcallNum = document.querySelectorAll('.main__product-call span');
    for(let el of kcallNum){
       el.innerHTML = 0;
    }
 })
 receiptBtn.addEventListener('click', function(){
    location.reload();
 })