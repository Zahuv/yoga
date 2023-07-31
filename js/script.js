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

    info.addEventListener('click', function(event) {                            //НАВЕШИВАЕМ ОБРАБОТЧИК СОБЫТИЯ. ПОМЕЩАЕМ ОБЬЕКТ В ФУНКЦИЮ Т.К. БУДЕМ СРАВНИВАТЬ С ТЕМ, КУДА МЫ КЛИКАЕМ
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

    //TIMER

    let deadline = '2023-09-10';                                                        //СТАВИМ ДАТУ ЗАВЕРШЕНИЯ РАБОТЫ ТАЙМЕРА 

    function getTimeRemaining(endtime) {                                                //СОЗДАЕМ ФУНКЦИЮ КОТОРАЯ БУДЕТ ОПРЕДЕЛЯТЬ СКОЛЬКО ВРЕМЕНИ ОСТАЛОСЬ ОТ НЫНЕШНЕГО МОМЕНТА ДО ДЕДЛАЙНА
        let t = Date.parse(endtime) - Date.parse(new Date()),         //СОЗДАЕМ ПЕРЕМЕННУЮ В КОТОРУЮ БУДЕМ ЗАПИСЫВАТЬ РАЗНИЦУ МЕЖДУ ДЕДЛАЙНОМ И НЫНЕШНЕЙ ДАТОЙ
        seconds = Math.floor((t/1000) % 60),                                            //ВЫСЧИТЫВАЕМ СЕКУНДЫ
        minutes = Math.floor((t/1000/60) % 60),                                         //ВЫСЧИТЫВАЕМ МИНУТЫ
        hours = Math.floor((t/1000/60/60) % 24),                                        //ВЫСЧИТЫВАЕМ ЧАСЫ
        days = Math.floor((t/(1000*60*60*24)));                                         //ВЫСЧИТЫВАЕМ ДНИ

        //hours = Math.floor((t/(1000*60*60)))
        //hours = Math.floor((t/1000/60/60) % 24);                  //ВЫСЧИТЫВАЕМ ЧАСЫ В 24-Х ЧАСОВОМ ФОРМАТЕ
        //days = Math.floor((t/(1000*60*60*24)));                   //ВЫСЧИТЫВАЕМ ДНИ

        return {                                                    //ПРОПИСЫВАЕМ ЧТО ФУНКЦИЯ ДОЛЖНА ВОЗВРАЩАТЬ
            'total' : t,
            'days'  : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {                                           //СОЗДАЕМ ФУНКЦИЮ, ДЕЛАЮЩУЮ ВЕРСТКУ ДИНАМИЧНОЙ, ПЕРЕДАЕМ ПАРАМЕТРЫ ID БЛОКА ГДЕ СВЕРСТАН ТАЙМЕР И ДЕДЛАЙН
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {                                        //СОЗДАЕМ ФУНКЦИЮ КОТОРАЯ КАЖДУЮ СЕКУНДУ БУДЕТ ОБНОВЛЯТЬ ДАННЫЕ В ТАЙМЕРЕ
            let t = getTimeRemaining(endtime);

            function addZero(num) {
                        if (num <= 9) {
                            return '0' + num;
                        } else return num
                    };

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);                                
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            } 
        }

    }

    setClock('timer', deadline);                                                //ВЫЗЫВАЕМ ФУНКЦИЮ УКАЗАВ ID И ПЕРЕМЕННУЮ СОДЕРЖАЩУЮ ДЕДЛАЙН
});