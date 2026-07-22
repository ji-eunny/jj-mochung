/** 신랑/신부 정보 */
export interface Person {
  name: string;
  englishName?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
}

/** 결혼식 날짜/시간 정보 */
export interface WeddingDateTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  dayOfWeek: string;
}

/** 예식장 정보 */
export interface Venue {
  name: string;
  hall?: string;
  address: string;
  addressDetail?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  transportInfo?: TransportInfo[];
}

/** 교통 정보 */
export interface TransportInfo {
  type: "subway" | "bus" | "car" | "parking";
  description: string;
}

/** 계좌 정보 */
export interface BankAccount {
  owner: string;
  bank: string;
  accountNumber: string;
}

/** 갤러리 이미지 */
export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** 청첩장 전체 데이터 */
export interface WeddingData {
  groom: Person;
  bride: Person;
  dateTime: WeddingDateTime;
  venue: Venue;
  greetingMessage: string;
  gallery?: GalleryImage[];
  groomAccount?: BankAccount;
  brideAccount?: BankAccount;
  rsvpEnabled?: boolean;
}

/** RSVP 참석 여부 */
export type AttendanceStatus = "attending" | "not-attending" | "undecided";

/** RSVP 폼 데이터 */
export interface RsvpFormData {
  name: string;
  phone: string;
  attendance: AttendanceStatus;
  guestCount?: number;
  message?: string;
}
