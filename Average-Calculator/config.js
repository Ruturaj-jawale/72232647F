require('dotenv').config();

module.exports = {
  email: process.env.EMAIL,
  name: process.env.NAME,
  mobile: process.env.MOBILE,
  github: process.env.GITHUB,
  rollNo: process.env.ROLLNO,
  college: process.env.COLLEGE,
  accessCode: process.env.ACCESS_CODE,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
};
