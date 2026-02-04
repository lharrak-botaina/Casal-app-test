const bcrypt = require('bcrypt');
const { User } = require("../models/user");

async function add(email , password, role) {
    const hashedPassword = await generateHashedPassword(password);

    const user = new User({
        email: email,
        password: hashedPassword,
        role: role
    });

    await user.save();
    return user;
}

async function update(id, password) {
    console.log(password)
    console.log(id)
    const hashedPassword = await generateHashedPassword(password);

    const result = await User.updateOne({ "_id": id },
        {
            $set: {
                password : hashedPassword
            }
        },
        { new: true });

    return result
}

async function remove(id) {
    const result = await User.deleteOne({ "_id": id });

    return result
}

async function isExist(email){
    return User.findOne({email : email?.toLowerCase()})
}

async function generateHashedPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}


module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
module.exports.isExist = isExist;