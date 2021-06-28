function onEntry(entry) {
    entry.forEach(change => {
        if (change.isIntersecting) {
            change.target.classList.add('cardVisible');
            var img = change.target.getElementsByTagName("img")[0];
            img.src = img.id;
        }
    });
}

function onCardChanged() {
    let options = {
        threshold: [0.3]
    };
    let observer = new IntersectionObserver(onEntry, options);
    let elements = document.querySelectorAll('.card');

    for (let elm of elements) {
        observer.observe(elm);
    }
}

var elem = document.getElementsByClassName("phone_list")[0];

let observer = new MutationObserver(onCardChanged);
observer.observe(elem, {
    childList: true, // наблюдать за непосредственными детьми
    subtree: true, // и более глубокими потомками
    characterDataOldValue: true // передавать старое значение в колбэк
});

onCardChanged();