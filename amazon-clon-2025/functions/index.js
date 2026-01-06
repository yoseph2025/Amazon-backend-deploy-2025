const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Success!" });
});

app.post("/payments/create", async (req, res) => {
  try {
    const total = Number(req.query.total);

    if (!Number.isInteger(total) || total <= 0) {
      return res.status(400).json({ message: "Invalid total" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ message: "Payment failed" });
  }
});

// exports.api = onRequest({ region: "us-central1" }, app);

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon server running on port :5000, http://localhost:5000");
});
