export const paths = {
    // Landing page route
    landing: {
      home: {
        path: "/",
        getHref: () => "/",
      },
      blog: {
        path: "blog",
        getHref: () => "/blog",
      },
      pricing: {
        path: "pricing",
        getHref: () => "/pricing",
      }
    },
  
    // Auth routes
    auth: {
      login: {
        path: 'login',
        getHref: () => "/login",
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
        getHref: () => "/home"
      },
      course: {
        path: "courses",
        getHref: () => "/courses",
      },
      lecture: {
        path: "lecture/:lectureId",
        getHref: (lectureId?: string) => `/courses/lecture/${lectureId}`,
      },
    },
  } as const;