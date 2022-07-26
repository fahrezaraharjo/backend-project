const {
  login,
  register,
  getAllUsers,
  logOut,
  getUser
} = require("../controllers/userController");

const router = require("express").Router();
router.get('/profile/:id', getUser)
router.post("/login", login);
router.post("/register", register);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logOut);

module.exports = router;
