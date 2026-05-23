function getRemainingMs(dateTime){

if(!dateTime) return -1;

const target = new Date(dateTime);

const now = new Date();

const kyivNow = new Date(
now.toLocaleString("en-US",{timeZone:"Europe/Kiev"})
);

return target - kyivNow;

}

function getTimerHTML(dateTime){

if(!dateTime){
return `<span>-</span>`;
}

const target = new Date(dateTime);

const now = new Date();

const kyivNow = new Date(
now.toLocaleString("en-US",{timeZone:"Europe/Kiev"})
);

const diff = target - kyivNow;

if(diff <= 0){

return `
<div>
${target.toLocaleString('uk-UA')}
<br>
<span class="timer-red">
Завершено
</span>
</div>
`;

}

const mins = Math.floor(diff / 60000);

const hrs = Math.floor(mins / 60);

const days = Math.floor(hrs / 24);

const leftHours = hrs % 24;
const leftMin = mins % 60;

let cls = 'timer-blue';

if(mins <= 15){
cls = 'timer-red';
}else if(mins <= 60){
cls = 'timer-yellow';
}

return `
<div>
${target.toLocaleString('uk-UA')}
<br>
<span class="${cls}">
через ${days}д ${leftHours}г ${leftMin}хв
</span>
</div>
`;

}
