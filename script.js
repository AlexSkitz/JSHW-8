// HW 1
//makeProfileTimer
//Напишите функцию makeProfileTimer, которая служит для замера 
//времени выполнения другого кода и работает следующим образом:
//alert должен вывести время в микросекундах от 
//выполнения makeProfileTimer до момента вызова timer(), 
// т. е. измерить время выполнения alert

var timer = makeProfileTimer();

function makeProfileTimer() {
    var t0 = performance.now();
    alert('Замеряем время работы этого alert');
    var t1 = performance.now();
    alert('Alert took ' + (t1 - t0) + ' microseconds.');
}

// HW 2
//makeSaver
//Напишите функцию makeSaver, которая:

var saver = makeSaver(Math.random) //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random 
// в примере). На этом этапе Math.random НЕ вызывается
var value1 = saver()              //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
var value2 = saver()              //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную 
//в makeSaver функцию;
value1 === value2                 // всегда true

var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random() * 6)])
var value3 = saver2()
var value4 = saver2()

value3 === value4 // тоже должно быть true

//Таким образом makeSaver решает две задачи:
//Навсегда сохраняет результат функции.Это актуально, например, 
//для Math.random.
//Действует лениво, то есть вызывает Math.random только тогда,
// когда результат действительно нужен.Если же по 
//каким - то причинам значение не понадобится, 
//то Math.random даже не будет вызван



// HW 3
//Final Countdown
//Напишите код, который будет делать обратный ежесекундный 
//отсчёт в консоли, используя console.log.Используйте 
//Self Invoked Function для создания замыкания и setTimeout для
// задержки вывода.Результатом должно быть:

let timer;
let x = +prompt('Введите число с которого начнется отсчет:', "5")
finalCountdown();
function finalCountdown() {
    console.log(x);
    --x;
    if (x < 0) {
        clearTimeout(timer);
        console.log('поехали!');

    } else {

        timer = setTimeout(finalCountdown, 1000);

    }
}




// HW 4
//Изучите встроенную функцию bind, и сделайте свою версию, 
//которая позволит определить "значение по умолчанию" не только 
//для первых параметров, но для любых других, например для 
//степени в Math.pow:
//Массив, который идет третьим параметром определяет, 
//какие поля должны подменяться значением по умолчанию, 
//а какие - задаваться в последствии(undefined).

const myBind = (func, context, arrWithParams) => {
    return (...arg) => {
        func.call(
            context,
            ...arrWithParams.map(item => item !== undefined ? item : arg.shift())

        )
    }
}

const result = myBind(Math.pow, Math, [undefined, 5]);
console.log(result(2));

const result = myBind(Math.min, Math, [undefined, 4, undefined, 5, undefined, 8, undefined, 9])
console.log(result(-1, -5, 3, 15))

///////////////////////////

function myBind(func, context, argsArray) {
    return (...arg) => {
        const resArray = argsArray.map((elem) => {
            if (!elem) {
                return arg.shift();
            }

            return elem;
        });
        const result = func.apply(context, resArray);
        console.log(result);
    }
}

var pow5 = myBind(Math.pow, Math, [undefined, 5]);
pow5(3);//243
var cube = myBind(Math.pow, Math, [undefined, 3]);
cube(4);//64
var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5, undefined, 8, undefined, 9]);
chessMin(-1, -5, 3, 15);//-5