import passport from 'passport';
import LocalStrategy from 'passport-local';
import { UserRepository } from '../../../../Contexts/IAM/Users/Domain/UserRepository';
import container from '../dependency-injection';
import { UserEmail } from '../../../../Contexts/IAM/Users/Domain/UserEmail';
import bcrypt from 'bcrypt';
import { PlayerRepository } from '../../../../Contexts/CryptoWars/Players/Domain/PlayerRepository';

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
      const userRepository: UserRepository = container.get('CryptoWars.Users.UserRepository');
      const user = await userRepository.findByEmail(UserEmail.fromPrimitives(email));
      if (!user) return cb(null, false, { message: 'Incorrect username or password.' });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const passwordMatches = await bcrypt.compare(password, hash);
      if (!passwordMatches) return cb(null, false, { message: 'Incorrect username or password.' });

      const playerRepository: PlayerRepository = container.get(
        'CryptoWars.Players.PlayerRepository'
      );
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
