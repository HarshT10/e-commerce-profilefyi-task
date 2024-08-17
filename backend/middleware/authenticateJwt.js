import jwt from "jsonwebtoken";

const JWT_SECRET =
  "89c63641fbbeb8ec34ad048e5109f04c536e9820006da0a539395c8bb9d09985"; // Replace with your JWT secret

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Get the token from the Authorization header

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }

      req.user = user; // Attach the user object to the request
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

export default authenticateJwt;
