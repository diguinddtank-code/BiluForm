import { BookingFormData, VoucherDetails } from "../types";

const WEBHOOK_URL = "https://webhook.infra-remakingautomacoes.cloud/webhook/formulario";

// Helper to generate the next 'count' Wednesdays
export const getUpcomingWednesdays = (count: number = 4): string[] => {
  const dates: string[] = [];
  const date = new Date();
  
  // Find the next Wednesday (if today is Wed, we count it, unless it's late, but let's assume valid for now)
  // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed
  while (date.getDay() !== 3) {
    date.setDate(date.getDate() + 1);
  }

  for (let i = 0; i < count; i++) {
    dates.push(date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric'
    }));
    // Add 7 days for the next week
    date.setDate(date.getDate() + 7);
  }
  
  return dates;
};

// Kept for fallback compatibility, but main logic now comes from UI selection
const getNextWednesday = (): string => {
  const dates = getUpcomingWednesdays(1);
  return dates[0];
};

export const determineEligibility = (ageStr: string): VoucherDetails => {
  const age = parseInt(ageStr, 10);
  const nextDate = getNextWednesday();
  
  if (isNaN(age)) {
    return {
      status: 'not_eligible',
      ageGroup: '',
      timeSlot: '',
      location: '',
      day: ''
    };
  }

  // Logic based on BISA schedule
  if (age >= 4 && age <= 8) {
    return {
      status: 'eligible',
      ageGroup: '4 - 8 Years Old',
      timeSlot: '6:00 PM - 7:00 PM',
      day: 'Wednesday',
      date: nextDate,
      location: 'Sangaree Middle School Gym'
    };
  } else if (age >= 9 && age <= 15) {
    return {
      status: 'eligible',
      ageGroup: '9 - 15 Years Old',
      timeSlot: '8:15 PM - 9:15 PM',
      day: 'Wednesday',
      date: nextDate,
      location: 'Sangaree Middle School Gym'
    };
  } else {
    return {
      status: 'not_eligible',
      ageGroup: '',
      timeSlot: '',
      location: '',
      day: ''
    };
  }
};

export const submitBookingToWebhook = async (data: BookingFormData, voucher: VoucherDetails): Promise<boolean> => {
  try {
    const payload = {
      ...data,
      assigned_class: voucher.ageGroup,
      assigned_time: voucher.timeSlot,
      assigned_date: voucher.date, // Use the date from the voucher (which matches selectedDate)
      submission_date: new Date().toISOString()
    };

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return response.ok;
  } catch (error) {
    console.error("Webhook submission error:", error);
    return false;
  }
};