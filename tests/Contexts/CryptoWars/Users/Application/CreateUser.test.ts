import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { CreateUserCommandGenerator } from './CreateUserCommandGenerator';
import { CreateUser } from '../../../../../src/Contexts/CryptoWars/Users/Application/Create/CreateUser';
import { CreateUserCommandHandler } from '../../../../../src/Contexts/CryptoWars/Users/Application/Create/CreateUserCommandHandler';
import { UserGenerator } from '../Domain/UserGenerator';
import { InvalidEmailError } from '../../../../../src/Contexts/CryptoWars/Users/Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../../../../src/Contexts/CryptoWars/Users/Domain/Errors/InvalidPasswordError';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';

describe('[Application] CreateUser', () => {
  const repository = new UserRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateUser(repository, eventBus);
  const handler = new CreateUserCommandHandler(creator);

  it('should create a valid user', async () => {
    const command = CreateUserCommandGenerator.random();

    await handler.handle(command);

    const user = UserGenerator.fromCommand(command);
    const events = user.pullDomainEvents();
    repository.expectLastSavedUserToBe(user);
    expect(events).toHaveLength(1);
    eventBus.expectLastPublishedEventToBe(events[0]);
  });

  it('should not create an user with invalid email', async () => {
    const command = CreateUserCommandGenerator.withInvalidEmail();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidEmailError);
    }
  });

  it('should not create an user with a password with whitespace', async () => {
    const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.whiteSpace();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidPasswordError.shouldNotContainWhitespaces());
    }
  });

  it('should not create an user with a password with invalid length', async () => {
    const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.length();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidPasswordError.shouldHaveValidLength());
    }
  });

  it('should not create an user with a password without a symbol', async () => {
    const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.symbol();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidPasswordError.shouldHaveASymbol());
    }
  });

  it('should not create an user with a password without a loweCase', async () => {
    const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.lowerCase();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidPasswordError.shouldHaveALowercase());
    }
  });

  it('should not create an user with a password without a upperCase', async () => {
    const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.upperCase();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidPasswordError.shouldHaveAnUppercase());
    }
  });

  it('should not create an user with a password without a number', async () => {
    const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.digit();

    try {
      await handler.handle(command);
    } catch (e) {
      expect(e).toStrictEqual(InvalidPasswordError.shouldHaveADigit());
    }
  });
});
