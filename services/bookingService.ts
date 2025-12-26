import { BookingFormData, VoucherDetails } from "../types";

const WEBHOOK_URL = "https://webhook.infra-remakingautomacoes.cloud/webhook/formulario";

const getNextWednesday = (): string => {
  const date = new Date();
  const day = date.getDay();
  let daysUntil = (3 - day + 7) % 7;
  date.setDate(date.getDate() + daysUntil);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
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
      assigned_date: voucher.date,
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
    // In many frontend-only scenarios without a proxy, CORS might fail. 
    // For this UI demo, we often treat network errors as handled or alert the user.
    // However, we return false here to let the UI handle it.
    return false;
  }
};