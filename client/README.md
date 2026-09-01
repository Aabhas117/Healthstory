# AyuDrishti | AI-Powered Clinical History Platform (SIH 2026)

> **Hospital Information System (HIS) & AI Clinical History Intake Workstation**  
> *Built for Smart India Hackathon (SIH 2026) — Problem Statement: Multi-lingual AI-Assisted Clinical History Intake & Triage Kiosk.*

---

## 📌 Executive Summary & Objectives

**AyuDrishti** is a multi-lingual, accessible, kiosk-driven clinical history collection platform designed for outpatient departments (OPD) in hospitals. It uses simulated AI voice interactions and medical document OCR scanning to pre-fill patient health records, identify potential clinical red flags, and present structured electronic health records (EHR) to attending physicians for rapid triage.

---

## 🔒 Mandatory Clinical & UX Safety Principles

> [!IMPORTANT]
> **Strict Non-Diagnostic AI Governance Rules**:
> 1. **No Medical Diagnosis**: The AI assistant is **NOT a doctor** and **NEVER provides a diagnosis**.
> 2. **Clinical Terminology**: All AI outputs strictly use compliant language: *"AI-generated summary"*, *"Potential red flag detected"*, *"Requires clinical review"*.
> 3. **Physician Supervision**: All AI-extracted fields remain in a *"Pending Verification"* state until explicitly accepted, edited, or validated by the attending doctor.

---

## 🏥 Product Portals & Feature Architecture

### 1. Patient Intake Kiosk Flow (`/patient/*`)
Mobile-first, touch-friendly, high-contrast, multi-lingual kiosk interface:
- **`/patient/welcome`**: Kiosk landing screen with quick launcher for demo scenario.
- **`/patient/language`**: High-contrast language selection supporting **Hindi (हिंदी)** and **English**.
- **`/patient/identify`**: Patient registration pre-filled with ABHA ID (Ayushman Bharat Health Account).
- **`/patient/consent`**: Digital consent for data privacy under ABDM M2/M3 and DPDP Act 2023 guidelines.
- **`/patient/interview`**: Voice & touch adaptive questionnaire featuring:
  - Microphone recording button with active state indicator.
  - Real-time simulated Hindi/English speech-to-text transcript.
  - Selectable symptom chips (Chest Pain, Breathlessness, Sweating, Fever, Cough, Headache).
- **`/patient/documents`**: Drag-and-drop prescription & lab report upload with simulated OCR scanner beam.
- **`/patient/review`**: Sectional summary preview with inline edit buttons before submission.
- **`/patient/complete`**: Queue token ticket screen (`TK-402`) with estimated wait time and OPD waiting zone instructions.

---

### 2. Doctor Triage Workstation (`/doctor/*`)
Data-dense clinical workstation for attending physicians:
- **`/doctor/dashboard`**:
  - **Clinical KPI Cards**: Waiting Patients (12), Pending Reviews (4), Potential Red Flags (2), Completed Consultations (8).
  - **Patient Search & Filters**: Search by name or chief complaint; filter by Priority (`HIGH`, `MEDIUM`, `LOW`) and Status (`Waiting`, `In Consultation`, `Completed`).
  - **Responsive Queue Table**: Displays Token, Patient Name, Age/Gender, Complaint, Wait Time, Priority, and View action.
- **`/doctor/patient/:id` (Electronic Health Record Case Sheet)**:
  - **EHR Header Banner**: Patient Name, Age, Gender, ABHA ID, Encounter ID, Priority Badge, and Print/Export actions.
  - **Red Flag Panel**: Highlights triple symptom clusters (*Chest Pain + Breathlessness + Sweating*) for immediate triage.
  - **AI Clinical Fields & Verification Controls**: Reusable `ClinicalField` components with `ConfidenceBadge`, `EvidenceBadge`, and **Accept / Edit / Reject** actions.
  - **Doctor Verification Modal**: Modal interface allowing physicians to correct AI values with a mandatory clinical rationale text.
  - **Clinical Timeline**: Chronological event tracker with category filters (`All`, `Symptoms`, `Medications`, `Labs`, `History`) linked to source documents.
  - **Laboratory Results**: Test values, units, reference ranges, and status badges (`High`, `Low`, `Normal`).
  - **Medications & Allergies**: Structured medications table and prominent Penicillin allergy warning panel.
  - **AYUSH Profile**: Prakriti classification (Pitta-Kapha), herbal medicines, Ayurvedic treatments, and dietary practices.
  - **Evidence Drawer**: Slide-out panel for viewing OCR document scans and highlighted text snippets.

---

### 3. System Governance & Admin Console (`/admin/*`)
Enterprise clinical administration dashboard:
- **`/admin`**: System metrics (Active Patients, Documents Processed, AI Fields Generated, Doctor Corrections, Potential Red Flags) and hourly throughput charts using Recharts.
- **`/admin/audit`**: ABDM consent and security audit trail stream.
- **`/admin/models`**: LLM engine selector (`MedLLM-v3.4-Clinical-India`), temperature & token sliders, system prompt guardrails.
- **`/admin/integrations`**: Mock status toggles for ABDM M2/M3, Hospital Information System (HIS), EMR, Pathology Lab, and OPD Pharmacy gateways.

---

### 4. Portal Selector Landing (`/`)
- Central launcher hub providing instant entry to Patient Kiosk, Doctor Workstation, and Admin Console.

---

## 🎯 Demo Scenario Data (Rajesh Kumar)

| Clinical Field | Record Details |
| :--- | :--- |
| **Patient Name** | Rajesh Kumar |
| **Age / Gender** | 46 years / Male |
| **Language** | Hindi (हिंदी) |
| **ABHA ID** | `91-4829-1029-4821` |
| **Token Number** | `TK-402` |
| **Chief Concern** | Chest pain for 3 days |
| **Symptom Cluster** | Chest pain + Breathlessness + Sweating |
| **Clinical Alert** | 🚨 **Potential Red Flag Detected** (Requires urgent clinical review) |
| **Past History** | Essential Hypertension (2 years) |
| **Current Medication** | Amlodipine 5 mg once daily |
| **Documented Allergy** | Penicillin (Severe Anaphylactic Skin Rash) |
| **Lab Findings** | Hemoglobin 9.2 g/dL (Low), Blood Pressure 148/92 mmHg (High) |
| **AYUSH Prakriti** | Pitta-Kapha (Arjuna Ksheerapaka & Sarpagandha 250mg) |

---

## 🎨 Design System & Dual Theme Engine

- **Primary Color**: Medical Blue (`#0284c7` / `sky-600`) for active tabs and primary buttons.
- **Secondary Color**: Healthcare Teal (`#0d9488` / `teal-600`) for clinical metadata.
- **Light Theme**: White surfaces (`bg-white`), cool light gray background (`bg-slate-50`), dark navy text (`text-slate-900`).
- **Dark Theme**: Deep navy background (`bg-slate-950`), slate surfaces (`bg-slate-900`), light text (`text-slate-100`).
- **Theme Persistence**: Synced with `localStorage` (`ayudrishti_theme`) and toggled via Sun/Moon button in the header.

---

## 📂 Project Directory Structure

```text
c:\Users\aabha\Documents\Healthstory\client\
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                       # 14 Routes Router Configuration
    ├── index.css                     # Tailwind CSS & Clinical Tokens
    ├── lib/
    │   ├── icons.jsx                 # Lucide SVG Icon Components
    │   ├── router.jsx                # Client-Side Routing Abstraction
    │   ├── recharts.jsx              # Responsive SVG Charting Engine
    │   ├── react-hook-form.js        # Form Hook Utility
    │   └── zustand.js                # State Store Creator
    ├── data/
    │   ├── mockPatients.js           # Rajesh Kumar & Queue Data
    │   ├── translations.js           # Hindi & English Dictionary
    │   ├── mockQuestions.js          # Adaptive Interview Trees
    │   └── mockSystem.js             # Admin & Integration Mocks
    ├── services/
    │   ├── mockApi.js                # Async Backend Simulation
    │   └── api.js                    # Component Service Abstraction Layer
    ├── store/
    │   ├── usePatientStore.js        # Active Kiosk Session Store
    │   ├── useDoctorStore.js         # Triage Queue & Doctor Notes Store
    │   ├── useAdminStore.js          # Admin Metrics & Model Store
    │   └── useThemeStore.js          # Light/Dark Theme Store (localStorage)
    ├── components/
    │   ├── common/
    │   │   ├── Header.jsx            # Top Bar with Theme & Language Toggles
    │   │   ├── Sidebar.jsx           # Workstation Left Navigation Sidebar
    │   │   ├── Footer.jsx            # Clinical Disclaimer Banner
    │   │   ├── ProgressBar.jsx       # Patient Step Tracker Bar
    │   │   ├── LoadingSpinner.jsx    # Async Spinner Indicator
    │   │   ├── EmptyState.jsx        # Data Placeholder Card
    │   │   ├── PageHeader.jsx        # Workstation Page Title Header
    │   │   └── StatusBadge.jsx       # Semantic Clinical Status Pills
    │   ├── patient/
    │   │   ├── KioskButton.jsx       # Accessible Touch Button
    │   │   ├── RedFlagBanner.jsx     # Emergency Alert Warning Card
    │   │   ├── VoiceWaveAnimation.jsx# Active Mic State Indicator
    │   │   └── ScannerAnimation.jsx  # OCR Processing Indicator
    │   └── doctor/
    │       ├── ClinicalField.jsx     # AI Field with Confidence & Verification
    │       ├── DoctorVerificationModal.jsx # Field Editing & Rationale Modal
    │       ├── EvidenceDrawer.jsx    # OCR Document Viewer Drawer
    │       └── ClinicalTimeline.jsx  # Event Timeline with Filters
    ├── layouts/
    │   ├── PatientLayout.jsx         # Kiosk Page Wrapper
    │   ├── DoctorLayout.jsx          # Workstation Sidebar Wrapper
    │   └── AdminLayout.jsx           # Governance Sidebar Wrapper
    └── pages/
        ├── Home.jsx                  # Portal Launcher Hub
        ├── patient/                  # 8 Kiosk Steps (Welcome to Complete)
        ├── doctor/                   # Doctor Dashboard & Patient Detail
        └── admin/                    # Admin Overview, Audit, Models, Integrations
```

---

## 🛠️ How to Run locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

---

## 📜 License & Acknowledgments
- **Event**: Smart India Hackathon (SIH 2026)
- **Domain**: AI-Powered Healthcare Intake & Clinical Decision Support Systems
