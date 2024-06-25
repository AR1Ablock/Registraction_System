const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
var Duplication = false;

function IsTokenAvailable(req, res) {
  if (req.headers.authorization == null) {
    console.log("No logged-in User Found");
    return false;
  }
  else {
    return true;
  }
}

function gettingToken(req) {
  return jwt.decode(req.headers.authorization);
}

const register = async (req, res) => {
  const { username, password, S_Role } = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, 8);
    // duplicate account.
    const records = await User.getAll();
    records.forEach(element => {
      if (element.username == username) {
        console.log('Account Already Exist');
        Duplication = true;
      }
    });
    ///// dont allow duplicate accounts.
    if (Duplication) {
      Duplication = false;
      return res.status(400).send({ message: 'Account Already Exist' });
    }
    console.log(`Registering user: ${username}`);
    await User.create({ username, password: hashedPassword, S_Role });
    console.log(`User registered successfully: ${username}`);
    res.status(201).send({ message: 'User registered successfully' });
  } catch (err) {
    console.log(`Error registering user: ${username}`, err.message);
  }
};


const booking = async (req, res) => {
  if (!IsTokenAvailable(req, res)) {
    return res.status(404).send({ message: 'No Logged-in User Found, Booking Failed' });
  }
  const { SourceCity, TargetCity } = req.body;
  try {
    const users = await User.getAll();
    for (let element of users) { // checking for current logged in user available in user database.
      if (element.id === gettingToken(req).id) {
        await User.booking({ Id: element.id, username: element.username, Source: SourceCity, Target: TargetCity });
        console.log(`Booking user: ${element.username}`);
        console.log(`Booking registered successfully: ${element.username}`);
        return res.status(200).send({ message: 'Booking registered successfully' }); // Return after sending response
      }
    }
    console.log("Booking Failed, User Not Logged-in or User Not in Database");
    return res.status(400).send({ message: 'Booking Failed, User Not Logged or User Not in Database' });
  } catch (err) {
    console.log(`Error registering user:`, err.message);
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log(`Logging in user: ${username}`);
    const user = await User.findByUsername(username);
    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      console.log(`Invalid password for user: ${username}`);
      return res.status(401).send({ identtity: false, token: null, message: 'Invalid Credentials'});
    }
    const token = jwt.sign({ id: user.id, role: user.S_Role }, 'secret', { expiresIn: 86400 });
    console.log(`User logged in, token: ${token}`);
    res.status(200).send({ auth: true, token });
  } catch (err) {
    console.log(`Error logging in user: ${username}`, err.message);
  }
};

const getUsers = async (req, res) => {
  try {
    console.log('Getting user info for dashboard');
    if (!IsTokenAvailable(req, res)) {
      return res.status(404).send({ message: 'User Not Logged-in' });
    }
    const booking = await User.getbookings();
    const users = await User.getAll();
    for (const chkid of users) {
      if (chkid.id === gettingToken(req).id) {
        if (gettingToken(req).role === 'admin' && chkid.S_Role === 'admin' && gettingToken(req).role == chkid.S_Role) {
          return res.status(200).send(booking); // Send response and exit function
        }
        else {
          let packing = []; // we again pack this to array due to v-for work on array not on objects.
          for (const iterator of booking) {
            if (iterator.id == chkid.id)
              packing.push(iterator);
          }
          return res.status(200).send(packing); // Send response and exit function
        }
      }
      else {
        console.log("User " + chkid.username + " Not In DataBase");
      }
    }
    // If no matching user is found after looping through all users
    return res.status(404).send({ message: 'User Booking not found in database' });
  } catch (err) {
    console.log('Error getting user info:', err.message);
  }
};

module.exports = { register, login, getUsers, booking };
