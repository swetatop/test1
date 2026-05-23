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

let form = '';

/* =========================
CAPTURE
========================= */

if(currentCategory === 'capt'){

form = `

<form id="mainForm">

<div class="form-grid">

<div class="form-group">
<label>Нікнейм</label>
<input required name="Нікнейм">
</div>

<div class="form-group">
<label>Static ID</label>
<input required name="Static ID">
</div>

<div class="form-group">

<label>Ініціатор</label>

<select name="Ініціатор">

${factions.map(f =>
`<option>${f}</option>`
).join('')}

</select>

</div>

<div class="form-group">

<label>Захисник</label>

<select name="Захисник">

${factions.map(f =>
`<option>${f}</option>`
).join('')}

</select>

</div>

<div class="form-group">
<label>Територія</label>
<input required name="Територія">
</div>

<div class="form-group">

<label>Зброя</label>

<select name="Зброя">

<option>Combat Pistol</option>
<option>Micro SMG</option>
<option>Sawed-Off Shotgun</option>
<option>Compact Rifle</option>
<option>Heavy Revolver</option>
<option>Machine Pistol</option>
<option>Special Carbine</option>
<option>Special Carbine MK II</option>

</select>

</div>

<div class="form-group">

<label>Кількість гравців</label>

<select name="Кількість гравців">

<option>3x3</option>
<option>4x4</option>
<option>5x5</option>
<option>6x6</option>
<option>7x7</option>
<option>8x8</option>
<option>9x9</option>
<option>10x10</option>
<option>11x11</option>
<option>12x12</option>
<option>13x13</option>
<option>14x14</option>
<option>15x15</option>
<option>16x16</option>
<option>17x17</option>
<option>18x18</option>
<option>19x19</option>
<option>20x20</option>

</select>

</div>

<div class="form-group">

<label>Дата та час</label>

<input
required
type="datetime-local"
name="Дата та час">

</div>

</div>

<div class="modal-actions">

<button
type="button"
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

}

/* =========================
OTHER CATEGORIES
========================= */

else{

form = `

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

<label>Союзник</label>

<select name="Союзник">

<option>Відсутній</option>

${factions.map(f =>
`<option>${f}</option>`
).join('')}

</select>

</div>

<div class="form-group">

<label>Дата та час</label>

<input
required
type="datetime-local"
name="Дата та час">

</div>

<div class="form-group">

<label>Відповідальний</label>

<input required name="Відповідальний">

</div>

</div>

<div class="modal-actions">

<button
type="button"
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

}

body.innerHTML = form;

modal.style.display = 'flex';

document
.getElementById('mainForm')
.addEventListener('submit', createRequest);

}

/* =========================
CLOSE
========================= */

function closeModal(){

document.getElementById('modal')
.style.display = 'none';

}

/* =========================
CREATE REQUEST
========================= */

async function createRequest(e){

e.preventDefault();

const formData = new FormData(e.target);

const values =
Object.fromEntries(formData.entries());

const item = {

id: Date.now(),

title: getRequestTitle(values),

date: new Date().toLocaleString('uk-UA'),

data: values

};

requests[currentCategory].unshift(item);

renderRequests();

closeModal();

showToast('Заявка створена');

try{

await db
.collection(currentCategory)
.add(item);

}catch(err){

console.error(err);

showToast('Помилка Firebase');

}

}

/* =========================
TITLE
========================= */

function getRequestTitle(data){

if(currentCategory === 'capt'){
return `${data["Нікнейм"]} • Capture`;
}

if(currentCategory === 'fz'){
return `ФЗ • ${data["Фракція"]}`;
}

if(currentCategory === 'postavka'){
return `Поставка • ${data["Фракція"]}`;
}

return `Саботаж • ${data["Фракція"]}`;

}

/* =========================
OUTSIDE CLOSE
========================= */

window.addEventListener('click', e => {

if(e.target.id === 'modal'){
closeModal();
}

});
