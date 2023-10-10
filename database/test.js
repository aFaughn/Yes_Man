const {User} = require('./models/user.js')

async function yourMom() {
    const user = await User.findAll({
        where: {
            username: 'cake'
        }
    });
    console.log(User)
}

yourMom();