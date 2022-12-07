import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { DirectChatRepository } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatRepository';
import { DirectChat } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChat';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { DirectChats } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChats';

export class DirectChatRepositoryMock implements DirectChatRepository {
  private mockFindDirectChatsOf = jest.fn();
  private mockSave = jest.fn();
  private mockFindDirectChatBetween = jest.fn();

  async findDirectChatsOf(): Promise<DirectChats> {
    return this.mockFindDirectChatsOf();
  }

  whenFindDirectChatsOfThenReturn(value: DirectChats): void {
    this.mockFindDirectChatsOf.mockReturnValueOnce(value);
  }

  async save(directChat: DirectChat): Promise<void> {
    this.mockSave(directChat);
  }

  expectLastSavedDirectChatToBe(directChat: DirectChat): void {
    expect(this.mockSave).toBeCalledWith(directChat);
  }

  findDirectChatBetween(playerOne: PlayerId, playerTwo: PlayerId): Promise<NothingOr<DirectChat>> {
    return this.mockFindDirectChatBetween(playerOne, playerTwo);
  }

  whenFindDirectChatBetweenThenReturn(directChat: NothingOr<DirectChat>): void {
    this.mockFindDirectChatBetween.mockImplementationOnce(
      (playerOneId: PlayerId, playerTwoId: PlayerId): NothingOr<DirectChat> =>
        directChat?.playerOneId.isEqualTo(playerOneId) &&
        directChat?.playerTwoId.isEqualTo(playerTwoId)
          ? directChat
          : null
    );
  }
}
