"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomLink from "@/components/ui/CustomLink";
import { CustomImage } from "@/components/ui/CustomImage";
import Logo from "@/assets/images/common/sasung_lions.png";
import MainBanner from "@/assets/images/main/main_banner.png";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "test@example.com",
    password: "password123",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      errors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "올바른 이메일 형식을 입력해주세요";
    }

    if (!formData.password) {
      errors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 6) {
      errors.password = "비밀번호는 6자 이상이어야 합니다";
    }

    setValidationErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      if (result?.ok) {
        router.push("/main");
        router.refresh();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-10">
      <div className="relative w-[460px] px-8">
        <div className="mb-10">
          <h1 className="sr-only">블루 멤버십 LOUNGE</h1>
          <CustomImage src={Logo} alt="logo" width={126} height={80} priority />
        </div>
        <div className="items-left justify-left flex max-w-[340px] flex-col">
          <div className="text-left">
            <h2 className="heading-2">
              블루 멤버십 <span className="font-[300]">LOUNGE</span>
            </h2>
          </div>
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="아이디를 입력해주세요."
                  value={formData.email}
                  // defaultValue="test@example.com"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  aria-label="이메일"
                  className={validationErrors.email ? "border-red-500" : ""}
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={formData.password}
                  // defaultValue="password123"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  aria-label="비밀번호"
                  className={validationErrors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                )}
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="relative w-full justify-center"
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  로그인 중...
                </span>
              ) : (
                "로그인"
              )}
            </Button>
            <div className="mt-5 flex items-center justify-between">
              <Checkbox
                checked={formData.rememberMe}
                onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                className="text-[12px]"
                label="아이디 저장"
              />
              <div className="flex items-center text-[12px] text-[--font-dark] ">
                <CustomLink href="/findid" className="hover:text-primary-dark hover:underline">
                  아이디 찾기
                </CustomLink>
                <div className="mx-2 h-3 w-[1px] bg-[--checkbox-border]" />
                <CustomLink
                  href="/findpassword"
                  className="hover:text-primary-dark hover:underline"
                >
                  비밀번호 찾기
                </CustomLink>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-5">
              <Button type="submit" variant="secondary" className="relative w-full justify-center">
                회원가입
              </Button>
              <div className="flex items-center justify-between gap-2 text-[14px]">
                <span className="text-[--font-default]">장기미접속 회원이신가요?</span>
                <ul className="flex gap-2">
                  {[
                    { href: "/account-activation", text: "계정 활성화" },
                    { href: "/privacy-policy", text: "개인정보처리방침" },
                  ].map((link) => (
                    <li key={link.href}>
                      <CustomLink href={link.href} className="underline">
                        {link.text}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="relative ml-10 h-[832px] w-[550px] min-w-[460px] overflow-hidden rounded-lg bg-[conic-gradient(from_130deg_at_43%_62.65%,#030813_0deg,#06325E_360deg)] px-[42px] py-[46px]">
        <div className="absolute -bottom-[2px] -right-[1px]">
          <CustomImage
            src={MainBanner}
            alt="main banner"
            width={460}
            height={544}
            priority
            objectFit="cover"
          />
        </div>
        <h2 className="heading-2 font-[400] text-white">
          <b>
            블루멤버십만 있으면
            <br />
            경기 예약도 편하게
          </b>
        </h2>
        <p className="text-[20px] font-[400] leading-8 text-white text-white">
          라이온즈 팬을 위한 블루멤버십으로
          <br /> 재탄생했습니다.
        </p>
      </div>
    </div>
  );
}
