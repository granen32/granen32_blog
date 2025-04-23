"use client";

import { CustomImage } from "@/components/ui/CustomImage";
import Logo from "@/assets/images/common/sasung_lions.png";
import Button from "@/components/ui/Button";
import { useState } from "react";
import FindIdComplete from "./FindIdComplete";
import { Stepper } from "@/components/ui/Stepper";

const STEPS = ["본인인증", "찾기완료"];

export default function FindId() {
  const [currentStep, setCurrentStep] = useState(0);

  const handlePhoneAuth = () => {
    // TODO: 실제 인증 로직 구현
    setCurrentStep(1);
  };

  if (currentStep === 1) {
    return <FindIdComplete onBack={() => setCurrentStep(0)} />;
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center justify-start gap-12 pt-20">
      {/* Logo */}
      <CustomImage
        src={Logo}
        alt="Samsung Lions Logo"
        width={126}
        height={80}
        priority
        loading="eager"
      />

      {/* Stepper */}
      <Stepper steps={STEPS} currentStep={currentStep} />

      {/* Main Content */}
      <div className="w-full rounded-lg border bg-white p-12 shadow-sm">
        <h2 className="heading-2 text-center">아이디 찾기</h2>

        <div className="mt-10 grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={handlePhoneAuth}
            className="btext-smrtext-gray-600-3 group h-[72px] min-w-[60px] font-medium hover:bg-[#F8F9FD] data-[state=active]:bg-[#F8F9FD]"
          >
            <div className="justify-s art flex w-full items-center">
              <svg className="mr-2 h-5 w-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span>휴대폰 인증</span>
            </div>
          </Button>
          <Button
            variant="outline"
            onClick={() => {}}
            className="group h-[72px] min-w-[60px] border border-[#DFE1E6] bg-white p-3 font-medium hover:bg-white"
          >
            <div className="flex w-full items-center justify-start">
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>아이핀 인증</span>
            </div>
          </Button>
        </div>

        {/* Notice Text */}
        <div className="mt-8 space-y-4 text-[14px] text-[--font-default]">
          <p>* 실명인증에 실패하시는 분은 크롬 브라우저를 설치하여 진행하시기 바랍니다.</p>
          <p>
            * 삼성라이온즈는 실명제 정책을 시행하고 있습니다. 입력하신 정보는 더 나은 서비스를
            제공하는 데 중요한 자료로 활용되며 개인정보처리방침에 따라 보호됩니다.
          </p>
        </div>

        <div className="mt-6 text-[14px] text-[--font-default]">
          <p>삼성라이온즈는 실명제 정책을 시행하고 있습니다.</p>
          <p>실명인증을 통한 아이디 찾기로 강화된 보안을 적용합니다.</p>
        </div>
      </div>
    </main>
  );
}
