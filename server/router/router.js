const express = require('express')
const router = express.Router()
const User = require('../model/Signup')
const jweb = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = 'iwfhugafwofjwhig3hwigk3wnig3uwmgkmewoipj39gw8hqoijhi3hgwgkwni'

const authMiddleware = require('../auth/authMiddleware')







router.get('/getuser', authMiddleware, async (req, res) => {
  try {

    const data = await User.find({});
    return res.status(200).json({ data });

  } catch (error) {
    console.log('error: ', error);
    return res.status(500).json({ msg: 'Server error' });
  }
});



// ##############################   user login ##########################

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: 'Fill All Fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const Userdata = new User({
      email,
      password: hashedPassword
    });



    await Userdata.save();
    const token = jweb.sign({ email }, secret, { expiresIn: '3d' });
    res.status(201).json({ token, msg: 'Account Created Successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body
    let data = await User.findOne({ email: email })
    if (!data) {
      console.log('data: ', data);
      return res.status(400).json({ msg: 'No User Found' })
    }
    ismatch = await bcrypt.compare(password, data.password)

    if (ismatch) {
      const token = jweb.sign({ email: email, user_id: data.user_id }, secret, { expiresIn: '3d' })
      return res.status(200).json({ token })
    } else {
      return res.status(400).json({ msg: 'Incorrect Details' })
    }

  } catch (error) {
    console.log(error)
  }
})



router.put('/updateuser/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { email, password } = req.body;

  try {
      const updates = { email };
      if (password) {
          updates.password = await bcrypt.hash(password, 12);
      }
      
      const user = await User.findByIdAndUpdate(user_id, updates, { new: true });
      
      if (!user) {
          return res.status(404).json({ msg: 'User not found' });
      }
      
      res.status(200).json({ msg: 'User updated successfully', user });
  } catch (error) {
      res.status(500).json({ msg: 'Error updating user', error });
  }
});

router.delete('/deleteuser/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const user = await User.findByIdAndDelete(user_id);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting user', error });
  }
});


module.exports = router


