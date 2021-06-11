var optionsAndroid = new Map([
    ['Samsung', ["Galaxy Note", "Galaxy Fold"]],
    ['OPPO', ["Find X", "Find X2", "Find X3", "A Series A1", "A Series A3", "A Series A5", "A Series A7", "A Series A9", "F Series F1"]],
    ['Realme', ["Realme X", "Realme G", "Realme Q", "Realme V", "Realme C"]]
]);

var optionsIOS = new Map([
    ['IPhone', []],
]);


var SELECTED_OS = "Android";
// Заполнить меню навигации
fillSubByOs(SELECTED_OS);


// Заполнить опции для выбранного саб-меню
function fillOptionsBySub(sub_selected) {
    var val = optionsAndroid.get(sub_selected);
    if (val) {
        fillOptionsUsingArray(val);
    } else {
        console.log(sub_selected + " не найден");
    }
}

function fillOptionsUsingArray(text_array) {
    var menu = document.querySelectorAll(".filter_menu select")[0];
    menu.innerHTML = "";
    for (let i = 0; i < text_array.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = text_array[i];
        menu.appendChild(option);
    }
}

// Заполнить по выбранной ОС
function fillSubByOs(os_name) {
    SELECTED_OS = os_name;
    if (os_name === "Android") {
        fillSubUsingArray(Array.from(optionsAndroid.keys()));
    } else if (os_name === "IOS") {
        fillSubUsingArray(Array.from(optionsIOS.keys()));
    } else if (os_name === "Harmony") {
        fillSubUsingArray(["lorem"]);
    }
}

// Заполнить массивом
function fillSubUsingArray(text_array) {
    var ul = document.querySelectorAll(".sub_nav nav ul")[0];

    ul.innerHTML = ''; // Удалить старые элементы

    for (let i = 0; i < text_array.length; i++) {
        const sub_text = text_array[i];
        a = document.createElement("a");
        listElement = document.createElement("li");
        btn = document.createElement("button");

        btn.textContent = sub_text;
        btn.onclick = function () { fillOptionsBySub(sub_text); }

        a.appendChild(btn);

        listElement.appendChild(a);

        ul.appendChild(listElement);
    }
}
