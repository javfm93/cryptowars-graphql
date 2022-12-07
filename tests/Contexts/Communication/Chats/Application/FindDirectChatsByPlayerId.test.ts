import { FindDirectChatsByPlayerIdQueryGenerator } from './FindDirectChatsByPlayerIdQueryGenerator';
import { DirectChatRepositoryMock } from '../__mocks__/DirectChatRepositoryMock';
import { DirectChatGenerator } from '../Domain/DirectChatGenerator';
import { FindDirectChatsByPlayerId } from '../../../../../src/Contexts/Communication/Chats/Application/Find/FindDirectChatsByPlayerId';
import { FindDirectChatsByPlayerIdQueryHandler } from '../../../../../src/Contexts/Communication/Chats/Application/Find/FindDirectChatsByPlayerIdQueryHandler';

describe('[Application] Find direct chats by player id', () => {
  const repository = new DirectChatRepositoryMock();
  const creator = new FindDirectChatsByPlayerId(repository);
  const handler = new FindDirectChatsByPlayerIdQueryHandler(creator);

  it('should return the list of chats', async () => {
    const query = FindDirectChatsByPlayerIdQueryGenerator.random();
    const expectedWorlds = DirectChatGenerator.multipleRandom();
    repository.whenFindDirectChatsOfThenReturn(expectedWorlds);

    const chats = await handler.handle(query);

    expect(chats.value).toStrictEqual(expectedWorlds);
  });
});
