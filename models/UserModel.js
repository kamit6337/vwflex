import { Schema, models, model } from "mongoose";
import validation from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return validation.isEmail(value);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      default: null,
      select: false,
    },
    image: {
      type: String,
      default: null,
    },
    OAuthId: {
      type: String,
      default: null,
      select: false,
    },
    OAuthProvider: {
      type: String,
      default: null,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = models?.User || model("User", userSchema);

export default User;
