// server/index.js
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Login/Register Combined
app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  let user = await prisma.user.findUnique({ where: { email } });

  if (user) {
    // Login flow
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  } else {
    // Register flow
    const hashed = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name: email.split("@")[0]
      }
    });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, name: user.name });
});

// Middleware to get user from token
const authenticate = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(auth.split(" ")[1], JWT_SECRET);
    req.user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

// Protected Profile Route
app.get("/profile", authenticate, async (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
});

// Save content history
app.post("/history", authenticate, async (req, res) => {
  const { prompt, language, data } = req.body;
  await prisma.history.create({
    data: {
      prompt,
      language,
      data,
      userId: req.user.id
    }
  });
  res.json({ success: true });
});

// Get user history
app.get("/history", authenticate, async (req, res) => {
   const history = await prisma.history.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" }
  });
  res.json(history);
});

// app.listen(5000, () => console.log("✅ Server on http://localhost:5000"));

export default app;