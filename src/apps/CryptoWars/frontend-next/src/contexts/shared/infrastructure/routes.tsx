export const AppRoutes = {
  selectWorld: '/select-world',
  town: (id: string) => `/towns/${id}`,
  home: '/home',
  registration: '/registration',
  login: '/login',
  headquarter: (id: string) => `/towns/${id}/headquarter`,
  world: (id: string) => `/worlds/${id}`,
  chat: '/chat'
};
 