import mongoose from "mongoose";
import { userSignUp, userLogIn } from "../controllers/userController.js";
import User from "../Schema/userSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Mocking the request and response objects for testing
const mockRequest = (body) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Connect to a test MongoDB database before running the tests
beforeAll(async () => {
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@policyassignment.7ncqyhz.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

// Disconnect from the test database after running the tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("userSignUp", () => {
  it("should create a new user when provided valid data", async () => {
    const request = mockRequest({
      fullname: "John Doe",
      email: "john@example.com",
      password: "securepassword",
      phone: "1234567890",
    });
    const response = mockResponse();

    // Ensure the user with the same email does not exist
    await User.deleteMany({ email: request.body.email });

    await userSignUp(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: "User registered successfully",
    });
  });

  it("should return a 401 status when a user with the same email already exists", async () => {
    const request = mockRequest({
      email: "john@example.com",
    });
    const response = mockResponse();

    await userSignUp(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith({
      message: "User already exists",
    });
  });
});

describe("userLogIn", () => {
  // Mock User.findOne and bcrypt.compare functions
  jest.spyOn(User, "findOne");
  jest.spyOn(bcrypt, "compare");

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Login with valid credentials", async () => {
    const hashedPassword = await bcrypt.hash("securepassword", 10);
    const user = new User({
      email: "john@example.com",
      password: hashedPassword,
    });

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);

    const request = mockRequest({
      email: "john@example.com",
      password: "securepassword",
    });
    const response = mockResponse();

    await userLogIn(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(
      "john@example.com login successful"
    );
  });

  it("Invalid login credentials: either of email or password is incorrect", async () => {
    const hashedPassword = await bcrypt.hash("securepassword", 10);
    const user = new User({
      email: "john@example.com",
      password: hashedPassword,
    });

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(false);

    // Incorrect password
    const request1 = mockRequest({
      email: "john@example.com",
      password: "invalidpassword",
    });
    const response1 = mockResponse();

    await userLogIn(request1, response1);

    expect(response1.status).toHaveBeenCalledWith(401);
    expect(response1.json).toHaveBeenCalledWith("Invalid Login");

    // Incorrect/Non-existing email
    const request2 = mockRequest({
      email: "nonexistent@example.com",
      password: "securepassword",
    });
    const response2 = mockResponse();

    await userLogIn(request2, response2);

    expect(response2.status).toHaveBeenCalledWith(401);
    expect(response2.json).toHaveBeenCalledWith("Invalid Login");
  });

  it("should return a 401 status for non-existent email", async () => {
    User.findOne.mockResolvedValue(null);

    const request = mockRequest({
      email: "nonexistent@example.com",
      password: "password123",
    });
    const response = mockResponse();

    await userLogIn(request, response);

    expect(response.status).toHaveBeenCalledWith(401);
    expect(response.json).toHaveBeenCalledWith("Invalid Login");
  });
});
