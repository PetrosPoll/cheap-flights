const User = require("../model/User");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { username, pwd } = req.body;

  // empty fields
  if (!username || !pwd)
    return res.json({
      message: "Username and password must be provided",
      status: "401",
    });

  try {

    const resultUser = await User.findOne({ username: username });

    // validate user's credentials
    if (resultUser) {
      const cmp = await bcrypt.compare(pwd, resultUser.password);
      if (cmp) {

        return res.json({
          message: "Login successful",
          status: "200",
          resultUser,
        });
      } else {
        return res.json({
          message: "Uername or password is wrong. Try again.",
          status: "401",
        });
      }

    } else {
      return res.json({
        message: "Uername or password is wrong. Try again.",
        status: "401",
      });
    }

  } catch (err) {
    res.json({ message: err.message, status: "500" });
  }

};

module.exports = { handleLogin };
