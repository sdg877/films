import jwt from "jsonwebtoken";

export default function checkToken(req, res, next) {
  let token = req.get("Authorization") || req.query.token;

  if (token) {
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .json({ error: "Token is not valid or has expired." });
      }

      req.user = decoded.user;
      req.exp = new Date(decoded.exp * 1000);

      next();
    });
  } else {
    return res.status(401).json({ error: "No token provided." });
  }
}
