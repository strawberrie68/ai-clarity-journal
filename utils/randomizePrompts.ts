export const randomizePrompts = (promptsArray: string[]) => {
  const randomPrompts = [];
  for (let i = 0; i < 3; i++) {
    const randomPrompt =
      promptsArray[Math.floor(Math.random() * promptsArray.length)];
    randomPrompts.push(randomPrompt);
  }
  return randomPrompts;
};
