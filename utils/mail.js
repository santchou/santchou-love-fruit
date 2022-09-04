const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config.js");

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

const accessToken = OAuth2_client.getAccessToken();

module.exports.generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    otp = otp + Math.floor(Math.random() * 9);
  }
  return otp;
};

module.exports.mailTransport = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: config.user,
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      refreshToken: config.refreshToken,
      accessToken: accessToken,
    },
  });

module.exports.generateEmailTemplate = (code) => {
  return `
    <!DOCTYPE html>
<html land="en>
	<head>
		<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge>
		<title>My first three.js app</title>
		<style>
		</style>	
	</head>
	<body>
  <div style="max-width: 620px; margin: 0 auto; text-align: center; display: flex">
  <h1 style="font-size: 20px; padding: 20px; background: #eeeeee; color: #000000; text-align: center">Your code to finilize your account creation </h1>
  <p style="padding: 10px; background: green; color: white; width: 100px; text-align: center">${code}</p>
  </div>
	</body>
</html>
    `;
};

module.exports.generatePasswordResetTemplate = (url) => {
  return `
    <!DOCTYPE html>
    <html land="en">
	     <head>
		      <meta charset="utf-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge>
		      <title>My first three.js app</title>
		      <style>
             @media (max-width: 620px) {
              h1{
                font-size: 20px;
                padding: 5px;
              }
             }
		      </style>	
	     </head>
	     <body>
          
          <div style="max-width: 620px; margin: 0 auto;" color: #272727;>
             <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;"> 
               Response to your reset password request
             </h1>
             <p>Please link below to reset password</p>
             <div style="text-align: center;">
                <a href="${url}" style="margin: 0 auto; padding: 20px; text-align: center; background: #e63946; border-radius: 5px; font-size: 20px 10px; color: #ffffff; cursor: pointer; text-decoration: none; display: inline-block; font-weight: bold">Reset Password</a>
             </div>
          </div>
          
	     </body>
    </html>
    `;
};
