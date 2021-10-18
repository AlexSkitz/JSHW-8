/*fetch basic
С помощью следующего кода считать и вывести информацию о Люке Скайвокере:
fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => console.log(luke))
Напишите функцию для отображения любого JSON в форме таблицы.Функция должна принимать два параметра:
DOM - элемент, в котором строится таблица
JSON, который нужно отобразить.*/

fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json(),error => console.error(error))
    .then(luke => {outputResponce('responce_content', luke);});

const outputResponce = (elem,responce)=>{
    let responceDom = document.getElementById("elem");
        responceDom.innerHTML = "<table class='request_info'><tbody id='responce_tab'></tbody></table>";
        let responceTab = document.getElementById("responce_tab");
        if (Object.keys(responce).length == 0) {
            responceTab.innerText = 'Пусто';
            return;
        }

        for (key in responce) {
            let tr = document.createElement("tr");
                tr.className = "tr";
            let tdKey = document.createElement("td");
                tdKey.className = "td_key";
                tdKey.innerText = key;
                tr.append(tdKey);
            let tdValue = document.createElement("td");
            tdValue.className = "td_val";
            if(Array.isArray(responce[key])){
                if(responce[key].length > 0){
                    responce[key].map((el)=>{
                        let validation = "" + el;
                        if (validation.indexOf('http') !== -1) {
                            tdValue.append(buttonCreator(el));
                        } else {
                            let div = document.createElement("div");
                            div.className = "td-div";
                            div.innerText = el;
                            tdValue.append(div);
                        }
                    });
                }
            } else {
                let validation = "" + responce[key];
                if (validation.indexOf('http') !== -1) {
                    tdValue.append(buttonCreator(validation))
                } else {
                    tdValue.innerText = responce[key];
                }
            }
            tr.append(tdValue);
        responce_tab.append(tr);
};
}

let buttonCreator = (link)=>{
    let button = document.createElement("button");
    button.className = "link_button";
    button.onclick = ()=>requestIt(link);
    button.innerText = "перейти";
    getName(link, button);
    return button;
};


let requestIt = (path)=>{
    fetch(path)
    .then(res => res.json(),error => console.error(error))
    .then(luke => {
        outputResponce('responce_content',luke);
    });
};
let getName = (path, el)=>{
     fetch(path)
     .then(res => res.json(),error => console.error(error))
     .then(luke => {
        el.innerText = "перейти";
        if("name" in luke){
            el.innerText - luke.name + ": перейти";
        }
        if("title" in luke){
            el.innerText = luke.title + ": перейти";
        }
    });
};



/*
fetch improved
Расширить функцию отображения:
Если одно из полей строка или массив.
Если строки или строка содержат в себе https://swapi.dev/api/
То выводить вместо текста строки кнопку, при нажатии на которую:
делается fetch данных по этой ссылке
функция отображения запускает сама себя(рекурсивно) для отображения новых данных в том же элементе.
*/




/*myfetch
Используя XMLHTTPRequest, напишите промисифицированную функцию myfetch, т.е.функцию, которая возвращает промис, и работает схоже с fetch, только в один этап:
myfetch('https://swapi.dev/api/people/1/')
    .then(luke => console.log(luke))
Функция myfetch ожидает что ответ будет в формате JSON(используйте JSON.parse(response.text)) В случае ошибок(request.onerror или request.status не 200) не забудьте вызывать reject
function myfetch(url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHTTPRequest()
        ///...
    })
}*/

function myfetch(url){
    return new Promise (function (resolve, reject){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            if(xhr.status != 200) {
                reject('Ошибка ${xht.status}: ${xhr.statusText}');
            } else {
                let responceObj = JSON.parse(xhr.responseText);
                resolve(responceObj);
            }
        }
        xhr.onerror = () => reject('Ошибка запроса. ${xhr.statusText}');
        xhr.send();
    });
}

myfetch('https://swapi.dev/api/people/1/')
    .then(luke => console.log(luke), error=> console.error(error));

/*
race
Используя Promise.race запустите запрос на API(myfetch) параллельно с delay.По результату определите, что было быстрее, запрос по сети, или определенный интервал времени.Подберите параметр delay так, что бы результат был неизвестен изначально, и при многократных запусках быстрее был то delay, то myfetch.*/


let myPromice = myfetch('https://swapi.dev/api/people/1/')
    .then(luke => luke, error => console.error(error));

let somePromice = delay(Math.floor(900*Math.random()))
    .then(() => "Wat`s up?")
Promise.race([somePromice, myPromice]).then((value) => {
    console.log(value);
})

function delay(ms){
    return new Promise((resolve, reject) => {
        setTimeout(resolve,ms);
    });
};