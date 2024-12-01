class EnviromentServices {
    static async version (req, res, next) {
        const version = process.env.npm_package_version;

        let gitshort = '';

        try {
            gitshort = require('child_process')
            .execSync('git rev-parse HEAD')
            .toString().trim()

        } catch(_error) {};

        gitshort = gitshort.slice(0, 7);

        const result = {
            version, gitshort
        }
        
        res.status(200).send(result);

    };
}

module.exports = EnviromentServices;