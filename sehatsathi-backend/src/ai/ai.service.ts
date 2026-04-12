import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);

  // MOCK ML BRIDGE
  // This simulates what the Python ML service will return.
  async analyzeSymptom(message: string, language: string = 'en') {
    // Artificial ML processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const msg = message.toLowerCase();

    // 🔴 HIGH SEVERITY
    if (msg.includes('chest') || msg.includes('breath') || msg.includes('heart')) {
      return {
        summary: "Severe symptom detected (Possible cardiac/respiratory distress)",
        advice: [
          "Seek emergency medical attention immediately",
          "Do not engage in physical activity",
          "Ensure someone is with you"
        ],
        diet: ["Avoid heavy meals"],
        schedule: ["Immediate ER visit"],
        severity: "high",
        recommendDoctor: true
      };
    }

    // 🟡 MEDIUM SEVERITY
    if (msg.includes('fever') || msg.includes('cold') || msg.includes('headache') || msg.includes('stomach')) {
      return {
        summary: "Possible viral infection or flu",
        advice: [
          "Drink plenty of fluids",
          "Take adequate rest",
          "Monitor body temperature"
        ],
        diet: ["Soup", "Khichdi", "Fresh Fruits", "Warm Water"],
        schedule: ["Check temperature every 4 hours"],
        severity: "medium",
        recommendDoctor: true
      };
    }

    // 🟢 LOW SEVERITY (Fallback)
    return {
      summary: "Mild fatigue or general malaise",
      advice: [
        "Ensure you are fully hydrated",
        "Take a short break from screen time or heavy work"
      ],
      diet: ["Normal healthy diet", "Increase water intake"],
      schedule: ["Ensure 8 hours of sleep tonight"],
      severity: "low",
      recommendDoctor: false
    };
  }

  // MOCK FASTAPI OCR BRIDGE
  // Simulates FastAPI returning structured text extraction
  async analyzeFile(file: any) {
    // Artificial ML OCR extraction delay
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    return {
      type: "prescription", // internal tag to handle UI differentiation
      extracted_text: "Dr. Sharma\nRx: Paracetamol 500mg - 1/day\nDiagonosis: Viral Infection",
      problem: "Possible viral infection",
      medicines: [
        {
          name: "Paracetamol 500mg",
          use: "Reduces fever and body ache"
        }
      ],
      causes: [
        "Viral infection outbreak",
        "Weakened immunity due to seasonal change"
      ],
      recovery: [
        "Take complete rest for 2 days",
        "Drink warm fluids frequently"
      ],
      warning: "Consult doctor if symptoms persist or fever exceeds 103°F"
    };
  }
}
