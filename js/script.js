window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //TAB

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

    //MODAL

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('.more-splash');
        document.body.style.overflow = '';
    });


    //FORM FORMAT USING PROMISE

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо. Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так'
    };

    let form = document.getElementsByClassName('main-form')[0],
            formButton = document.getElementById('form'),
            input = document.getElementsByTagName('input'),
            statusMessage = document.createElement('div');
            statusMessage.classList.add('status');

    function sendForm(elem) {
        elem.addEventListener('submit', function(e) {
            e.preventDefault();
                elem.appendChild(statusMessage);
                let formData = new FormData(elem);

                function postData(data) {
                    return new Promise(function(resolve, reject) {
                        let request = new XMLHttpRequest();
                        request.open('POST', 'server.php');
                        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

                        request.onreadystatechange = function() {
                            if (request.readyState < 4) {
                                resolve()
                            } else if (request.readyState === 4) {
                                if (request.status == 200 && request.status < 3) {
                                resolve()
                                } else {
                                    reject()
                                }
                            }
                        }
                        request.send(data);
                    })  
                }   //end postData

                function clearInput() {
                    for (let i = 0; i < input.length; i++) {
                        input[i].value = '';
                    };
                }

                postData(formData)
                    .then(() => statusMessage.innerHTML = message.loading)
                    .then(() => statusMessage.innerHTML = message.success)
                    .catch(() => statusMessage.innerHTML = message.failure)
                    .then(clearInput)
        });
    }

    sendForm(form);
    sendForm(formButton);

    //STANDART AJAX EXAMPLE
    // let form = document.querySelector('.main-form'),
    //     input = form.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div');
    //     statusMessage.classList.add('status');

    // form.addEventListener('submit', function(event) {
    //     event.preventDefault();
    //     form.appendChild(statusMessage);

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php');
    //     request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    //     let formData = new FormData(form);

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });
    //     let json = JSON.stringify(obj);

    //     request.send(json);

    //     request.addEventListener('readystatechange', function() {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.readyState === 4 && request.status == 200){
    //             statusMessage.innerHTML = message.success;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     };
    // });


    //SLIDER

    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if(n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        //Alternative declaration
        // for(let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });

    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for(let i = 0; i < dots.length + 1; i++) {
            if(event.target.classList.contains('dot') && event.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    //CALCULATOR

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = 0;

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if(restDays.value  == '') {
                totalValue.innerHTML = 0;
            } else if (persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum) * 4000;

            if(persons.value  == '') {
                totalValue.innerHTML = 0;
            } else if (restDays.value == '') {
                totalValue.innerHTML = 0;
            } else {
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function() {
            if(restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });

});