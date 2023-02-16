import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const errors: string[] = [];
    const { email, password } = req.body;

    const validatorSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isLength(password, { min: 1 }),
        errorMessage: "Password is not valid",
      },
    ];

    validatorSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userWithEmail) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userWithEmail.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ errorMessage: "Invalid credentials" });
    }

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      email: userWithEmail.email,
    })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    return res.status(200).json({ token: token });
  }

  res.status(404).json({ errorMessage: "Undefined endpoint" });
};

export default handler;
