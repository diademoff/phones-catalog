console.log(phones);

var optionsAndroid = new Map([
    ["Oppo", ["Find", "Reno", "Neo", "A Series", "F Series", "K Series"]],
    ["Realme", ["X Series", "G Series", "Q Series", "V Series", "C Series", "Narzo", "8 Series", "7 Series", "6 Series", "5 Series", "3 Series"]],
    ["Vivo", ["X Series", "V Series", "Y Series", "NEX", "iQOO"]],
    ["OnePlus", ["Nord", "9 Series", "8 Series", "7 Series", "6 Series"]],
    ["Samsung", ["Galaxy Note", "Galaxy Fold", "Galaxy Z Series", "Galaxy S Series", "Galaxy A Series", "Galaxy M Series", "Galaxy F Series"]],
    ["Xiaomi", ["Note", "Mix", "Max", "A Series", "MI 11", "MI 10", "MI 9", "MI 8", "Redmi Note", "Redmi 9", "Redmi 8", "Redmi 7", "Redmi 6", "Redmi 5", "K40", "K30", "K20", "Poco F", "Poco X", "Poco M", "Poco C", "Black Shark", "Black Shark 2", "Black Shark 3", "Black Shark 4"]],
    ["Motorola", ["Edge", "Edge S", "Edge+", "Moto E", "Moto G", "Moto Z"]],
    ["Asus", ["Zenfone 7", "Zenfone 6", "Zenfone 5", "ROG Phone 5", "ROG Phone 3", "ROG Phone 2", "ROG Phone"]],
    ["ZTE", ["Red Magic", "Z Series", "Axon", "Blade", "S30 Pro", "S30", "S30 SE"]],
    ["Nokia", ["X20", "X10", "X71", "1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "9 Series", "G Series", "C Series"]],
    ["Sony", ["Xperia 1 Series", "Xperia 5 Series", "Xperia 10 Series", "Xperia L Series", "Xperia Pro"]],
    ["Meizu", ["18 Series", "17 Series", "16 Series", "15 Series", "M Series", "V8 Series", "X8 Series"]],
    ["Honor", ["30 Series", "20 Series", "10 Series", "9 Series", "V Series", "View", "PLay"]],
    ["Huawei", ["P40", "P30", "P20", "P Smart", "Nova Series", "Y Series", "Mate Series", "Enjoy Series"]],
    ["Google", ["Pixel 5", "Pixel 4", "Pixel 3"]]
]);

var optionsIOS = new Map([
    ["IPhone", ["12 Series", "11 Series", "X Series", "8 Series", "7 Series", "6 Series", "5 Series"]]
]);



var SELECTED_OS = "Android";
// Заполнить меню навигации
fillSubByOs(SELECTED_OS);

function fillCardsWithPhones(category) {
    var divList = document.querySelectorAll(".phone_list")[0];
    divList.innerHTML = "";

    console.log(category);

    var phonesToAdd = getPhonesByCategory(category);
    phonesToAdd.forEach(phone => {
        var img = '';
        if (!phone.Image) {
            img = "https://cdn.svyaznoy.ru/upload/iblock/684/panasonic%20kx-tgh212.jpg/resize/483x483/hq/";
        }
        addPhone(phone.Name, img)
    });
}

function getPhonesByCategory(category) {
    var res = [];
    phones.forEach(e => {
        if (e.Category == category) {
            res.push(e);
        }
    });
    return res;
}

function addPhone(title, image) {
    var divList = document.querySelectorAll(".phone_list")[0];

    var h = document.createElement("h4");
    h.textContent = title;

    var div_card_container = document.createElement("div");
    div_card_container.className = "card_container";

    var img = document.createElement("img");
    img.src = image;
    img.alt = "image";
    img.style = "width:100%";

    var div_card = document.createElement("div");
    div_card.className = "card";

    div_card.appendChild(img);

    div_card_container.appendChild(h);

    div_card.appendChild(div_card_container);

    divList.appendChild(div_card);
}


// Заполнить опции для выбранного саб-меню
function fillOptionsBySub(sub_selected) {
    var val = optionsAndroid.get(sub_selected);
    if (val) {
        fillOptionsUsingArray(val);
    } else {
        val = optionsIOS.get(sub_selected);
        if (val) {
            fillOptionsUsingArray(val);
        } else {
            console.log(sub_selected + " не найден");
        }
    }
}

function fillOptionsUsingArray(text_array) {
    var menu = document.querySelectorAll(".filter_menu select")[0];
    menu.innerHTML = "";
    for (let i = 0; i < text_array.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.textContent = text_array[i];
        option.onclick = function () { fillCardsWithPhones(text_array[i]) }
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
