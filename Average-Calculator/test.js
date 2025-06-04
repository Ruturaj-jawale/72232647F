const axios = require("axios");

// Test targets
const endpoints = {
  Even: "e",
  Prime: "p",
  Fibo: "f",
  Random: "r"
};

// Delay helper (milliseconds)
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runTest(name, id) {
  try {
    const url = `http://localhost:9876/numbers/${id}`;
    const response = await axios.get(url);

    console.log(`\n✅ ${name} Test (${url})`);
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(`\n❌ Error during ${name} Test (${id}):`);

    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error("Response:", error.response.data);
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timed out");
    } else {
      console.error("Error:", error.message);
    }
  }
}

async function runAllTests() {
  for (const [name, id] of Object.entries(endpoints)) {
    await runTest(name, id);
    await delay(1000); // wait 1 second between requests
  }
}

runAllTests();
