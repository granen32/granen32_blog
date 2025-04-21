"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function FindIdPage() {
  const [findType, setFindType] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 아이디 찾기 로직 구현
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">아이디 찾기</h1>
        <div className="mb-6 flex rounded-md">
          <button
            className={`flex-1 rounded-l-md px-4 py-2 text-sm font-medium ${
              findType === "phone" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFindType("phone")}
          >
            휴대폰 인증
          </button>
          <button
            className={`flex-1 rounded-r-md px-4 py-2 text-sm font-medium ${
              findType === "email" ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
            }`}
            onClick={() => setFindType("email")}
          >
            이메일 인증
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type={findType === "phone" ? "tel" : "email"}
              placeholder={
                findType === "phone" ? "휴대폰 번호를 입력하세요" : "이메일을 입력하세요"
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500">
              * 회원가입 시 등록하신 {findType === "phone" ? "휴대폰 번호" : "이메일"}로 인증번호가
              발송됩니다.
            </p>
            <Button type="submit" fullWidth>
              다음으로
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
