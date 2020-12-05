'use strict';

/**
 * Класс формирует элемент товара и добавляет его в корзину.
 */
class Good {

  /**
   * Конструктор.
   * @param {number} id - id товара.
   * @param {string} url - ссылка на изображение товара.
   * @param {string} title - название товара.
   * @param {number} price - стоимость товара.
   * @param {number} count - количество товара.
   */
  constructor(id, url, title, price, count) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.price = price;
    this.count = count;
  }

  /**
   * Метод отрисовывает товары в корзине.
   * @param $jQueryElement - элемент корзины.
   */
  render($jQueryElement) {

    //Создаем контейнер для элемента товара.
    let $cartItem = $('<div/>', {
      class: 'cart_item',
      'data-item_id': this.id
    });
    //Создаем ссылку для товара.
    let $cartItemHref = $('<a/>', {
      href: '#'
    });
    //Создаем изображение товара.
    let cartItemImg = new Image();
    $(cartItemImg).attr({
      src: this.url,
      alt: 'cart_item'
    });
    //Помещаем изображение в ссылку.
    $cartItemHref.append(cartItemImg);
    //Добавляем нашу ссылку с изобраение в контейнер для элемента товара.
    $cartItem.append($cartItemHref);

    //Создаем контейнер для текстового описания товара.
    let $cartItemText = $('<div/>', {
      class: 'cart_item_text'
    });
    //Создаем переменную для хранения рейтинга.
    let $rating = $('<i class="fas fa-star"></i>' +
                   '<i class="fas fa-star"></i>' +
                   '<i class="fas fa-star"></i>' +
                   '<i class="fas fa-star"></i>' +
                   '<i class="fas fa-star-half"></i>'
);
    //Создаем ссылку с названием.
    let $cartItemTextHref = $('<a/>', {
      href: '#',
      text: this.title
    });
    //Добавляем ссылку с названием в контейнер для текста.
    $cartItemText.append($cartItemTextHref);
    //Следом добавляем рейтинг.
    $cartItemText.append($rating);

    //Создаем переменную хранящую количество и стоимость товара.
    let $cartItemH5 = $(`<h5><span class = "item_quantity">${this.count}</span> x $${this.price}</h5>`);

    //Добавляем переменнную в контейнер для текста.
    $cartItemText.append($cartItemH5);
    //Добавляем контейнер с текстом в основной блок элемента товара.
    $cartItem.append($cartItemText);

    //Создаем ссылку для кнопки "Удалить".
    let $cartItemRemoveBtnHref = $('<a/>', {
      href: '#'
    });
    //Создаем переменную хранящую изображение кнопки "Удалить".
    let $cartItemRemoveBtnImg = $('<i class = "fas fa-times-circle"></i>');
    //Добавляем изображение в ссылку.
    $cartItemRemoveBtnHref.append($cartItemRemoveBtnImg);
    //Ссылку-кнопку размещаем в основном контейнере.
    $cartItem.append($cartItemRemoveBtnHref);

    //Добавляем товар в корзину.
    $jQueryElement.append($cartItem);
  }
}