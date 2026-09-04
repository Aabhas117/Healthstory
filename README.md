# AyuDrishti | AI-Powered Clinical History & OPD Triage Platform

> **Production-Ready Hospital Information System (HIS) & Clinical History Intake Workstation**  
> *Multi-Lingual AI-Assisted Clinical History Intake, OCR Document Extraction, and Doctor Triage Workstation.*

---

## 📌 Overview & Architecture

**AyuDrishti** is a enterprise-grade, multi-lingual clinical history collection and OPD triage platform designed for hospital outpatient departments (OPD). It streamlines patient intake via an accessible kiosk interface, extracts structured data from prescriptions/lab reports using OCR, identifies critical clinical red flags, and presents structured electronic health records (EHR) to attending physicians for rapid triage.

---

## 🎨 Modern Clinical Design System & Palette

AyuDrishti features a **Light Clinical Healthcare Palette** designed for high readability in hospital environments:

- **Primary Background**: Pure White (`#FFFFFF`) & Light Clinical Blue (`#F5FAFC`)
- **Card & Surface**: Soft Blue-Gray (`#EEF6F9`)
- **Primary Brand Accent**: Clinical Teal (`#20B8C8`)
- **Secondary Brand Accent**: Healthcare Blue (`#2499D6`)
- **Typography & Structure**: Dark Hospital Navy (`#17324D`) & Clinical Slate (`#536B7D`)
- **Subtle Borders**: Soft Clinical Border (`#DCEAF0`)

---

## 🔒 Clinical Governance & Safety Principles

> [!IMPORTANT]
> **Strict Non-Diagnostic AI Safety Controls**:
> 1. **Non-Diagnostic Role**: The AI assistant strictly collects and synthesizes clinical history; it does **NOT diagnose** patients.
> 2. **Compliant Terminology**: All extracted insights use compliant phrasing (*"AI-generated summary"*, *"Potential red flag detected"*, *"Requires clinical review"*).
> 3. **Physician Supervision**: AI-extracted fields remain in a *"Pending Verification"* state until explicitly accepted, edited, or verified by the attending physician.

---

## 🏥 Core Platform Modules

### 1. Patient Intake Kiosk (`/patient/*`)
- **`/patient/welcome`**: Accessible touch kiosk welcome screen.
- **`/patient/language`**: Multi-lingual selection (Hindi & English).
- **`/patient/identify`**: Patient registration & ABHA ID integration.
- **`/patient/consent`**: Digital consent under ABDM M2/M3 & DPDP Act guidelines.
- **`/patient/interview`**: Interactive voice & touch questionnaire with real-time speech transcript and symptom chips.
- **`/patient/documents`**: Medical prescription & lab report OCR scanner.
- **`/patient/review`**: Sectional intake summary preview with inline edit options.
- **`/patient/complete`**: Queue token ticket (`TK-402`) with estimated wait times and OPD zone instructions.

### 2. Doctor Triage Workstation (`/doctor/*`)
- **`/doctor/dashboard`**: Triage queue management with real-time KPI metrics, search/filters, priority badges (`HIGH`, `MEDIUM`, `LOW`), and patient queue status.
- **`/doctor/patient/:id`**: Complete EHR Case Sheet with:
  - Red Flag Alert Panel (e.g. *Chest Pain + Breathlessness + Sweating* cluster warning)
  - Interactive AI Field verification (`Accept`, `Edit`, `Reject`)
  - Doctor Verification Modal for rationale entry
  - Interactive Evidence Drawer for viewing source OCR document snippets
  - Filterable Clinical Timeline (Symptoms, Labs, Medications, History)
  - AYUSH Profile (Prakriti classification & Ayurvedic treatments)

### 3. System Governance & Admin Console (`/admin/*`)
- **`/admin`**: System analytics dashboard with real-time throughput metrics and Recharts visualization.
- **`/admin/audit`**: Consent and ABDM security audit trail stream.
- **`/admin/models`**: Clinical LLM configuration (`MedLLM-v3.4-Clinical-India`), prompt guardrails, and temperature sliders.
- **`/admin/integrations`**: ABDM M2/M3, HIS, EMR, Pathology Lab, and Pharmacy gateway connectors.

---

## 🖼️ Centralized Icon Architecture & Brand Mark

- **Custom SVG Favicon**: Modern geometric emblem combining a stylized letter "A" (`#20B8C8`) with a precision medical cross (`#2499D6`) on a clean white background ([`public/favicon.svg`](file:///c:/Users/aabha/Documents/Healthstory/client/public/favicon.svg)).
- **Centralized Icons**: Unified icon engine built with `createIcon()` abstraction in [`src/lib/icons.jsx`](file:///c:/Users/aabha/Documents/Healthstory/client/src/lib/icons.jsx) providing 35+ lightweight SVG icon components.

---

## 📂 Repository Structure

```text
Healthstory/
├── client/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── public/
│   │   └── favicon.svg               # AyuDrishti Clinical Brand Favicon
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                   # Route Configuration (14 routes)
│       ├── index.css                 # Clinical Tailwind Design Tokens
│       ├── lib/
│       │   ├── icons.jsx             # Centralized SVG Icon Components
│       │   ├── router.jsx            # Routing Abstraction
│       │   ├── recharts.jsx          # SVG Analytics Charts
│       │   ├── react-hook-form.js    # Form Handling Utility
│       │   └── zustand.js            # State Management Store Creator
│       ├── data/                     # Mock Clinical Data & Dictionaries
│       ├── services/                 # API Abstraction & Async Services
│       ├── store/                    # State Stores (Patient, Doctor, Admin, Theme)
│       ├── components/               # Common, Patient, and Doctor Components
│       ├── layouts/                  # Patient, Doctor, and Admin Layout Wrappers
│       └── pages/                    # Patient Kiosk, Doctor Workstation, Admin Pages
└── README.md
```

---

## 🛠️ Quick Start

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📜 Standards & Compliance
- **Healthcare Standard**: ABDM M2/M3 (Ayushman Bharat Digital Mission) Compliant Workflow
- **Data Privacy**: DPDP Act 2023 Principles
- **UX Target**: High-Contrast Hospital Kiosk & Physician Triage Workstation