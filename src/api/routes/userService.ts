import User from '../../user/User';
import { query, Request, Response } from 'express';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const user = new User()
    const allUsers = await user.getAllUsers();
    res.status(200).send({ data: allUsers })
  } catch (err) {
    console.log('error in getAllUsers function', err)
  }
}

const getUser = async (req: Request, res: Response) => {
  const queryKeys = Object.keys(req.query);
  try {
    for (let i = 0; i <= queryKeys.length; i++) {
      switch (queryKeys[i]) {
        case 'email':
          return await getUserByEmail(req, res);
        case 'name':
          return await getUserByName(req, res);
        case 'organization':
          return await getUserByEmailAndOrganization(req, res);
        case 'password':
          return await getUserByEmailAndPass(req, res);
        default:
          return await getAllUsers(req, res);
      }
    }
  } catch (err) {
    console.log('error in getUser', err);
  }
}
const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.query
  const user = await new User().getUserByEmail(email);
  res.status(200).send({ data: user })
}

const getUserByName = async (req: Request, res: Response) => {
  const { name } = req.query
  const user = await new User().getUserByName(name);
  res.status(200).send({ data: user })
}

const getUserByEmailAndPass = async (req: Request, res: Response) => {
  const { email, password } = req.query
  const user = await new User().getUserByEmailAndPass(email, password);
  res.status(200).send({ data: user })
}

const getUserByEmailAndOrganization = async (req: Request, res: Response) => {
  const { email, organization } = req.query
  const user = await new User().getUserByEmailAndOrganization(email, organization);
  res.status(200).send({ data: user })
}

const updateUser = async (req: Request, res: Response) => {
  const userUpdatedObj = req.body;
  const { id } = req.params
  const user = await new User().updateUser(id);
  Object.keys(userUpdatedObj).map(userKey => {
    if (userKey !== "id") {
      user[userKey] = userUpdatedObj[userKey]
    }
  })
  await user.save();
  return res.status(200).send({ data: user })
}

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await new User().deleteUser(id);

  return res.status(200).send({ data: deletedUser })
}

const createUser = async (req: Request, res: Response) => {
  const newUser = await new User().createUser(req.body);
  console.log("im running user", User);
  return res.status(201).send({ data: newUser })
}
module.exports = {
  getUser,
  updateUser,
  deleteUser,
  createUser,
}