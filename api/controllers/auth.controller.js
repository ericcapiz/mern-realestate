import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    console.log(newUser);
    res.status(201).json({ message: "User created!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials!" });

    const token = jwt.sign({
      id: user.id,
    });

    const age = 1000 * 60 * 60 * 24 * 7;

    res
      .cookie("test3", "vaue4", {
        httpOnly: true,
        // secure:true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "login success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed logging in!" });
  }
};

export const logout = (req, res) => {};
