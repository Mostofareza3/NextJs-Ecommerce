import jwt from "jsonwebtoken";

export const getActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};
