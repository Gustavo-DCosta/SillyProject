const express = require('express');
const path = require('path');
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

  console.log("From:", from);
  console.log("To:", to);
  console.log(" ");
  console.log("Received timezone from client:", timezone);

  res.json({
    message: "Received!",
    from,
    to,
    timezone
  });

  console.log(`[${new Date().toISOString()}] Timezone received: ${timezone}`);
});

app.listen(PORT, () => {
  console.log(`✨ SamePages server running at http://localhost:${PORT}`);
});