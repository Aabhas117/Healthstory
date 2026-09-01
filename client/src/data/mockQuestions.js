export const MOCK_QUESTIONS = [
  {
    id: 'q1',
    questionEn: 'What is your primary medical concern today?',
    questionHi: 'आज आपकी मुख्य स्वास्थ्य समस्या क्या है?',
    optionsEn: ['Chest Pain', 'Fever & Cough', 'Abdominal Pain', 'Joint Pain', 'General Checkup'],
    optionsHi: ['सीने में दर्द (Chest Pain)', 'बुखार और खांसी', 'पेट दर्द', 'जोड़ों का दर्द', 'सामान्य जांच'],
    symptomKey: 'Chest pain'
  },
  {
    id: 'q2',
    questionEn: 'How long have you experienced this chest discomfort?',
    questionHi: 'आपको यह सीने का दर्द कितने समय से हो रहा है?',
    optionsEn: ['3 days', '1 day', 'Few hours', 'More than 1 week'],
    optionsHi: ['3 दिन से', '1 दिन से', 'कुछ घंटों से', '1 सप्ताह से अधिक']
  },
  {
    id: 'q3',
    questionEn: 'Do you also feel any breathlessness or profuse sweating?',
    questionHi: 'क्या आपको सांस लेने में तकलीफ या बहुत पसीना भी आ रहा है?',
    optionsEn: ['Yes, both breathlessness & sweating', 'Breathlessness only', 'Sweating only', 'Neither'],
    optionsHi: ['हाँ, सांस फूलना और पसीना दोनों', 'केवल सांस फूलना', 'केवल पसीना', 'दोनों में से कोई नहीं'],
    triggerRedFlag: true
  },
  {
    id: 'q4',
    questionEn: 'Do you have any existing medical conditions or allergies?',
    questionHi: 'क्या आपको पहले से कोई बीमारी या किसी दवा से एलर्जी है?',
    optionsEn: ['Hypertension (High BP)', 'Diabetes', 'Penicillin Allergy', 'Asthma', 'None'],
    optionsHi: ['हाई बीपी (Hypertension)', 'डायबिटीज', 'पेनिसिलिन एलर्जी', 'अस्थमा', 'कोई नहीं']
  }
];
