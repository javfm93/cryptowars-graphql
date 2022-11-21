export const fromMsToHours = (ms: number): number => {
  const sec = ms / 1000;
  return sec / 3600;
};

export const calculateMsSince = (date: Date) => Math.abs(new Date().valueOf() - date.valueOf());
