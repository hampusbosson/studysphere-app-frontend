export const paths = {
    // Landing page route
    landing: {
      path: "/",
      getHref: () => "/",
    },
  
    // Auth routes
    auth: {
      login: {
        path: 'login',
        getHref: (redirectTo?: string | null | undefined) =>
          `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
      },
      signup: {
        path: "signup",
        getHref: () => "/signup",
      },
      verify: {
        path: "verify",
        getHref: () => "/verify",
      },
      reset: {
        path: "reset",
        getHref: () => "/reset",
      },
      resetPassword: {
        path: "reset-password",
        getHref: () => "/reset-password",
      },
    },
  
    // App (protected) routes
    app: {
      home: {
        path: "home",
        getHref: () => "/home",
      },
      lecture: {
        path: "lecture/:lectureId",
        getHref: (lectureId: string) => `/home/lecture/${lectureId}`,
      },
    },
  } as const;