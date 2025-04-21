# granen32

Next.js와 TypeScript를 활용한 사용자 관리 웹 애플리케이션입니다.

## 기술 스택

- **프론트엔드**: Next.js, TypeScript, Tailwind CSS
- **개발 도구**: ESLint, Prettier
- **배포**: Docker, Jenkins(예정)

## 특징

- 모던하고 직관적인 UI 디자인
- 재사용 가능한 UI 컴포넌트 (버튼, 인풋, 텍스트에어리어 등)
- 모던 웹 개발 환경 설정 (TypeScript, ESLint, Prettier)
- Docker를 통한 배포 환경 구성

## 시작하기

### 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

### Docker로 실행하기

```bash
# Docker 이미지 빌드
docker-compose build

# Docker 컨테이너 실행
docker-compose up -d
```

## 프로젝트 구조

```
granen32/
├── src/
│   ├── app/            # 앱 라우터
│   ├── components/     # 컴포넌트
│   │   ├── ui/         # UI 컴포넌트
│   ├── lib/            # 유틸리티 함수
│   ├── styles/         # 스타일 관련 파일
├── public/             # 정적 파일
├── Dockerfile          # Docker 설정
├── docker-compose.yml  # Docker Compose 설정
├── .eslintrc.json      # ESLint 설정
├── .prettierrc         # Prettier 설정
├── tailwind.config.ts  # Tailwind CSS 설정
├── tsconfig.json       # TypeScript 설정
└── package.json        # 프로젝트 의존성
```

## 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.
