type PageTypes = 'auth-page' | 'guest-page' | 'protected-page'

type PagesEjs = {
  [key: string]: {
    route: string
    file_name: string
    type: PageTypes
  }
}

const page: PagesEjs = {
  profile: {
    route: '/profile-page',
    file_name: 'profile',
    type: 'auth-page',
  },
  notfound: {
    route: '*',
    file_name: 'notfound',
    type: 'guest-page',
  },
}

export default page
