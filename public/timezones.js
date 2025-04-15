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

//This works fine too
const wantsToChange = window.confirm(`We detected that you are in ${timezone}. want to change it?`);

if (wantsToChange) {
  const newZone = window.prompt("Enter you're city/timezone like:(Europe/Paris):  ", timezone);
  if (newZone) {
    userZone = newZone;
    // Save Zone with cookies
    document.cookie = `timezone=${encodeURIComponent(userZone)}; path=/; max-age=30;` //30 days
  }
}
  

// ---------------------- This works perfectly ----------------------------------
document.getElementById("searchBtn").addEventListener("click", function () {
    const fromCity = document.getElementById("fromCity").value.trim();
    const toCity = document.getElementById("toCity").value.trim();
  
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
      from: fromCity,
      to: toCity
    })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("result").innerText =
        `Searching from: ${data.from} ⏱️\nTo: ${data.to} ⏱️`;
    })
    .catch(err => console.error("Error:", err));
});

// The cookies are also saved
function getCookie(name) {
  const cookie = document.cookie.split("; ");
  for (let c of cookie) {
    const [key, val] = c.split("=");
    if (key === name) return decodeURIComponent(val)
  }
  return null
}

const savedZone = getCookie("Timezone") || "UTC"