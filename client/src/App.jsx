import React from 'react';
import { BrowserRouter, Routes, Route } from './lib/router.jsx';

// Home Portal Selector
import { Home } from './pages/Home.jsx';

// Patient Kiosk Flow Pages
import { WelcomeStep } from './pages/patient/WelcomeStep.jsx';
import { LanguageStep } from './pages/patient/LanguageStep.jsx';
import { IdentifyStep } from './pages/patient/IdentifyStep.jsx';
import { ConsentStep } from './pages/patient/ConsentStep.jsx';
import { InterviewStep } from './pages/patient/InterviewStep.jsx';
import { DocumentsStep } from './pages/patient/DocumentsStep.jsx';
import { ReviewStep } from './pages/patient/ReviewStep.jsx';
import { CompleteStep } from './pages/patient/CompleteStep.jsx';

// Doctor Portal Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard.jsx';
import { PatientDetail } from './pages/doctor/PatientDetail.jsx';

// Admin Governance Pages
import { AdminOverview } from './pages/admin/AdminOverview.jsx';
import { AdminAudit } from './pages/admin/AdminAudit.jsx';
import { AdminModels } from './pages/admin/AdminModels.jsx';
import { AdminIntegrations } from './pages/admin/AdminIntegrations.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Portal Switcher */}
        <Route path="/" element={<Home />} />

        {/* Patient Intake Flow */}
        <Route path="/patient/welcome" element={<WelcomeStep />} />
        <Route path="/patient/language" element={<LanguageStep />} />
        <Route path="/patient/identify" element={<IdentifyStep />} />
        <Route path="/patient/consent" element={<ConsentStep />} />
        <Route path="/patient/interview" element={<InterviewStep />} />
        <Route path="/patient/documents" element={<DocumentsStep />} />
        <Route path="/patient/review" element={<ReviewStep />} />
        <Route path="/patient/complete" element={<CompleteStep />} />

        {/* Doctor Triage Portal */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patient/:id" element={<PatientDetail />} />

        {/* Admin System Governance */}
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/audit" element={<AdminAudit />} />
        <Route path="/admin/models" element={<AdminModels />} />
        <Route path="/admin/integrations" element={<AdminIntegrations />} />

        {/* Fallback Wildcard */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
