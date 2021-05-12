const User = require("./user.model");
const ObjectId = require('mongodb').ObjectId;
//types
import { IUser, userSchema } from './user.types';

export default class UserClass {

  constructor() { }
  public getAllUsers = async (): Promise<userSchema> => {
    const users = await User.collection.find();
    return users;
  }

  public getUserByName = async (name: any): Promise<userSchema> => {
    const user = await User.find({ name })
    return user
  }

  public getUserByEmail = async (email: any): Promise<userSchema> => {
    const user = await User.find({ email })
    return user
  }

  public getUserByEmailAndPass = async (email: any, password: any): Promise<userSchema> => {
    const user = await User.find({
      email,
      password
    })
    return user
  }

  public getUserByEmailAndOrganization = async (email: any, org: any): Promise<userSchema> => {
    const user = await User.find({
      email,
      organization: org
    })
    return user
  }

  public deleteUser = async (userId: any): Promise<userSchema> => {
    const deletedUser = await User.delete({
      _id: ObjectId(userId),
    })

    return deletedUser;
  }

  public updateUser = async (userId: any) => {
    const user = await User.find({
      _id: ObjectId(`${userId}`)
    })
    return user

  }

  public createUser = async (userObj: IUser): Promise<any> => {
    const { name, email, password, organization } = userObj
    console.log("user obj", userObj);
    const newUser = new User(
      userObj
    )
    newUser.save();
    return newUser;
  }
}
