export const FakeLoading = (time: number = 2000): Promise<void> => 
  new Promise((resolve) => setTimeout(() => resolve(), time));