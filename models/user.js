import mongoose from "mongoose";
import bcrypt from "bcrypt";
const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, lowercase: true, unique: true },
  password: String,
  role: String,
  commission: String,
  warehouse: String,
  business: String,
  filterSoldByMonth: {
    Jan: { type: String },
    Feb: { type: String },
    Mar: { type: String },
  },
  role: String,
  profile: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
});

userSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  bcrypt
    .hash(user.password, SALT_ROUNDS)
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => {
      next(err);
    });
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

const User = mongoose.model("User", userSchema);

export { User };
