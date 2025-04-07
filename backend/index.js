const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const app = express();
const prisma = global.prisma || new PrismaClient(); // reuse across invocations
global.prisma = prisma;

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

app.post("/auth", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Missing fields" });

  let user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  } else {
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

app.get("/profile", authenticate, async (req, res) => {
  res.json({ name: req.user.name, email: req.user.email });
});

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

app.get("/history", authenticate, async (req, res) => {
  const history = await prisma.history.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" }
  });
  res.json(history);
});

module.exports = app; // 🔥 DON'T USE app.listen()
