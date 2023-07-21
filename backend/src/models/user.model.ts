import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  picture: string;
  status: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide tour email address"],
      unique: true,
      lowercase: true,
      validate: validator.isEmail,
    },
    picture: {
      type: String,
      default: "https://webrtc-mern.vercel.app/person.png",
      validate: validator.isURL,
    },
    status: {
      type: String,
      default: "Hey there ! I am using whatsapp",
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 64,
    },
  },
  {
    collection: "users",
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const hashedPassword = await bcrypt.hash(this.password, 8);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error as any);
  }
});

const UserModel = mongoose.model("UserModel", userSchema);

export { IUser, UserModel };
