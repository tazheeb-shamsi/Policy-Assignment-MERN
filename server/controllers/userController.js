import User from "../Schema/userSchema.js";
import bcrypt from "bcrypt";



export const userLogIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(401).json("Invalid Login");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return response.status(401).json("Invalid Login");
    }

    return response.status(200).json(`${email} login successful`);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};


export const userSignUp = async (request, response) => {
  try {
    const exist = await User.findOne({ email: request.body.email });
    if (exist) {
      return response.status(401).json({ message: "User already exists" });
    }
    const user = request.body;

    // Hash the user's password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;

    const newUser = new User(user);
    await newUser.save();
    response.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
