"use client";

import { CustomImage } from "@/components/ui/CustomImage";
import Logo from "@/assets/images/common/sasung_lions.png";
import Button from "@/components/ui/Button";
import { Stepper } from "@/components/ui/Stepper";

const STEPS = ["본인인증", "찾기완료"];

interface FindIdCompleteProps {
  onBack?: () => void;
}

export default function FindIdComplete({ onBack }: FindIdCompleteProps) {
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
      <Stepper steps={STEPS} currentStep={1} />

      {/* Main Content */}
      <div className="w-full rounded-lg border bg-white p-12 shadow-sm">
        <div className="w-full">
          <h2 className="heading-2 text-center">아이디 찾기가 완료되었습니다.</h2>
        </div>

        <p className="mt-8 text-center text-base">
          로그인하시면 다양한 이벤트를 확인하실 수 있습니다.
        </p>

        <ul className="mt-8 space-y-4">
          {[
            { id: "granen32", joinDate: "2025.03.10" },
            { id: "rbguddlfn", joinDate: "2025.03.10" },
          ].map((user) => (
            <li key={user.id} className="rounded-lg bg-[--checkbox-bg] p-6">
              <dl className="flex flex-col gap-4">
                <div className="flex justify-between text-[14px]">
                  <dt className="pr-5 text-[--font-light]">아이디</dt>
                  <dd className="font-medium">{user.id}</dd>
                </div>
                <div className="flex justify-between text-[14px]">
                  <dt className="text-[--font-light]">가입일</dt>
                  <dd className="font-medium">{user.joinDate}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <Button onClick={onBack} className="mt-8 bg-primary py-4 text-white hover:bg-primary/90">
          로그인하러가기
        </Button>

        {/* Footer */}
        <footer className="mt-10 space-y-2 border-t pt-8 text-sm ">
          <p>
            <strong>Copyright Samsung Lions. All Right Reserved.</strong>
          </p>
          <ul className="flex flex-col text-[14px] text-[--font-default]">
            <li>대구광역시 수성구 야구전설로 1</li>
            <li>대표이사 : 유정근 | 사업자 번호 : 504-81-03755</li>
            <li>개인정보 취급방침 관리자 : 삼성라이온즈</li>
          </ul>
        </footer>
      </div>
    </main>
  );
}
