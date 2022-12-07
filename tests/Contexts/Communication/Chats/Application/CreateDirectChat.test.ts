import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { CreateDirectChatCommandGenerator } from './CreateDirectChatCommandGenerator';
import { DirectChatRepositoryMock } from '../__mocks__/DirectChatRepositoryMock';
import { DirectChatEventsGenerator } from '../Domain/DirectChatEventsGenerator';
import { CreateDirectChat } from '../../../../../src/Contexts/Communication/Chats/Application/Create/CreateDirectChat';
import { CreateDirectChatCommandHandler } from '../../../../../src/Contexts/Communication/Chats/Application/Create/CreateDirectChatCommandHandler';
import { DirectChatGenerator } from '../Domain/DirectChatGenerator';
import { ChatAlreadyExistError } from '../../../../../src/Contexts/Communication/Chats/Application/Create/ChatAlreadyExistError';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Create direct chat', () => {
  const directChatRepository = new DirectChatRepositoryMock();
  const eventBus = new EventBusMock();
  const useCase = new CreateDirectChat(directChatRepository, eventBus);
  const handler = new CreateDirectChatCommandHandler(useCase);

  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  beforeEach(() => {
    eventBus.resetMock();
  });

  it('should create a direct chat', async () => {
    const expectedDirectChat = DirectChatGenerator.random();
    const command = CreateDirectChatCommandGenerator.from(expectedDirectChat);
    directChatRepository.whenFindDirectChatBetweenThenReturn(null);

    await handler.handle(command);

    const expectedDirectChatEvent = DirectChatEventsGenerator.created(command.id);
    directChatRepository.expectLastSavedDirectChatToBe(expectedDirectChat);
    eventBus.expectPublishedEventsToBe([expectedDirectChatEvent]);
  });

  it('should return conflict when the chat already exist', async () => {
    const expectedDirectChat = DirectChatGenerator.random();
    const command = CreateDirectChatCommandGenerator.from(expectedDirectChat);
    directChatRepository.whenFindDirectChatBetweenThenReturn(expectedDirectChat);

    const result = await handler.handle(command);

    expect(result.value).toStrictEqual(new ChatAlreadyExistError());
    eventBus.expectEventsNotToBePublished();
  });

  xit('should return conflict when the id already exist', async () => {
    const expectedDirectChat = DirectChatGenerator.random();
    const command = CreateDirectChatCommandGenerator.from(expectedDirectChat);
    directChatRepository.whenFindDirectChatBetweenThenReturn(expectedDirectChat);

    const result = await handler.handle(command);

    expect(result.value).toStrictEqual(new ChatAlreadyExistError());
    eventBus.expectEventsNotToBePublished();
  });
});
