window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {                                    //ФУНКЦИЯ, КОТОРАЯ СКРЫВАЕТ ТАБЫ
        for (let i = a; i < tabContent.length; i++) {               //ЗАПУСКАЕМ ЦИКЛ, ПРОВЕРЯЮЩИЙ ОБЩЕЕ КОЛИЧЕСТВО ТАБОВ 
            tabContent[i].classList.remove('show');                 //УДАЛЯЕТ КЛАСС
            tabContent[i].classList.add('hide');                    //ДОБАВЛЯЕТ КЛАСС
        }
    }

    hideTabContent(1);                                              //ЗНАЧЕНИЕ УСТАНАВЛИВАЕТСЯ ДЛЯ ТОГО ЧТОБЫ ОТОБРАЖАЛСЯ ПЕРВЫЙ ПО СЧЕТУ ТАБ

    function showTabContent(b) {                                    //ДОБАВЛЯЕТ ТАБ
        if (tabContent[b].classList.contains('hide')) {             //ПРОВЕРЯЕМ СОДЕРЖИТ ЛИ КЛАСС ОПРЕДЕЛЕННОЕ ЗНАЧЕНИЕ
            tabContent[b].classList.remove('hide');                 //УДАЛЯЕМ КЛАСС
            tabContent[b].classList.add('show');                    //ДОБАВЛЯЕМ КЛАСС
        }
    }

    info.addEventListener('click', function(event) {                            //НАВЕШИВАЕМ ОБРАБОТЧИК СОБЫТИЯ. ПОИЕЩАЕМ ОБЬЕКТ В ФУНКЦИЮ Т.К. БУДЕМ СРАВНИВАТЬ С ТЕМ, КУДА МЫ КЛИКАЕМ
        let target = event.target;                                              //ЗАДАЕМ ПЕРЕМЕННУЮ ДЛЯ СОБЫТИЯ                                 
        if (target && target.classList.contains('info-header-tab')) {           //ПРОВЕРЯЕМ ЧТО МЫ ДЕЙСТВИТЕЛЬНО КЛИКНУЛИ НА ЭЛЕМЕНТ
            for (let i = 0; i < tab.length; i++) {                              // ЗАПУСКАЕМ ЦИКЛ ПЕРЕБОРА, ЧТОБЫ ВЫБРАТЬ НУЖНЫЙ ТАБ
                if (target == tab[i]) {                                         //ЕСЛИ ПОПАЛИ НА НУЖНЫЙ ТАБ,
                    hideTabContent(0);                                          //СКРЫВАЕМ ВСЕ ТАБЫ
                    showTabContent(i);                                          //ПОКАЗЫВАЕМ ТАБ НА КОТОРЫЙ КЛИКНУЛИ
                    break;                                                      //ПРЕРЫВАЕМ ЦИКЛ
                }
            }
        }
    });
});