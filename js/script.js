var Sub_Options = new Map([
    ["Oppo", ["Find", "Reno", "Neo", "A Series", "F Series", "K Series"]],
    ["Realme", ["X Series", "G Series", "Q Series", "V Series", "C Series", "Narzo", "8 Series", "7 Series", "6 Series", "5 Series", "3 Series"]],
    ["Vivo", ["X Series", "V Series", "Y Series", "NEX", "iQOO"]],
    ["OnePlus", ["Nord", "9 Series", "8 Series", "7 Series", "6 Series"]],
    ["Samsung", ["Galaxy Note", "Galaxy Fold", "Galaxy Z Series", "Galaxy S Series", "Galaxy A Series", "Galaxy M Series", "Galaxy F Series"]],
    ["Xiaomi", ["Note", "Mix", "Max", "A Series", "MI 11", "MI 10", "MI 9", "MI 8", "Redmi Note 10", "Redmi Note 9", "Redmi Note 8", "Redmi Note 7", "Redmi Note 6", "Redmi 9", "Redmi 8", "Redmi 7", "Redmi 6", "Redmi 5", "K40", "K30", "K20", "Poco F", "Poco X", "Poco M", "Poco C", "Black Shark", "Black Shark 2", "Black Shark 3", "Black Shark 4"]],
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

var SELECTED_SUB = ""; // Samsung
var SELECTED_OPTION = ""; // Galaxy
var SEARCH_REQUEST = "";
OnSearch();
fillSubUsingArray(Array.from(Sub_Options.keys()));

function OnSearchClear() {
    SELECTED_SUB = "";
    SELECTED_OPTION = "";
    SEARCH_REQUEST = "";
    document.getElementById('search_field').value = '';
    OnSearch();
}

function OnSearch(request) {
    var searchRequestShow = [];
    if (request == null) {
        request = SEARCH_REQUEST;
    } else {
        SEARCH_REQUEST = request;
    }

    if (request) {
        searchRequestShow.push(request);
    }
    if (SELECTED_SUB) {
        searchRequestShow.push(SELECTED_SUB);
    }

    if (SELECTED_OPTION) {
        searchRequestShow.push(SELECTED_OPTION);
    }

    fillCardsWithPhones();
    setCurrentSearch(searchRequestShow.join(' & '));
}

function setCurrentSearch(str) {
    if (!str) {
        str = "все телефоны";
    }
    document.getElementById("current_search").textContent = "Текущий запрос: " + str;
}

function setTitle() {
    document.querySelectorAll("#title h2")[0].textContent = SELECTED_SUB + " " + SELECTED_OPTION;
}

// On option click
function fillCardsWithPhones() {
    var divList = document.querySelectorAll(".phone_list")[0];
    divList.innerHTML = "";

    var phonesToAdd = getPhonesByRequest();

    phonesToAdd.forEach(phone => {
        var img = phone.Image;
        if (!phone.Image) {
            img = "https://smarfony.ru/wp-content/uploads/2020/11/realme-7-5g.jpg";
        }

        var nfc = phone.NFC == "true" ? "есть" : "нет";
        var jack = phone.Jack35 == "true" ? "да" : "нет";

        var description = `Размер: ${phone.Size}\n\
                           Вес: ${phone.Weight}\n\
                           Экран: ${phone.Screen}\n\
                           Чип: ${phone.Chip}\n\
                           GPU: ${phone.GPU}\n\
                           Память: ${phone.Memory}\n\
                           Основная камера: ${phone.MainCam}\n\
                           Фронтальная камера: ${phone.SelfieCam}\n\
                           Bluetooth: ${phone.Bluetooth}\n\
                           NFC: ${nfc}\n\
                           Jack 3,5: ${jack}\n\
                           USB: ${phone.USB}\n\
                           Аккумулятор: ${phone.Acuum}\n\
                           Экран: ${phone.Screen}\n`;

        addPhone(phone.Name, img, description)
    });
    setTitle();
}

function phoneSatisfy(phone, search_request) {
    if (!search_request) {
        return true;
    }

    return phone.Name.toLowerCase().includes(search_request.toLowerCase());
}

function getPhonesByRequest() {
    var res = [];
    for (let i = 0; i < phones.length; i++) {
        const phone = phones[i];
        if (phone.Name.split(' ')[0] !== SELECTED_SUB && SELECTED_SUB) {
            // Первое слово названия телефона соответствует компании
            continue;
        }

        if (phone.Category == SELECTED_OPTION || !SELECTED_OPTION) {
            if (phoneSatisfy(phone, SEARCH_REQUEST)) {
                res.push(phone);
            }
        }
    }
    return res;
}

function addPhone(title, image, description) {
    var divList = document.querySelectorAll(".phone_list")[0];

    var h = document.createElement("h4");
    h.textContent = title;

    var p = []
    for (let i = 0; i < description.split('\n').length - 1; i++) {
        const element = description.split('\n')[i];
        var par = document.createElement("p");
        var span = document.createElement("span");
        span.textContent = element.split(':')[0] + ":";
        par.textContent = element.split(':')[1];

        var d  = document.createElement("div");
        d.style = "display: flex; flex-direction: row;"
        d.appendChild(span);
        d.appendChild(par);

        p.push(d);
    }

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
    p.forEach(element => {
        div_card_container.appendChild(element);
    });

    div_card.appendChild(div_card_container);

    divList.appendChild(div_card);
}


// On sub click
function fillOptionsBySub(sub_selected) {
    SELECTED_SUB = sub_selected;
    var val = Sub_Options.get(sub_selected);
    if (val) {
        fillOptionsUsingArray(val);
    } else {
        val = optionsIOS.get(sub_selected);
        if (val) {
            fillOptionsUsingArray(val);
        }
    }
}

function fillOptionsUsingArray(text_array) {
    var menu = document.querySelectorAll(".filter_menu")[0];
    menu.innerHTML = "";
    for (let i = 0; i < text_array.length; i++) {
        var option = document.createElement("button");
        option.textContent = text_array[i];
        option.onclick = function () { SELECTED_OPTION = text_array[i]; OnSearch(); }
        menu.appendChild(option);
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
        btn.onclick = function () { fillOptionsBySub(sub_text); SELECTED_SUB = sub_text; SELECTED_OPTION = ""; OnSearch(); }

        a.appendChild(btn);

        listElement.appendChild(a);

        ul.appendChild(listElement);
    }
}
