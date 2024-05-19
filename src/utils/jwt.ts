import jwt from "jsonwebtoken";

const generateJWT = async (id: number) => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED!,
      { expiresIn: process.env.JWT_EXPIRE_IN },
      (err, token) => {
        if (err) {
          console.log("Error when trying to generate token " + err);
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

export default generateJWT;