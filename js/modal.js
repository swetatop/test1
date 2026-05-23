
const factions = [

"The Ballas Gang🟣",
"The Vagos Gang🟡",
"The Marabunta Gang🔵",
"The Families Gang🟢",
"The Bloods Gang🔴"

];

function openModal(){

const modal =
document.getElementById('modal');

const body =
document.getElementById('modalBody');

body.innerHTML = `

<form id="mainForm">

<div class="form-grid">

<div class="form-group">
<label>Фракція</label>

<select name="Фракція">

${factions.map(f =>
`<option>${f}</option>`
).join('')}

</select>

</div>

<div class="form-group">
<label>Дата та час</label>
<input required type="datetime-local" name="Дата та час">
</div>

<div class="form-group">
<label>Відповідальний</label>
<input required name="Відповідальний">
</div>

</div>

<div class="modal-actions">

<button type="button"
class="cancel-btn"
onclick="closeModal()">

Скасувати

</button>

<button class="submit-btn">
Створити
</button>

</div>

</form>

`;

modal.style.display = 'flex';

document
.getElementById('mainForm')
.addEventListener('submit', createRequest);

}

function closeModal(){

document.getElementById('modal')
.style.display = 'none';

}

async function createRequest(e){

e.preventDefault();

const formData = new FormData(e.target);

const values =
Object.fromEntries(formData.entries());

const item = {

id: Date.now(),

title: `${values["Фракція"]} • ${currentCategory}`,

date: new Date().toLocaleString('uk-UA'),

data: values

};

requests[currentCategory].unshift(item);

renderRequests();

closeModal();

await db.collection(currentCategory).add(item);

}
