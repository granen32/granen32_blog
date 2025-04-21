"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CustomImage } from "@/components/ui/CustomImage";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        router.push("/main");
        router.refresh();
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <CustomImage
            src="/images/granen32-logo.png"
            alt="granen32 Logo"
            width={120}
            height={60}
            className="mb-4"
          />
          <h1 className="heading-2">블루 멤버십 LOUNGE</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3"
          />
          <div className="relative">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <CustomImage src="/images/eye-icon.png" alt="Show password" width={20} height={20} />
            </button>
          </div>
          <Button
            type="submit"
            className="w-full rounded-lg bg-[#1428A0] py-3 text-white hover:bg-[#1428A0]/90"
            disabled={isLoading}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 rounded border-gray-300"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              아이디 저장
            </label>
            <div className="flex space-x-4">
              <Link href="/find-id" className="hover:text-[#1428A0]">
                아이디 찾기
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/find-password" className="hover:text-[#1428A0]">
                비밀번호 찾기
              </Link>
              <span className="text-gray-300">|</span>
              <Link href="/signup" className="hover:text-[#1428A0]">
                회원가입
              </Link>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-8 flex w-full max-w-md items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="mx-4 text-sm text-gray-500">또는</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>
      <div className="mt-4 w-full max-w-md">
        <Button
          type="button"
          variant="outline"
          className="w-full rounded-lg border border-gray-300 bg-white py-3 text-gray-700 hover:bg-gray-50"
        >
          회원가입
        </Button>
      </div>
    </div>
  );
}
