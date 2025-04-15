const express = require('express');
const path = require('path');
const { DateTime } = require("luxon");

//const fetch = require('node-fetch'); // Import node-fetch for server-side fetch

const app = express();
const PORT = 3000;

app.use(express.json());
// Serve everything from public/
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/photos', express.static(path.join(__dirname, '..', 'photos')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "home.html"));
  console.log("Entered the website")
})

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "about.html"));
  console.log("Entered about.html")
})

//redirects timezoness to it's html file supposedely
app.get("/timezones", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "timezones.html"));
});


app.post("/api/timezones", (req, res) => {
  const { from, to, timezone } = req.body;

  console.log("Received timezone from client:", timezone);
  console.log("From Zone:", from);
  console.log("To Zone:", to);
  console.log(" ");

  // Create Luxon datetime objects (properly!)
  const fromTime = DateTime.now().setZone(from);
  const toTime = fromTime.setZone(to);

  // Log pretty times
  console.log(`Time in ${from}:`, fromTime.toFormat("HH:mm"));
  console.log(`Time in ${to}:`, toTime.toFormat("HH:mm"));

  // Respond back to frontend
  res.json({
    message: "Timezone conversion successful!",
    from: fromTime.toFormat("HH:mm"),
    to: toTime.toFormat("HH:mm"),
    timezone: timezone
  });

  console.log(`[${new Date().toISOString()}] Timezone received: ${timezone}`);
});

app.listen(PORT, () => {
  console.log(`✨ SamePages server running at http://localhost:${PORT}`);
});