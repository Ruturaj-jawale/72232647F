const axios = require("axios");
const config = require("./config");

const register = async () => {
  try {
    const response = await axios.post("http://20.244.56.144/evaluation-service/register", {
      email: config.email,
      name: config.name,
      mobileNo: config.mobile,
      githubUsername: config.github,
      rollNo: config.rollNo,
      collegeName: config.college,
      accessCode: config.accessCode
    });

    console.log("✅ Registration Successful!");
    console.log(response.data);
  } catch (error) {
    console.error("❌ Registration Failed:");
    console.error(error.response ? error.response.data : error.message);
  }
};

register();
