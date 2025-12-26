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
1. **Age Check**:
   - If Age is 4-8: Return eligible, time 6-7 PM.
   - If Age is 9-15: Return eligible, time 8:15-9:15 PM.
   - If Age < 4 or > 15: Return status "not_eligible".

**OUTPUT JSON:**
Return a JSON object matching the Schema.
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
    console.error("AI Service Error:", error);
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