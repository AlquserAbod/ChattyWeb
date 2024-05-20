import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId},process.env.JWT_SECRET);

  res.cookie("jwt",token,{
    secure: process.env.NODE_ENV !== "development",
    domain: process.env.domain,
    path: "/" 
  });
}

export default generateTokenAndSetCookie