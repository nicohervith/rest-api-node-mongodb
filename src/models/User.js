import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        //Esta relacionado con el modelo rol
        ref: "Role",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//Cifrar contraseña
productSchema.statics.encryptPassword = async (password) => {
  //genSalt aplica el algoritmo para el cifrado
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
//Comparar contraseña
productSchema.statics.comparePassword = async (password, receivedPassword) => {
  //Recibe la contraseña que ya se guardo y la contraseña que el usuario está tipeando
  return await bcrypt.compare(password, receivedPassword);
};

productSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

export default mongoose.model("User", productSchema);
