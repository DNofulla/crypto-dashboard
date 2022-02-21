const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");
const VerificationCode = require("../models/VerificationCode");
const sgMail = require("@sendgrid/mail");
const Wishlist = require("../models/Wishlist");

const twilioClient = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

sgMail.setApiKey(process.env.TWILIO_SENDGRID_API_KEY);

function makeid(length) {
  var result = "";
  var characters = "0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

router.post("/accountVerify/new/", async (req, res) => {
  const email = req.body.email;
  const username = req.body.username;

  const verificationCode = await VerificationCode.create({
    username,
    destinationNumber: `+1${email}`,
    verificationCode: makeid(7),
    expires: new Date(new Date() + 15 * 60000),
  });

  await verificationCode.save();

  twilioClient.messages
    .create({
      body: `Here is your account verification passcode: ${verificationCode.verificationCode}. It expires in 15 minutes!`,
      from: process.env.TWILIO_TRIAL_NUMBER,
      to: `+1${email}`,
    })
    .then((message) => {
      console.log(message.sid);
      res.status(200).json({ msg: "Success! Message Sent" });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(400).json({ message: "Message Failed to Send!" });
    });
  res.status(200).json({ message: "Success! Message Sent!" });
});

router.post("/verify", async (req, res) => {
  const verificationCode = req.body.verificationCode;
  const username = req.body.username;

  await VerificationCode.deleteOne({ verificationCode });

  const user = await User.updateOne({ username }, { verified: true });

  res.status(200).json(user);
});

router.post("/wishlist/email/:wishlistId", async (req, res) => {
  const wishlistId = req.params.wishlistId;
  const email = req.body.email;

  if (!email) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }

  const wishlist = await Wishlist.findOne({
    wishlistId,
  });

  if (wishlist.status === false) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }

  if (!wishlist) {
    return res.status(400).json({ message: "EMOTIONAL DAMAGE" });
  }

  sgMail.send({
    to: email,
    from: "dnofulla@outlook.com",
    subject: "Your cryptocurrency list has arrived!",
    text: `You can find your list on this link here:\n http://localhost:3000/wishlist/${wishlistId}`,
    html: `<div>
                <strong>You can find your list on this link here:</strong>
                <h3>http://localhost:3000/wishlist/${wishlistId}</h3>
           </div>`,
  });
  return res.status(200).json({ message: "Wishlist Email Sent!" });
});

module.exports = router;
