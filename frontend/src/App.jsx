import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LearnerProvider } from './context/LearnerContext';
import { BookmarkProvider } from './context/BookmarkContext';
import MainLayout from './layouts/MainLayout';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import Round1MCQPage from './pages/Round1MCQPage';
import QuizRunnerPage from './pages/QuizRunnerPage';
import QuizResultPage from './pages/QuizResultPage';
import MockTestsPage from './pages/MockTestsPage';
import Round2CodingSqlPage from './pages/Round2CodingSqlPage';
import CodingIDEPage from './pages/CodingIDEPage';
import Round4InterviewPage from './pages/Round4InterviewPage';
import StudyLibraryPage from './pages/StudyLibraryPage';
import CheatSheetsPage from './pages/CheatSheetsPage';
import ResearchPage from './pages/ResearchPage';
import MistakeNotebookPage from './pages/MistakeNotebookPage';
import AnalyticsPage from './pages/AnalyticsPage';
import PlanPage from './pages/PlanPage';
import BookmarksPage from './pages/BookmarksPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <LearnerProvider>
      <BookmarkProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Authenticated / Anonymous Shell Routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/round-1" element={<Round1MCQPage />} />
              <Route path="/quiz" element={<QuizRunnerPage />} />
              <Route path="/quiz/run" element={<QuizRunnerPage />} />
              <Route path="/quiz/result" element={<QuizResultPage />} />
              <Route path="/quiz/result/:attemptId" element={<QuizResultPage />} />
              <Route path="/mocks" element={<MockTestsPage />} />
              
              {/* Module B: Round 2 - JavaScript Coding & SQL Practice */}
              <Route path="/round-2" element={<Round2CodingSqlPage />} />
              <Route path="/round-3" element={<Navigate to="/round-2" replace />} />
              <Route path="/coding" element={<CodingIDEPage />} />
              <Route path="/coding/:problemId" element={<CodingIDEPage />} />

              {/* Module C: Technical Interview */}
              <Route path="/round-4" element={<Round4InterviewPage />} />
              <Route path="/technical-interview" element={<Round4InterviewPage />} />

              {/* Study & Evidence */}
              <Route path="/study" element={<StudyLibraryPage />} />
              <Route path="/study/:slug" element={<StudyLibraryPage />} />
              <Route path="/cheat-sheets" element={<CheatSheetsPage />} />
              <Route path="/research" element={<ResearchPage />} />

              {/* Personal Reviews */}
              <Route path="/mistakes" element={<MistakeNotebookPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/plan" element={<PlanPage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </BookmarkProvider>
    </LearnerProvider>
  );
}
