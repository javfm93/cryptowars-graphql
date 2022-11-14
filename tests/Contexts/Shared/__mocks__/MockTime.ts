export const currentTime = new Date(2020, 3, 1);

export const mockTimeSetup = () => {
  jest.useFakeTimers();
  jest.setSystemTime(currentTime);
};

export const mockTimeCleanUp = () => {
  jest.useRealTimers();
};
