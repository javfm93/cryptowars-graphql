import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserRepository } from '../../../../Contexts/IAM/Users/Domain/UserRepository';
import { UserEmail } from '../../../../Contexts/IAM/Users/Domain/UserEmail';
import { PlayerRepository } from '../../../../Contexts/CryptoWars/Players/Domain/PlayerRepository';
import { randomBytes, scryptSync } from 'crypto';
import { DependencyInjector } from '../dependency-injection/dependencyInjector';

const encryptPassword = (password: string, salt: string) => {
  return scryptSync(password, salt, 32).toString('hex');
};

export const hashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex');
  return encryptPassword(password, salt) + salt;
};

export const matchPassword = (password: string, hash: string): boolean => {
  const salt = hash.slice(64);
  const originalPassHash = hash.slice(0, 64);
  const currentPassHash = encryptPassword(password, salt);
  return originalPassHash === currentPassHash;
};

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, playerId: user.playerId });
  });
});

passport.deserializeUser(function (user: Express.User, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy.Strategy(async function verify(email, password, cb) {
    try {
      const userRepository = DependencyInjector.get(UserRepository);
      const user = await userRepository.findByEmail(UserEmail.fromPrimitives(email));
      if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
      console.log('USER FOUND');
      const hash = hashPassword(password);
      const passwordMatches = matchPassword(password, hash);
      if (!passwordMatches) return cb(null, false, { message: 'Incorrect username or password.' });

      const playerRepository = DependencyInjector.get(PlayerRepository);
      const player = await playerRepository.findByUserId(user.id, { retrieveRelations: false });
      if (!player) return cb(null, false, { message: 'Not registered as a player' });

      return cb(null, {
        id: user.id.toString(),
        playerId: player.id.toString()
      });
    } catch (err) {
      if (err) {
        return cb(err);
      }
    }
  })
);

export const localAuthentication = passport.authenticate('local', { failureMessage: true });
