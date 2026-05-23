function renderRequests(){

const container =
document.getElementById('requestsContainer');

const data = requests[currentCategory];

const initiator =
document.getElementById('initiatorFilter').value;

const defender =
document.getElementById('defenderFilter').value;

/* =========================
FILTERS
========================= */

const filteredData = data.filter(item => {

const matchInitiator =

initiator === 'all' ||

item.data["Ініціатор"] === initiator ||

item.data["Фракція"] === initiator;

const matchDefender =

defender === 'all' ||

item.data["Захисник"] === defender ||

item.data["Союзник"] === defender;

return matchInitiator && matchDefender;

})

/* =========================
SORT
========================= */

.sort((a,b) => {

const aTime =
getRemainingMs(a.data["Дата та час"]);

const bTime =
getRemainingMs(b.data["Дата та час"]);

const aEnded = aTime <= 0;
const bEnded = bTime <= 0;

if(aEnded && !bEnded) return 1;
if(!aEnded && bEnded) return -1;

return aTime - bTime;

});

/* =========================
STATS
========================= */

document.getElementById('totalCount')
.innerText = filteredData.length;

const active =
filteredData.filter(x =>
getRemainingMs(x.data["Дата та час"]) > 0
).length;

document.getElementById('activeCount')
.innerText = active;

document.getElementById('endedCount')
.innerText = filteredData.length - active;

/* =========================
EMPTY
========================= */

if(!filteredData.length){

container.innerHTML = `

<div class="empty">

<i class="fa-regular fa-folder-open"></i>

<span>Немає заявок</span>

</div>

`;

return;

}

/* =========================
RENDER
========================= */

container.innerHTML =
filteredData.map(item => `

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

/* =========================
REALTIME FIREBASE
========================= */

function loadFirebaseRealtime(){

Object.keys(requests).forEach(category => {

db.collection(category)

.orderBy('id','desc')

.onSnapshot(snapshot => {

requests[category] = [];

snapshot.forEach(doc => {

const data = doc.data();

if(!data.id){
data.id = 0;
}

requests[category].push(data);

});

requests[category]
.sort((a,b) => b.id - a.id);

renderRequests();

});

});

}

/* =========================
AUTO REFRESH TIMER
========================= */

setInterval(() => {
renderRequests();
},60000);

/* =========================
CLEANUP
========================= */

async function cleanupOldRequests(){

const twoWeeks =
14 * 24 * 60 * 60 * 1000;

const now = Date.now();

for(const category of Object.keys(requests)){

const snapshot =
await db.collection(category).get();

snapshot.forEach(async doc => {

const data = doc.data();

if(now - data.id > twoWeeks){

await db
.collection(category)
.doc(doc.id)
.delete();

}

});

}

}

cleanupOldRequests();
