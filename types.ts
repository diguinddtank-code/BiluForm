export type Language = 'pt' | 'es' | 'en';

export interface PhotoOrderFormData {
  playerName: string;
  parentName: string;
  phone: string;
  email: string;
}

export interface BookingFormData {
  childName: string;
  childAge: string;
  parentName: string;
  email: string;
  phone: string;
  zipCode?: string;
}

export interface VoucherDetails {
  status: 'eligible' | 'not_eligible';
  ageGroup: string;
  timeSlot: string;
  location: string;
  day: string;
  date?: string; 
  message?: string;
}

export interface ClassSchedule {
  ageRange: string;
  time: string;
  day: string;
}