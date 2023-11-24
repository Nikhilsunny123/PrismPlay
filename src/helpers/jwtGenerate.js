import jwt from "jsonwebtoken";

export function generateJWT(data) {
  const secretKey = "test";
  const expiresIn = "2 days";
  const payLoad = data;
  const token = jwt.sign(payLoad, secretKey, { expiresIn });
  return token;
}

export function userAuthentication(req, res, next) {
  const reqToken = req.headers.authorization;
  console.log(reqToken);
  if (!reqToken) {
    return res.status(401).json({ message: "Missing auth" });
  }
  try {
    let token = reqToken.split("")[1];
    console.log(token);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

export function adminAuthentication(req, res, next) {
  const reqToken = req.headers.authorization;
  console.log(reqToken);
  if (!reqToken) {
    return res.status(401).json({ message: "Missing auth" });
  }
  try {
    let token = reqToken.split("")[1];
    console.log(token);
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
