export type userSchema = {
  name: String,
  email: String,
  password: String,
  organization: String
}

export type IUser = {
  name: String,
  email: String,
  password: String,
  organization?: String
}
