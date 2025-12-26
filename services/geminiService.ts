import { GoogleGenAI, Type } from "@google/genai";
import { VoucherDetails } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "Class Matcher AI" for BISA Soccer Academy.
Your goal is to validate if a child is eligible for our Winter Futsal Program based on their age.

**SCHEDULE DATABASE:**
- Address: Sangaree Middle School Gym, 1050 Discovery Dr. Ladson, SC 29456
- Schedule (Wednesdays ONLY):
  - Age 4 to 8: 6:00 PM - 7:00 PM
  - Age 9 to 15: 8:15 PM - 9:15 PM

**RULES:**
1. If Age is 4 to 8 (inclusive):
   - status: "eligible"
   - ageGroup: "4 - 8 Years Old"
   - timeSlot: "6:00 PM - 7:00 PM"
   - location: "Sangaree Middle School Gym"
   - day: "Wednesday"
   - message: "You are eligible for the 4-8 age group."

2. If Age is 9 to 15 (inclusive):
   - status: "eligible"
   - ageGroup: "9 - 15 Years Old"
   - timeSlot: "8:15 PM - 9:15 PM"
   - location: "Sangaree Middle School Gym"
   - day: "Wednesday"
   - message: "You are eligible for the 9-15 age group."

3. If Age is below 4 or above 15:
   - status: "not_eligible"
   - ageGroup: "N/A"
   - timeSlot: "N/A"
   - location: "N/A"
   - day: "N/A"
   - message: "Unfortunately, we do not have a class for this age group at this time."

**OUTPUT JSON:**
Return a JSON object matching the Schema exactly. Ensure all fields are filled.
`;

const getNextWednesday = (): string => {
  const date = new Date();
  const day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 3 = Wednesday
  
  // Calculate days until next Wednesday
  // If today is Wednesday (3), result is 0 (today) -> or 7 if we want strictly next week. 
  // Let's assume if it's Wednesday, we show Today's date.
  let daysUntil = (3 - day + 7) % 7;
  
  date.setDate(date.getDate() + daysUntil);
  
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const findClassMatch = async (age: string): Promise<VoucherDetails> => {
  const nextWednesdayDate = getNextWednesday();

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Child Age: ${age}`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['eligible', 'not_eligible'] },
            ageGroup: { type: Type.STRING },
            timeSlot: { type: Type.STRING },
            location: { type: Type.STRING },
            day: { type: Type.STRING },
            message: { type: Type.STRING }
          },
          required: ['status', 'ageGroup', 'timeSlot', 'location', 'day'],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const voucher = JSON.parse(text) as VoucherDetails;
    
    // Inject the calculated date
    voucher.date = nextWednesdayDate;
    
    return voucher;
  } catch (error) {
    // Only log warnings for expected fallbacks to avoid console clutter
    console.warn("AI Service unavailable or failed, using fallback logic.", error);
    
    // Fallback logic if AI fails
    const numAge = parseInt(age);
    if (!isNaN(numAge)) {
      if (numAge >= 4 && numAge <= 8) {
        return {
          status: 'eligible',
          ageGroup: '4 - 8 Years Old',
          timeSlot: '6:00 PM - 7:00 PM',
          day: 'Wednesday',
          date: nextWednesdayDate,
          location: 'Sangaree Middle School Gym',
          message: 'AI Service unavailable, falling back to basic schedule.'
        };
      } else if (numAge >= 9 && numAge <= 15) {
        return {
          status: 'eligible',
          ageGroup: '9 - 15 Years Old',
          timeSlot: '8:15 PM - 9:15 PM',
          day: 'Wednesday',
          date: nextWednesdayDate,
          location: 'Sangaree Middle School Gym',
          message: 'AI Service unavailable, falling back to basic schedule.'
        };
      }
    }
    
    return {
      status: 'not_eligible',
      ageGroup: '',
      timeSlot: '',
      location: '',
      day: '',
      message: 'Unable to determine eligibility.'
    };
  }
};