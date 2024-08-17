import jwt from "jsonwebtoken";

// Define your payload
const payload = {
  id: "user_id", // Example user ID
  username: "example_user",
};

// Define your secret key (you should keep this secure and not hardcode it in production)
const secretKey =
  "89c63641fbbeb8ec34ad048e5109f04c536e9820006da0a539395c8bb9d09985";

// Define options (optional)
const options = {
  expiresIn: "1h", // Token expiration time
};

// Generate the token
const token = jwt.sign(payload, secretKey, options);

console.log("Generated JWT Token:", token);
