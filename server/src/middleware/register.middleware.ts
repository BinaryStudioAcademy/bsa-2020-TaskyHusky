import passport from '../../config/passport.config';

export default passport.authenticate('register', { session: false });
