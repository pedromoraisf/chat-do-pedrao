import { makeFakeGlobalChatWithThreeInitialMessages } from '@entities/chat';
import { makeFakeUser } from '@entities/user';
import { Message } from '@entities/message';
import { Content, Id } from '@entities/message/values';

describe('Entitiy Chat Tests', () => {
  test('should be initialize Chat entity in global mode, receiving an Message Bucket', () => {
    const { chat, fakeMessageBucket, fakeChatId } = makeFakeGlobalChatWithThreeInitialMessages();
    expect(chat).toEqual({
      id: fakeChatId,
      messages: fakeMessageBucket
    });
  });

  test('should be add unique message in Chat instance', () => {
    const { chat } = makeFakeGlobalChatWithThreeInitialMessages();

    const fakeId = new Id('any_id');
    const fakeUser = makeFakeUser();
    const fakeContent = new Content('new_message');
    const newMessage = new Message(fakeId, fakeUser, fakeContent);

    expect(chat.addMessage(newMessage)).toBeTruthy();
  });

  test('should be returns adapted data in getClean', () => {
    const { chat } = makeFakeGlobalChatWithThreeInitialMessages();

    const sameSender = {
      id: 'any_id',
      name: 'any_name',
      username: 'any_username',
      password: 'any_password'
    };
    const sameContentMessage = {
      message: 'any_fake_message_content'
    };
    expect(chat.getClean()).toEqual({
      id: 'global_chat',
      messages: [
        {
          id: 'any_id',
          sender: sameSender,
          content: sameContentMessage
        },
        {
          id: 'any_id',
          sender: sameSender,
          content: sameContentMessage
        },
        {
          id: 'any_id',
          sender: sameSender,
          content: sameContentMessage
        }
      ]
    });
  });
});
