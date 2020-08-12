import passport from '../../config/passport.config';

export default passport.authenticate('check_email', { session: false });
