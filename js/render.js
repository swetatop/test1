function renderRequests(){

const container =
document.getElementById('requestsContainer');

const data = requests[currentCategory];

document.getElementById('totalCount').innerText =
data.length;

const active =
data.filter(x =>
getRemainingMs(x.data["Дата та час"]) > 0
).length;

document.getElementById('activeCount').innerText =
active;

document.getElementById('endedCount').innerText =
data.length - active;

if(!data.length){

container.innerHTML = `
<div class="empty">
<i class="fa-regular fa-folder-open"></i>
Немає заявок
</div>
`;

return;

}

container.innerHTML = data.map(item => `

<div class="request">

<div class="request-header">

<div class="request-title">
${item.title}
</div>

<div class="request-date">
${item.date}
</div>

</div>

<div class="request-grid">

${Object.entries(item.data).map(([key,val]) => `

<div class="info-card">

<div class="info-label">
${key}
</div>

<div class="info-value">

${key === 'Дата та час'
? getTimerHTML(val)
: val}

</div>

</div>

`).join('')}

</div>

</div>

`).join('');

}

function loadFirebaseRealtime(){

Object.keys(requests).forEach(category => {

db.collection(category)
.orderBy('id','desc')
.onSnapshot(snapshot => {

requests[category] = [];

snapshot.forEach(doc => {

requests[category].push(doc.data());

});

renderRequests();

});

});

}
