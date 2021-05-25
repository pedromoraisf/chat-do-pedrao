export const adapterUserSendedMessage = (toAdapt: any): any => ({
  id: toAdapt.id.id,
  sender: {
    id: toAdapt.sender.id.id,
    name: toAdapt.sender.name.name,
    username: toAdapt.sender.username.username,
    password: toAdapt.sender.password.password
  },
  content: {
    message: toAdapt.content.content
  }
});
