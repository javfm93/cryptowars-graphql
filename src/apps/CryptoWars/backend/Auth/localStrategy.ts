import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserRepository } from '../../../../Contexts/IAM/Users/Domain/UserRepository';
import container from '../dependency-injection';
import { UserEmail } from '../../../../Contexts/IAM/Users/Domain/UserEmail';
import bcrypt from 'bcrypt';
import { UserPrimitives } from '../../../../Contexts/IAM/Users/Domain/User';

passport.serializeUser(function (user: any, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser<UserPrimitives>(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy.Strategy(async function verify(email, password, cb) {
    try {
      const repository: UserRepository = container.get('CryptoWars.Users.UserRepository');
      const user = await repository.findByEmail(UserEmail.fromPrimitives(email));
      if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const passwordMatches = await bcrypt.compare(password, hash);
      if (!passwordMatches) return cb(null, false, { message: 'Incorrect username or password.' });

      return cb(null, user.toPrimitives());
    } catch (err) {
      if (err) {
        return cb(err);
      }
    }
  })
);

export const localAuthentication = passport.authenticate('local', { failureMessage: true });
