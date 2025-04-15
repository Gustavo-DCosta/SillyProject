// clock ticking
function setDate() {
  const now = new Date();

  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90; // 90 is offset
  const secondHand = document.querySelector('.second-hand');
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const minutes = now.getMinutes();
  const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
  const minHand = document.querySelector('.min-hand');
  minHand.style.transform = `rotate(${minutesDegrees}deg)`;

  const hours = now.getHours();
  const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90;
  const hourHand = document.querySelector('.hour-hand');
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

// THIS is the magic line that makes the clock tick every second:
setInterval(setDate, 1000); 
// Optionally: setDate() once immediately so it doesn’t wait 1 sec to show
setDate();

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
let userZone = timezone;

fetch("/api/timezones", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ timezone })
});

console.log("server should receive this...")
console.log("The timezone is: ", userZone);

// This also works

//Ask the User if he wants to keep his auto timezone or change it
const wantsToChange = window.confirm(`We detected that you are in ${timezone}. want to change it?, based on you're answer the timezone will be autofilled`);

if (wantsToChange) {
  const newZone = window.prompt("Enter you're city/timezone like:(Europe/Paris):  ", timezone); //Asks to change
  if (newZone) {
    userZone = newZone; // userZone becomes the new selected Zone

    document.getElementById("from-tz").value = userZone //autofill the input form with selected timezone
  }
}
  

// ---------------------- This works perfectly ----------------------------------
document.getElementById("convert-btn").addEventListener("click", function () {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  let userZone_confirm = timezone;
    const fromCity = document.getElementById("from-tz").value.trim();
    const toCity = document.getElementById("to-tz").value.trim();
  
    if (!fromCity || !toCity) {
      alert("Please enter both cities!");
      return;
    }
  
    fetch("api/timezones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      userZone_confirm: timezone,
      from: fromCity,
      to: toCity
    })
  })
});
