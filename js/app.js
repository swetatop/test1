let currentCategory = 'capt';

let requests = {
capt: [],
fz: [],
postavka: [],
sabotage: []
};

const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(btn => {

btn.addEventListener('click', () => {

navItems.forEach(el => el.classList.remove('active'));

btn.classList.add('active');

currentCategory = btn.dataset.category;

document.getElementById('panelTitle').innerText = btn.innerText;

renderRequests();

});

});

document
.getElementById('createBtn')
.addEventListener('click', openModal);

loadFirebaseRealtime();
