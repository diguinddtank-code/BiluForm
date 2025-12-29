import { VoucherDetails } from "../types";

// --------------------------------------------------------------------------
// LÓGICA DE AGENDAMENTO (SEM IA)
// Regras fixas baseadas na idade do atleta
// --------------------------------------------------------------------------

export const findClassMatch = async (age: string): Promise<VoucherDetails> => {
  // Simula um pequeno atraso de rede para UX (loading spinner)
  // Isso dá uma sensação de "processamento" profissional ao usuário
  await new Promise(resolve => setTimeout(resolve, 600));

  const numAge = parseInt(age, 10);
  
  if (isNaN(numAge)) {
     return {
        status: 'not_eligible',
        ageGroup: '',
        timeSlot: '',
        location: '',
        day: '',
        message: 'Please enter a valid age.'
    };
  }

  // Regra 1: Idade 4 a 8 anos
  if (numAge >= 4 && numAge <= 8) {
    return {
      status: 'eligible',
      ageGroup: '4 - 8 Years Old',
      timeSlot: '6:00 PM - 7:00 PM',
      day: 'Wednesday',
      location: 'Sangaree Middle School Gym',
      message: 'You are eligible for the 4-8 age group.'
    };
  } 
  // Regra 2: Idade 9 a 15 anos
  else if (numAge >= 9 && numAge <= 15) {
    return {
      status: 'eligible',
      ageGroup: '9 - 15 Years Old',
      timeSlot: '8:15 PM - 9:15 PM',
      day: 'Wednesday',
      location: 'Sangaree Middle School Gym',
      message: 'You are eligible for the 9-15 age group.'
    };
  } 
  // Regra 3: Não elegível
  else {
    return {
      status: 'not_eligible',
      ageGroup: 'N/A',
      timeSlot: 'N/A',
      location: 'N/A',
      day: 'N/A',
      message: 'Unfortunately, we do not have a class for this age group at this time.'
    };
  }
};