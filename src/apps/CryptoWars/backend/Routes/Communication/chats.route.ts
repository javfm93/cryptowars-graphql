import { Router } from 'express';
import { requireAuth } from '../../Auth';
import { DirectChatsGetController } from '../../Controllers/Communication/Chats/DirectChatsGetController';
import { DirectChatMessagesGetController } from '../../Controllers/Communication/Chats/DirectChatMessagesGetController';
import { CreateDirectChatPutController } from '../../Controllers/Communication/Chats/CreateDirectChatPutController';
import { DependencyInjector } from '../../dependency-injection/dependencyInjector';

export const register = (router: Router) => {
  const directChatsGetController = DependencyInjector.get(DirectChatsGetController);
  router.get(
    '/direct-chats',
    requireAuth,
    directChatsGetController.run.bind(directChatsGetController)
  );

  const directChatMessagesGetController = DependencyInjector.get(DirectChatMessagesGetController);
  router.get(
    '/direct-chats/:id/messages',
    requireAuth,
    directChatMessagesGetController.run.bind(directChatMessagesGetController)
  );

  const createDirectChatPutController = DependencyInjector.get(CreateDirectChatPutController);
  router.put(
    '/direct-chats/:id',
    requireAuth,
    createDirectChatPutController.run.bind(createDirectChatPutController)
  );
};
