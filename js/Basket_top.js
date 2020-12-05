'use strict';

/**
 * Класс отвечающий за функционал корзины.
 */
class Basket_top {

  constructor() {
    //Получаем контейнер для хранения товаров в корзине.
    this.$cartContainer = $('.cart_container_item');
    //Получаем элемент, показывающий количество товаров на изобраении корзины.
    this.$cartAmountDivCircle = $('.cart_ellipse2');
    //Селектор кнопки "Удалить товар".
    this.$removeBtn = '.fa-times-circle';
    //Селектор кнопки "Добавить товар".
    this.$addBtn = $('.item_cart');
    //Селектор элемента хранящего общую сумму добавленных товаров.
    this.$totalPrice = $('#total_price');
    //Пусть к файлу json содержащий информацию о добавленных товарах.
    this.pathBasketJson = 'json/basket_get.json';
    //Общее количество товаров.
    this.totalGoods = 0;
    //Общая стоимость товаров.
    this.amount = 0;
    //Массив для хранения товаров.
    this.basketItems = [];
    //Вызываем метод получения товаров из json файла.
    this.ajaxGetItems();

    //Инициализируем обработчик события по кнопке "Добавить товар".
    this.$addBtn.on('click', event => this.add(event));
    //Инициализируем обработчик события по кнопке "Удалить товар".
    this.$cartContainer.on('click', this.$removeBtn, event => this.remove(event));
  }


  /**
   * Метод изменяет значения переменных this.totalGoods, this.amount, this.basketItems на данные
   * полученные из json файла. И вызывает конструктор класса Good для создания, а также добавления
   * товара в элемент корзины.
   */
  ajaxGetItems() {
    //Делаем ajax запрос.
    $.ajax({
      type: 'GET',
      url: this.pathBasketJson,
      dataType: 'json',
      context: this,
      //В случаем успеха.
      success: function (data) {
        //Сохраняем количество товара в this.totalGoods и отображем его
        //на иконке корзины в шапке сайта.
        this.totalGoods = data.result;
        this.$cartAmountDivCircle.text(this.totalGoods);

        //Сохраняем общую стоимость товара в this.amount и отображаем ее в корзине.
        this.amount = data.amount;
        this.$totalPrice.text(this.amount);

        //Перебираем массив с элементами в json файле и добавляем их в this.basketItems.
        for (let i = 0; i < data.basket.length; i++) {
          this.basketItems.push(data.basket[i]);
        }
        //Перебиаем наш массив с товарами.
        for (let j = 0; j < this.basketItems.length; j++) {
          //Вызываем конструктор Good передавая ему необходимые параметры.
          let good = new Good(this.basketItems[j].id, this.basketItems[j].url, this.basketItems[j].title, this.basketItems[j].price, this.basketItems[j].count);
          //Вызываем метод render() для формирования элемента товара.
          good.render(this.$cartContainer);
        }
      },
      //В случае ошибки выводим в консоль собщение.
      error: function (error) {
        console.log('Ошибка при получении содержимого корзины', error);
      }
    });
  }

  /**
   * Метод добавляет элемент в корзину.
   * @param event - событие клика.
   */
  add(event) {
    //Получаем id добавляемого элемента из дата-атрибута.
    let $idProduct = parseInt($(event.target).parent().attr('data-item_id'));
    //Получаем ссылку на изображение данного элемента из дата-атрибута.
    let $imgUrlProduct = $(event.target).parent().attr('data-item_url');

    //Созадем цикл для перебора товаров, находящихся в корзине.
    for (let i = 0; i < this.basketItems.length; i++) {
      //Если id добавляемого товара равно id товара, который уже находится в корзине.
      if (this.basketItems[i].id === $idProduct) {
        //Увеличиваем общее количство товаров на 1.
        this.totalGoods++;
        //Прибавляем цену товара к общей стоимости.
        this.amount += this.basketItems[i].price;
        //Увеличиваем на единицу кол-во данного товара.
        this.basketItems[i].count++;
        //Вызываем метод refresh(), который перерисует корзину.
        this.refresh();
        //Выходим из функции.
        return;
      }
    }

    //Если же id добавляемого товара не равно id товара, который уже находится в корзине,
    //то формируем новый объект с данными добавляемого товара.
    let newCartItem = {
      'id': $idProduct,
      'title': 'Mango  People  T-shirt',
      'url': $imgUrlProduct,
      'price': 52,
      'count': 1
    };
    //Добавляем данный объект в массив с товарами.
    this.basketItems.push(newCartItem);
    //Увеличиваем общую стоимость на цену товара.
    this.amount += 52;
    //Увеличиваем общее количество товаров на 1.
    this.totalGoods += 1;
    //Вызываем конструктор Good передавая ему необходимые параметры,
    //для создания нового элемента товара.
    let newCartItemConst = new Good($idProduct, $imgUrlProduct, 'Mango  People  T-shirt', 52, 1);
    newCartItemConst.render(this.$cartContainer);
    //Меняем общую стоимость в элементе корзины.
    this.$totalPrice.text(this.amount);
    //Меняем кол-во на пиктограмме корзины в шапке сайта.
    this.$cartAmountDivCircle.text(this.totalGoods);
  }

  /**
   * Метод удаляем элемент из корзины.
   * @param event - событие клика.
   */
  remove(event) {
    //Отменяем действие по умолчанию.
    event.preventDefault();
    //Получаем id добавляемого элемента из дата-атрибута.
    let $idProduct = parseInt($(event.target).parents('.cart_item').attr('data-item_id'));
    //Созадем цикл для перебора товаров, находящихся в корзине.
    for (let i = 0; i < this.basketItems.length; i++) {
      //Если id текущего элемента и товара, который собираемся удалить совпадают.
      if(this.basketItems[i].id === $idProduct) {
        //И количество данного товара равно 1,
        if(this.basketItems[i].count === 1) {
        //то уменьщаем общую стоимость на цену текущего товара,
        this.amount -= this.basketItems[i].price;
        //удаляем сам элемент из массива,
        this.basketItems.splice(i, 1);
        //а также уменьшаем общее количство товаров на 1.
        this.totalGoods--;
        //Обновляем корзину.
        this.refresh();
        //Выходим из цикла.
        return;
        }
        //Иначе уменьшаем количество конкретного товара на 1,
        this.basketItems[i].count -= 1;
        //общую стоимость на цену текущего товара,
        this.amount -= this.basketItems[i].price;
        //а также общее кол-во товаров на единицу.
        this.totalGoods--;
        //Обновляем корзину.
        this.refresh();
      }
    }
  }

  /**
   * Метод перерисовывает корзину.
   */
    refresh() {
      //Очищаем контейнер корзины.
      this.$cartContainer.empty();
      //Создаем переменную-счетчик для цикла.
      let i = 0;
      //Создаем цикл для перебора товаров, находящихся в корзине.
      for (let item of this.basketItems) {
        //Увеличиваем счетчик на 1.
        i++;
        //Вызываем конструктор Good передавая ему необходимые параметры,
        //для создания нового элемента товара.
        let good = new Good(item.id, item.url,item.title, item.price, item.count);
        good.render(this.$cartContainer);
      }

    //Меняем общую стоимость в элементе корзины.
    this.$totalPrice.text(this.amount);
    //Меняем кол-во на пиктограмме корзины в шапке сайта.
    this.$cartAmountDivCircle.text(this.totalGoods);
  }
}