import { Router } from 'express';
import container from '../../dependency-injection';
import { requireAuth } from '../../Auth';
import { DirectChatsGetController } from '../../Controllers/Communication/Chats/DirectChatsGetController';
import { DirectChatMessagesGetController } from '../../Controllers/Communication/Chats/DirectChatMessagesGetController';
import { CreateDirectChatPutController } from '../../Controllers/Communication/Chats/CreateDirectChatPutController';

export const register = (router: Router) => {
  const directChatsGetController: DirectChatsGetController = container.get(
    'Apps.Communication.Backend.Controllers.DirectChatsGetController'
  );
  router.get(
    '/direct-chats',
    requireAuth,
    directChatsGetController.run.bind(directChatsGetController)
  );

  const directChatMessagesGetController: DirectChatMessagesGetController = container.get(
    'Apps.Communication.Backend.Controllers.DirectChatMessagesGetController'
  );
  router.get(
    '/direct-chats/:id/messages',
    requireAuth,
    directChatMessagesGetController.run.bind(directChatMessagesGetController)
  );

  const createDirectChatPutController: CreateDirectChatPutController = container.get(
    'Apps.Communication.Backend.Controllers.CreateDirectChatPutController'
  );
  router.put(
    '/direct-chats/:id',
    requireAuth,
    createDirectChatPutController.run.bind(createDirectChatPutController)
  );
};
