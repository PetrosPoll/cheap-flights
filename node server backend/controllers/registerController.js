const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleUser = async (req, res) => {
    console.log(req.body);
    const { user, pwd, email, country} = req.body;
    
    if(!user || !pwd || !email) 
        return res.status(400).json({ 'message': 'Username, password and email are required' });

    // Check for duplicates
    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate)
        return res.sendStatus(409); // conflict error

    try {
        // Encrypt the password
        const cryptedPassword = await bcrypt.hash(pwd, 10);

        // data of the new user
        const result = User.create({
            'username': user,
            'email': email,
            'password': cryptedPassword,
            'country': country
        });

        // View the result in console
        console.log(result);

        res.status(201).json({ 'success': `New user ${user} created! Congratulations!` })
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

}

module.exports = { handleUser };