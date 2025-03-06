"use client";

import React, { useState } from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import FeatureSection from "@/components/landing/FeatureSection";
import LoginModal from "@/components/landing/LoginModal";

export default function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginModalTab, setLoginModalTab] = useState<"company" | "developer">(
    "company",
  );

  const handleLoginClick = () => {
    setLoginModalTab("company");
    setShowLoginModal(true);
  };

  const handleSignupClick = () => {
    setLoginModalTab("company");
    setShowLoginModal(true);
  };

  const handleDeveloperClick = () => {
    setLoginModalTab("developer");
    setShowLoginModal(true);
  };

  const handleCompanyClick = () => {
    setLoginModalTab("company");
    setShowLoginModal(true);
  };

  return (
    <main className="min-h-screen bg-background">
      <Header
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />

      <HeroSection
        companyCtaText="For Companies"
        developerCtaText="For Developers"
        onCompanyClick={handleCompanyClick}
        onDeveloperClick={handleDeveloperClick}
      />

      <FeatureSection />

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          defaultTab={loginModalTab}
        />
      )}
    </main>
  );
}
