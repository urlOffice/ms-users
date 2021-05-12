import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  // organization: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Organization'
  // }
})

module.exports = mongoose.model("User", userSchema, "users")