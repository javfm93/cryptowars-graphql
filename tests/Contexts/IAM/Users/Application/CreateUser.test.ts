import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { CreateUserCommandGenerator } from './CreateUserCommandGenerator';
import { CreateUser } from '../../../../../src/Contexts/IAM/Users/Application/Create/CreateUser';
import { CreateUserCommandHandler } from '../../../../../src/Contexts/IAM/Users/Application/Create/CreateUserCommandHandler';
import { UserGenerator } from '../Domain/UserGenerator';
import { InvalidEmailError } from '../../../../../src/Contexts/IAM/Users/Domain/Errors/InvalidEmailError';
import { InvalidPasswordError } from '../../../../../src/Contexts/IAM/Users/Domain/Errors/InvalidPasswordError';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { UserAlreadyTakenError } from '../../../../../src/Contexts/IAM/Users/Application/Create/UserAlreadyTakenError';
import { InvalidNameError } from '../../../../../src/Contexts/IAM/Users/Domain/Errors/InvalidNameError';

describe('[Application] CreateUser', () => {
  const repository = new UserRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateUser(repository, eventBus);
  const handler = new CreateUserCommandHandler(creator);

  beforeEach(() => {
    eventBus.resetMock();
  });

  it('should create a valid user', async () => {
    const command = CreateUserCommandGenerator.random();

    await handler.handle(command);

    const user = UserGenerator.fromCommand(command);
    const events = user.pullDomainEvents();
    repository.expectLastSavedUserToBe(user);
    expect(events).toHaveLength(1);
    eventBus.expectLastPublishedEventToBe(events[0]);
  });

  describe('should not create an user when: ', () => {
    it('the email is invalid', async () => {
      const command = CreateUserCommandGenerator.withInvalidEmail();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new InvalidEmailError(command.email));
      eventBus.expectEventsNotToBePublished();
    });

    it('the email is already taken', async () => {
      const command = CreateUserCommandGenerator.random();
      const user = UserGenerator.fromCommand(command);
      repository.whenFindByEmailThenReturn(user);

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new UserAlreadyTakenError(command.email));
      eventBus.expectEventsNotToBePublished();
    });

    it('the password has a whitespace', async () => {
      const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.whiteSpace();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(InvalidPasswordError.shouldNotContainWhitespaces());
      eventBus.expectEventsNotToBePublished();
    });

    it('the password has invalid length', async () => {
      const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.length();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(InvalidPasswordError.shouldHaveValidLength());
      eventBus.expectEventsNotToBePublished();
    });

    it('the password does not have a symbol', async () => {
      const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.symbol();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(InvalidPasswordError.shouldHaveASymbol());
      eventBus.expectEventsNotToBePublished();
    });

    it('the password does not have a lowercase', async () => {
      const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.lowerCase();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(InvalidPasswordError.shouldHaveALowercase());
      eventBus.expectEventsNotToBePublished();
    });

    it('the password does not have a upperCase', async () => {
      const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.upperCase();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(InvalidPasswordError.shouldHaveAnUppercase());
      eventBus.expectEventsNotToBePublished();
    });

    it('the password does not have a digit', async () => {
      const command = CreateUserCommandGenerator.withInvalidPasswordDueTo.digit();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(InvalidPasswordError.shouldHaveADigit());
      eventBus.expectEventsNotToBePublished();
    });

    it('the username is invalid', async () => {
      const command = CreateUserCommandGenerator.withInvalidName();

      const result = await handler.handle(command);

      expect(result.value).toStrictEqual(new InvalidNameError(command.name));
      eventBus.expectEventsNotToBePublished();
    });
  });
});
