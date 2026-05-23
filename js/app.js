let currentCategory = 'capt';

let requests = {

capt: [],
fz: [],
postavka: [],
sabotage: []

};

const navItems =
document.querySelectorAll('.nav-item');

const panelTitle =
document.getElementById('panelTitle');

/* =========================
CATEGORY SWITCH
========================= */

navItems.forEach(btn => {

btn.addEventListener('click', () => {

navItems.forEach(el =>
el.classList.remove('active')
);

btn.classList.add('active');

currentCategory =
btn.dataset.category;

/* =========================
TITLE
========================= */

const map = {

capt:'Capture',

fz:'Напад на ФЗ',

postavka:'Поставки',

sabotage:'Саботаж'

};

panelTitle.innerText =
map[currentCategory];

renderRequests();

});

});

/* =========================
FILTERS
========================= */

document
.getElementById('initiatorFilter')
.addEventListener('change', renderRequests);

document
.getElementById('defenderFilter')
.addEventListener('change', renderRequests);

/* =========================
CREATE BTN
========================= */

document
.getElementById('createBtn')
.addEventListener('click', openModal);

/* =========================
TOAST
========================= */

function showToast(text){

const toast =
document.createElement('div');

toast.className = 'toast';

toast.innerText = text;

document.body.appendChild(toast);

setTimeout(() => {

toast.style.opacity = '0';

setTimeout(() => {
toast.remove();
},300);

},2200);

}

/* =========================
START
========================= */

loadFirebaseRealtime();
