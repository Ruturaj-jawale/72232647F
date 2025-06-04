const axios = require("axios");
const fs = require("fs");
const config = require("./config");

const getToken = async () => {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/auth", {
      email: config.email,
      name: config.name,
      rollNo: config.rollNo,
      accessCode: config.accessCode,
      clientID: config.clientID,
      clientSecret: config.clientSecret
    });

    fs.writeFileSync("token.json", JSON.stringify(response.data, null, 2));
    console.log("✅ Token obtained and saved to token.json");
  } catch (error) {
    console.error("❌ Token Request Failed:");
    console.error(error.response ? error.response.data : error.message);
  }
};

getToken();
