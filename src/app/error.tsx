"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // 에러 로깅 서비스에 에러를 보고할 수 있습니다
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="heading-2 mb-4">문제가 발생했습니다</h2>
      <p className="mb-4 text-gray-600">
        {error.message || "페이지를 로드하는 중 오류가 발생했습니다."}
      </p>
      <button
        onClick={reset}
        className="bg-primary rounded px-4 py-2 text-white hover:bg-primary-dark"
      >
        다시 시도
      </button>
    </div>
  );
}
