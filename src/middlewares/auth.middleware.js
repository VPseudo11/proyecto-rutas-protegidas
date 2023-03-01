const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const {api} = require('../../config')
const {findUserById} = require('../users/users.controllers')

module.exports = (passport)=>{
    const options= {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: api.jwtSecret,
    }
    passport.use(
        new JwtStrategy(options, async (decoded, done)=>{
            try {
                const response = await findUserById(decoded.id)
                if (!response) {
                    return done(null, false)
                }
                return done(null, decoded)
            } catch (err) {
                return done(err, false)
            }
        })
    )
}