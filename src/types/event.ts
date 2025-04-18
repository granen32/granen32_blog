export type EventTarget =
  | "general"
  | "pre80"
  | "blueSeasonB"
  | "blueSeasonA"
  | "premium"
  | "children";

export type EventType = "entry" | "message" | "choice";

export type CouponType = "amount" | "count" | "percentage";

export type CouponIssuer = "samsungLions" | "ticketLink" | "teamStore";

export type CouponCategory = "currency" | "giftCard" | "ticket";

export type CouponIssueMethod = "self" | "external";

export interface EventFormData {
  title: string;
  description: string;
  winnerCount: number;
  targets: EventTarget[];
  showResult: boolean;
  eventType: EventType;
  startDate: string;
  endDate: string;
  pushMessage: string;
  winnerPushMessage: string;
  webBannerImage: string;
  mobileBannerImage: string;
}

export interface CouponFormData {
  number: string; // 자동생성
  issuer: CouponIssuer;
  issueMethod: CouponIssueMethod;
  category: CouponCategory;
  type: CouponType;
  value: string;
  name: string;
  target: string;
  notice: string;
  usagePlace: string;
}
