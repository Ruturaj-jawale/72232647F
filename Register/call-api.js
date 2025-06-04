const axios = require("axios");
const fs = require("fs");

const tokenPath = "./token.json";

const callApi = async () => {
  if (!fs.existsSync(tokenPath)) {
    console.error("❌ No token found. Run `node get-token.js` first.");
    return;
  }

  const tokenData = JSON.parse(fs.readFileSync(tokenPath));
  const accessToken = tokenData.access_token;

  try {
    const response = await axios.get("http://20.244.56.144/some-protected-endpoint", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log("✅ Protected API Response:");
    console.log(response.data);
  } catch (error) {
    console.error("❌ API Request Failed:");
    console.error(error.response ? error.response.data : error.message);
  }
};

callApi();
