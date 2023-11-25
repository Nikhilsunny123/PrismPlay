import jwt from "jsonwebtoken";
const secretKey = "test";
export function generateJWT(data) {
  const expiresIn = "2 days";
  const payLoad = data;
  const token = jwt.sign(payLoad, secretKey, { expiresIn });
  return token;
}

export function userAuthentication(req, res, next) {
  const reqToken = req.headers.authorization;

  if (!reqToken) {
    return res.status(401).json({ message: "Missing auth" });
  }
  try {
    let token = reqToken.split(" ")[1];
    const decoded = jwt.verify(token, secretKey); // Replace with your own secret key
    req.user = decoded;
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
    let token = reqToken.split(" ")[1];
    const decoded = jwt.verify(token, secretKey); // Replace with your own secret key
    // if decoded role is not admin throw error
    if (decoded.role !== "admin") {
      throw new Error("Invalid token");
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}
