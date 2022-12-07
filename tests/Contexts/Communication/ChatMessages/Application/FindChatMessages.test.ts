import { FindChatMessagesQueryGenerator } from './FindChatMessagesQueryGenerator';
import { ChatMessagesRepositoryMock } from '../__mocks__/ChatMessagesRepositoryMock';
import { ChatMessageGenerator } from '../Domain/ChatMessageGenerator';
import { FindChatMessages } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Find/FindChatMessages';
import { FindChatMessagesQueryHandler } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Find/FindChatMessagesQueryHandler';
import { DirectChatGenerator } from '../../Chats/Domain/DirectChatGenerator';

describe('[Application] Find chat messages by chat id', () => {
  const repository = new ChatMessagesRepositoryMock();
  const creator = new FindChatMessages(repository);
  const handler = new FindChatMessagesQueryHandler(creator);

  it('should return the list of messages of a chat', async () => {
    const query = FindChatMessagesQueryGenerator.random();
    const expectedMessages = ChatMessageGenerator.multipleRandomFor(
      DirectChatGenerator.randomFrom(query)
    );
    repository.whenFindByDirectChatThenReturn(expectedMessages);

    const messages = await handler.handle(query);

    expect(messages.value).toStrictEqual(expectedMessages);
  });
});
