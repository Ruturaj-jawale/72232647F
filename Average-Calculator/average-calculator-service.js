const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const port = 9876;
const WINDOW_SIZE = 10;

let windowBuffer = [];

const apiMap = {
  p: "primes",
  f: "fibo",
  e: "even",
  r: "rand"
};

const getTokenFromFile = () => {
  const tokenData = JSON.parse(fs.readFileSync("token.json", "utf-8"));
  return tokenData.access_token;
};

app.get("/numbers/:numberid", async (req, res) => {
  const id = req.params.numberid;
  const endpoint = apiMap[id];

  if (!endpoint) return res.status(400).json({ error: "Invalid numberid" });

  const token = getTokenFromFile();

  try {
    const url = `http://20.244.56.144/evaluation-service/${endpoint}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 500
    });

    const newNumbers = response.data.numbers;
    const prevState = [...windowBuffer];

    newNumbers.forEach(num => {
      if (!windowBuffer.includes(num)) {
        windowBuffer.push(num);
        if (windowBuffer.length > WINDOW_SIZE) windowBuffer.shift();
      }
    });

    const avg = (
      windowBuffer.reduce((sum, val) => sum + val, 0) / windowBuffer.length
    ).toFixed(2);

    res.json({
      windowPrevState: prevState,
      windowCurrState: windowBuffer,
      numbers: newNumbers,
      avg: parseFloat(avg)
    });

  } catch (error) {
    console.error("❌ Error fetching numbers:", error.message);
    res.status(500).json({ error: "Failed to fetch or process numbers" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
