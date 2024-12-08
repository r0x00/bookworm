const User = require("../methods/User");
const Passport = require("../methods/Passport");
const Showcase = require("../methods/Showcase");

class DefaultService {
    static async admin () {
        const admin = require('./admin');

        try {
            const check = await User.findOne({ where: { username: admin.username }});

            if(check) return;

            const user = await User.create({
                username: admin.username,
                email: admin.email, 
                permission: admin.permission
            });

            await Passport.create({
                user: user,
                password: admin.password,
            });

        } catch(_error) {
            console.log("Error when creating admin user");

            User.destroy({ where: { username: admin.username }});
        };
    };

    static async showcase() {
        try {
            const check = await Showcase.findOne({ where: { wallpaper: "/images/wallpaper/welcome.png" }});

            if(check) return;

            await Showcase.create({
                wallpaper: "/images/wallpaper/welcome.png",
            });

        } catch(_error) {
            console.log("Error when creating admin user");

            User.destroy({ where: { username: admin.username }});
        };

    };
};

module.exports = DefaultService