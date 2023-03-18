import User from "models/User";
import nc from "next-connect";
import { validateEmail } from "utils/validation";
import bcrypt from "bcrypt";
import db from "../../../../utils/db";
import { getActivationToken } from "utils/tokens";

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, email, password } = req.body;
    console.log(req.body);
    if (!name || !email || !password) {
      res.status(400).json({ message: "Fill all the information!" });
      return;
    }
    if (!validateEmail(email)) {
      res.status(400).json({ message: "Invalid email!" });
      return;
    }
    const user = await User.findOne({ email });
    if (user) {
      console.log("User already exists!", user);
      res.status(400).json({ message: "User already exists!" });
      return;
    }
    if (password.length < 6) {
      res
        .status(400)
        .json({ message: "Password must be at least 6 characters!" });
      return;
    }

    const cryptedPassword = await bcrypt.hash(password, 10);
    // const newUser = await User.create({
    //   name,
    //   email,
    //   password: cryptedPassword,
    // });
    const newUser = new User({
      name,
      email,
      password: cryptedPassword,
    });
    const createdUser = await newUser.save();

    const activationToken = getActivationToken({
      id: createdUser._id.toString(),
    });

    const url = `${process.env.BASE_URL}/activate/${activationToken}`;

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default handler;
