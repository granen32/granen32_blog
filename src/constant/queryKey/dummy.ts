/** react query key 관리 */

export const QUERY_KEYS = {
  POST: {
    LIST: ["post", "list"],
    DETAIL: (id: number) => ["post", "detail", id],
    CREATE: ["post", "create"],
    UPDATE: (id: number) => ["post", "update", id],
    DELETE: (id: number) => ["post", "delete", id],
  },
  COMMENT: {
    LIST: (postId: number) => ["comment", "list", postId],
    DETAIL: (id: number) => ["comment", "detail", id],
    CREATE: ["comment", "create"],
    UPDATE: (id: number) => ["comment", "update", id],
    DELETE: (id: number) => ["comment", "delete", id],
  },
  USER: {
    LIST: ["user", "list"],
    DETAIL: (id: number) => ["user", "detail", id],
    PROFILE: ["user", "profile"],
    PLANS: {
      INDEX: ["plans", "user"],
      SCRAP: ["plans", "user", "scrap"],
    },
    PLAN: {},
    PLACES: {
      SCRAP: ["places", "user", "scrap"],
    },
    PLACE: {},
  },
  GENERAL: {
    PLANS: {
      INDEX: ["plans"],
    },
    PLAN: {
      INDEX: (planId: number) => ["plan", planId],
    },
    PLACES: {
      INDEX: ["places"],
    },
  },
} as const;
