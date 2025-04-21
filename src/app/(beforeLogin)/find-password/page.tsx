"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 찾기 로직 구현
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">비밀번호 찾기</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className="text-sm text-gray-500">
              삼성라이온즈에 등록된 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
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
