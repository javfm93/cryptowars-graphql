export const mockTimeSetup = () => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1));
};

export const mockTimeCleanUp = () => {
  jest.useRealTimers();
};
