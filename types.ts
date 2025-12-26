export interface BookingFormData {
  childName: string;
  childAge: string; 
  parentName: string;
  parentPhone: string;
  email: string;
}

export interface VoucherDetails {
  status: 'eligible' | 'not_eligible';
  ageGroup: string;
  timeSlot: string;
  location: string;
  day: string;
  date?: string; // Specific date of the class
  message?: string; // Optional message from AI
}

export interface ClassSchedule {
  ageRange: string;
  time: string;
  day: string;
}