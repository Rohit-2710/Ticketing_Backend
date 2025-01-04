import mongoose from "mongoose";
import { Password } from "../services/password";

//User Interface to describe the structure of the user object
interface UserInterface {
  email: string;
  password: string;
}

// Interface for User Model
interface UserModelInterface extends mongoose.Model<UserDoc> {
  build(user: UserInterface): UserDoc;
}

// Interface for User Document
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving
UserSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});
UserSchema.statics.build = (user: UserInterface) => {
  return new User(user);
};
const User = mongoose.model<UserDoc, UserModelInterface>("User", UserSchema);

export { User };
