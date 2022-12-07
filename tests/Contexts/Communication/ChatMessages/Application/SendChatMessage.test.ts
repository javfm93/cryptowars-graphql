import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { SendChatMessageCommandGenerator } from './SendChatMessageCommandGenerator';
import { ChatMessagesRepositoryMock } from '../__mocks__/ChatMessagesRepositoryMock';
import { ChatMessageEventsGenerator } from '../Domain/ChatMessageEventsGenerator';
import { ChatMessageGenerator } from '../Domain/ChatMessageGenerator';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';
import { SendChatMessage } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Send/SendChatMessage';
import { SendChatMessageCommandHandler } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Send/SendChatMessageCommandHandler';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Send chat message', () => {
  const chatMessagesRepository = new ChatMessagesRepositoryMock();
  const eventBus = new EventBusMock();
  const useCase = new SendChatMessage(chatMessagesRepository, eventBus);
  const handler = new SendChatMessageCommandHandler(useCase);

  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  it('should send a chat message', async () => {
    const expectedChatMessage = ChatMessageGenerator.random();
    const command = SendChatMessageCommandGenerator.from(expectedChatMessage);

    await handler.handle(command);

    chatMessagesRepository.expectLastSavedChatMessageToBe(expectedChatMessage);
    const chatMessageSentDomainEvent = ChatMessageEventsGenerator.sent(command);
    eventBus.expectPublishedEventsToBe([chatMessageSentDomainEvent]);
  });

  xit('should return conflict when the chat message already exist', async () => {});

  xit('should return forbidden when the player id is not part of the chat', async () => {});
});
