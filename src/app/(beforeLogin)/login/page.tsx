"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
        router.push("/home");
        router.refresh();
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">블루 멤버십 LOUNGE</h1>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="아이디를 입력해주세요"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="text-primary focus:ring-primary h-4 w-4 rounded border-gray-300"
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              />
              <span className="ml-2 text-sm text-gray-600">아이디 저장</span>
            </label>
            <div className="text-sm">
              <Link href="/find-password" className="text-primary hover:text-primary-dark">
                비밀번호 찾기
              </Link>
            </div>
          </div>
          <div className="space-y-3">
            <Button type="submit" fullWidth disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>
            <Button type="button" variant="outline" fullWidth>
              회원가입
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>테스트 계정: test@example.com / password123</p>
          </div>
        </form>
      </div>
    </div>
  );
}
