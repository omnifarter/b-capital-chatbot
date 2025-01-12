// don't want the chat title to be too long...
export const createTitle = (message: string) => {
  if (message.length <= 25) {
    return message;
  } else {
    return message.slice(0, 22) + "...";
  }
};
