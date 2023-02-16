import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    const { firstName, lastName, email, phone, city, password } = body;
    const errors: string[] = [];

    const validatorSchema = [
      {
        valid: validator.isLength(firstName, { min: 3, max: 20 }),
        errorMessage: "First name must be between 3 and 20 characters",
      },
      {
        valid: validator.isLength(lastName, { min: 3, max: 20 }),
        errorMessage: "Last name must be between 3 and 20 characters",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is not valid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is not valid",
      },
      {
        valid: validator.isLength(city, { min: 1 }),
        errorMessage: "City is required",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage:
          "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
      },
    ];
    validatorSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(422).json({ errorMessage: errors[0] });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with an existing account" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashedPassword,
        email,
        phone,
        city,
      },
    });

    res.status(200).json({ message: user });
  }
};

export default handler;
