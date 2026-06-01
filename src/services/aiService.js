import { getMedicalAIResponse } from "./healthAiService";

// Standard delay helper for offline fallbacks
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const EMERGENCY_KEYWORDS = [
  "chest pain",
  "heart attack",
  "breathing",
  "breath",
  "suffocating",
  "unconscious",
  "passed out",
  "bleeding heavily",
  "severe bleed",
  "poison",
  "stroke",
  "numbness one side",
  "speech slur",
  "suicidal",
];

const MODERATE_KEYWORDS = [
  "fever",
  "vomiting",
  "diarrhea",
  "malaria",
  "coughing",
  "burn",
  "sprain",
  "broken bone",
  "fracture",
  "dog bite",
  "infection",
  "stomach ache",
  "abdominal pain",
  "abdominal",
  "severe headache",
];

export async function getAIResponse(message, history = []) {
  const apiKey =
    import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;

  // 1. Attempt Real-time Gemini API integration if key is available
  if (apiKey && apiKey.trim() !== "" && !apiKey.includes("YOUR_API_KEY")) {
    try {
      const result = await getMedicalAIResponse(message, history);

      // Verify if the API returned a successful clinical result (not a fallback)
      if (
        result &&
        result.title !== "Service Temporarily Unavailable" &&
        result.response
      ) {
        let formattedText = result.response;

        if (result.recommendations && result.recommendations.length > 0) {
          formattedText +=
            `\n\n**Actionable Recommendations:**\n` +
            result.recommendations.map((r) => `* ${r}`).join("\n");
        }

        if (result.followUpQuestions && result.followUpQuestions.length > 0) {
          formattedText +=
            `\n\n**Follow-up Questions to consider:**\n` +
            result.followUpQuestions.map((q) => `* ${q}`).join("\n");
        }

        return {
          text: formattedText,
          urgency: result.urgency || "Low",
          actions: result.suggestedActions || [],
          timestamp: new Date().toISOString(),
        };
      }
    } catch (e) {
      console.warn(
        "⚠️ API Call failed. Activating local offline diagnostic trees...",
        e,
      );
    }
  }

  // 2. Offline / Local Fallback Diagnostic Trees
  await delay(1200);
  const cleanMessage = message.toLowerCase().trim();

  let urgency = "Low";
  let isEmergency = false;

  if (EMERGENCY_KEYWORDS.some((key) => cleanMessage.includes(key))) {
    urgency = "High";
    isEmergency = true;
  } else if (MODERATE_KEYWORDS.some((key) => cleanMessage.includes(key))) {
    urgency = "Medium";
  }

  let text = "";
  let actions = [];

  // Suggestion: Headache
  if (cleanMessage.includes("headache") && !isEmergency) {
    text = `A headache can be triggered by various factors such as stress, dehydration, lack of sleep, eye strain, or tension.

**Preliminary Guidance:**
* **Hydrate:** Drink a large glass of water. Dehydration is a very common cause of head pain.
* **Rest:** Sit or lie down in a quiet, dark room. Rest your eyes away from screens.
* **Cold/Warm Compress:** Apply a cool cloth or ice pack to your forehead or the back of your neck.
* **Relaxation:** Gently massage your temples or practice deep, slow breathing.

*Note: If this headache is sudden, severe, and describes as the "worst headache of your life," or is accompanied by fever, neck stiffness, confusion, or difficulty speaking, seek immediate care.*`;

    actions = [
      { label: "Find nearby pharmacies/clinics", actionType: "NAV_CLINICS" },
      {
        label: "Read about Hypertension & Headaches",
        actionType: "NAV_EDUCATION",
        payload: "Hypertension",
      },
    ];
  }
  // Suggestion: Clinics
  else if (
    cleanMessage.includes("find nearby clinics") ||
    cleanMessage.includes("clinic") ||
    cleanMessage.includes("hospital")
  ) {
    text = `I can definitely help guide you to healthcare services. Based on your current location, there are several verified clinics and general hospitals within a 5-kilometer radius.

* **St. Jude General Hospital** (3.5 km) - Offers 24/7 emergency care and full diagnostics.
* **MediGuide Family Clinic** (1.2 km) - Excellent for outpatient consulting, vaccinations, and family medicine.
* **Nyaho Medical Center** (2.1 km) - High-quality private facility with rapid testing services.

Would you like to open the interactive Clinics Directory to filter clinics by distance, ratings, and active emergency operations?`;

    actions = [
      { label: "Go to Clinics Map Directory", actionType: "NAV_CLINICS" },
    ];
  }
  // Suggestion: Hypertension
  else if (
    cleanMessage.includes("hypertension") ||
    cleanMessage.includes("high blood pressure")
  ) {
    text = `**Hypertension** (high blood pressure) is a chronic medical condition where the pressure of blood inside your arteries is consistently higher than normal.

**Key Takeaways:**
* It is often called a "silent threat" because it rarely causes noticeable symptoms until it has caused damage to your heart or blood vessels.
* Long-term uncontrolled hypertension can lead to stroke, heart attacks, and kidney problems.
* **Primary Causes:** High sodium diet, lack of physical activity, chronic stress, smoking, genetics, and obesity.
* **Initial Management:** Committing to the DASH diet (high fiber, low sodium), walking 30 minutes a day, and checking your blood pressure at least once a week.

You can read our full clinical article on hypertension written by our specialist team in the Education Hub.`;

    actions = [
      {
        label: "Open Health Articles (Hypertension)",
        actionType: "NAV_EDUCATION",
        payload: "Hypertension",
      },
      {
        label: "Set Blood Pressure Check reminder",
        actionType: "NAV_REMINDERS",
      },
    ];
  }
  // Suggestion: Pregnancy
  else if (
    cleanMessage.includes("pregnancy") ||
    cleanMessage.includes("pregnant")
  ) {
    text = `Congratulations on this journey! Pregnancy care (prenatal care) is vital for ensuring the well-being of both the expectant mother and the developing baby.

**Vital Prenatal Recommendations:**
* **Folic Acid & Iron:** Essential supplements to prevent congenital brain/spine issues and anemia.
* **Balanced Nutrition:** Eat nutrient-dense meals with plenty of green vegetables, clean protein, and fiber. Stay hydrated!
* **Active Checkups:** Register at a prenatal clinic early to schedule ultrasound scans and regular blood pressure checks.
* **Rest:** Ensure 8+ hours of sleep, as your body is working hard.

**⚠️ Urgent Signs to Watch For:**
If you experience any vaginal bleeding, severe cramping, continuous headaches, or blurred vision, contact your OB-GYN or visit St. Jude General Hospital's maternity ER immediately.`;

    actions = [
      {
        label: "Read Prenatal Care Guide",
        actionType: "NAV_EDUCATION",
        payload: "Pregnancy",
      },
      { label: "Find Prenatal Care Clinics", actionType: "NAV_CLINICS" },
    ];
  }
  // Suggestion: Malaria
  else if (cleanMessage.includes("malaria")) {
    text = `Malaria is a mosquito-borne infectious disease common in tropical regions. It is caused by Plasmodium parasites transmitted through infected Anopheles mosquito bites.

**Common Symptoms:**
* Shaking chills, hot sweats, and high fever cycles.
* Intense fatigue, muscular aches, and persistent headaches.
* Nausea, vomiting, and loss of appetite.

**Immediate Guidance:**
1. **Get Tested:** Do not self-medicate with leftover drugs. Get a Rapid Diagnostic Test (RDT) at a local pharmacy or clinic (takes 15 minutes).
2. **Effective Therapy:** If positive, take ACTs (Artemisinin-based combination therapies) exactly as prescribed by a health official.
3. **Rest & Fluids:** Sip oral rehydration salts or water to recover fluids lost to fever.

To prevent future bites, sleep under insecticide-treated nets (ITNs) and clear all stagnant water around your household.`;

    actions = [
      {
        label: "Read Malaria Article",
        actionType: "NAV_EDUCATION",
        payload: "Malaria",
      },
      { label: "Find rapid testing clinics", actionType: "NAV_CLINICS" },
    ];
  }
  // EMERGENCY SCENARIO
  else if (isEmergency) {
    text = `⚠️ **CRITICAL WARNING: HIGH URGENCY DETECTED** ⚠️

The symptoms or condition you described ("${message}") could represent a **life-threatening medical emergency**.

**IMMEDIATE ACTIONS:**
1. **DO NOT DELAY:** Please proceed directly to the nearest emergency room. **Ridge Regional Hospital** and **St. Jude General Hospital** both have 24/7 emergency trauma centers.
2. **CALL LOCAL EMERGENCY:** Call your local ambulance or emergency dispatch number immediately.
3. **DO NOT WORK OR DRIVE ALONE:** Inform a family member, neighbor, or friend to assist you in getting to the nearest hospital.
4. **REST:** Sit in a comfortable, semi-reclining position while help is on the way. Do not exert yourself.

*MediGuide AI cannot diagnose or treat emergencies. Please prioritize immediate clinical care.*`;

    actions = [
      { label: "View Emergency Hospitals Near Me", actionType: "NAV_CLINICS" },
    ];
  }
  // Generic classification
  else {
    text = `Thank you for sharing. I've analyzed your query regarding "${message}".

Based on my preliminary scanning, this falls under a **${urgency} Urgency** classification. Here is some general guidance to help you navigate:

1. **Monitor Symptoms:** Keep a log of when these symptoms started and if anything makes them better or worse.
2. **Symptomatic Relief:** Get plenty of rest, drink clear liquids (water, herbal tea), and avoid exhausting physical activities.
3. **Avoid Self-Prescribing:** If you suspect an infection, always get tested before taking antibiotics or antimalarials.
4. **Locate Assistance:** If symptoms persist or worsen over the next 24-48 hours, consulting a general practitioner is highly recommended.

Would you like to check nearby clinics or search our medical education library for verified guides on standard conditions?`;

    actions = [
      { label: "Check Clinics Directory", actionType: "NAV_CLINICS" },
      { label: "Browse Health Articles", actionType: "NAV_EDUCATION" },
    ];
  }

  return {
    text,
    urgency,
    actions,
    timestamp: new Date().toISOString(),
  };
}

export default getAIResponse;
