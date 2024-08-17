import jwt from "jsonwebtoken";
import User from "./models/User"; // Adjust the import path as necessary

const JWT_SECRET = "your_jwt_secret"; // Use a secure key

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Check if password length is less than 8 characters
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
