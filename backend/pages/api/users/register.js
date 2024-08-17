app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if password length is less than 8 characters
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const newUser = new User({ username, password }); // No hashing as requested
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
