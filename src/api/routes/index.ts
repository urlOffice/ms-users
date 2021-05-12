const express = require('express')
const routes = express.Router();

//services 
const { getUser, updateUser, deleteUser, createUser } = require('./userService')
routes.route("/")
  .get(getUser)
  .post(createUser)
routes.route("/:id")
  .put(updateUser)
  .delete(deleteUser)
export default routes;