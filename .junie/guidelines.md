# Jiyoon App Project Guidelines

## Project Overview

프로젝트 개요
지윤 앱은 Electron을 기반으로 React와 TypeScript로 개발된 데스크톱 애플리케이션입니다. 심리 전문가들이 다양한 활동을 기록하고 관리할 수 있도록 설계되었으며, 다음과 같은 항목들을 종합적으로 관리하는 시스템입니다.

- 심리 검사
- 개인 치료 세션
- 집단 치료 세션
- 학술 활동
- 연구 출판물
- 기타 전문 활동

이 애플리케이션은 사용자들이 자신의 전문 활동을 기록, 추적, 시각화할 수 있게 하여 자격증, 보수 교육, 또는 전문성 개발 목적으로 활용될 수 있습니다.
사용자 인터페이스가 한국어로 되어 있어 주요 대상은 한국의 심리 전문가들입니다.

## Project Structure

프로젝트는 일반적인 Electron 애플리케이션 구조를 따릅니다.

```
jiyoon-app/
├── .junie/              # Junie guidelines
├── dist/                # Distribution files
├── out/                 # Output files
├── prisma/              # Prisma ORM files and database schema
├── resources/           # Application resources
└── src/                 # Source code
    ├── main/            # Electron main process
    │   ├── academic-activity/
    │   ├── assessment/
    │   ├── group-therapy/
    │   ├── individual-therapy/
    │   ├── other-activity/
    │   ├── prisma/
    │   ├── research/
    │   └── test/
    ├── preload/         # Electron preload scripts
    ├── renderer/        # React application (renderer process)
    │   └── src/
    │       ├── component/   # Reusable UI components
    │       ├── data/        # Data-related files
    │       ├── helpers/     # Helper functions
    │       ├── hook/        # Custom React hooks
    │       ├── i18n/        # Internationalization
    │       ├── pages/       # Application pages
    │       └── type/        # TypeScript type definitions
    └── shared/          # Shared code between processes
        ├── constants/
        └── types/
```

### 주요 파일 및 디렉토리

- **package.json**: 프로젝트 의존성 및 스크립트
- **prisma/schema.prisma**: 데이터베이스 스키마 정의
- **src/main/**: Electron 메인 프로세스 코드
- **src/renderer/**: React 애플리케이션
- **src/shared/**: 메인 및 렌더러 프로세스 간 공유 코드

## 데이터베이스 스키마
이 애플리케이션은 Prisma ORM과 SQLite를 사용합니다. 데이터베이스 스키마에는 다음 모델들이 포함됩니다.

- **AssessmentLog**: 심리 검사 기록
- **IndividualTherapyLog**: 개인 치료 세션 기록
- **GroupTherapyLog**: 집단 치료 세션 기록
- **AcademicActivityLog**: 학술 활동 기록
- **ResearchLog**: 연구 출판물 기록
- **OtherActivityLog**: 기타 전문 활동 기록

각 모델에는 날짜, 시간 및 기타 관련 정보를 추적하는 필드와 함께 "usable" 플래그, 생성 및 수정 타임스탬프 필드가 포함됩니다.

## Build and Development

### Prerequisites

- Node.js and npm
- Prisma CLI

### Development

개발 서버를 시작하려면 다음 명령어를 사용하세요.

```bash
npm run dev
```

이 명령어는 다음 작업을 수행합니다.
1. Generates Prisma client
2. Starts the Electron development server

### Building

애플리케이션을 빌드하려면 다음 명령어를 사용하세요.

```bash
npm run build
```

이 명령어는 다음 작업을 수행합니다.

- 타입 검사 실행
- 출력 디렉토리 정리
- Prisma 클라이언트 생성
- electron-vite로 애플리케이션 빌드

To build for specific platforms:

- Windows: `npm run build:win`
- macOS: `npm run build:mac`
- Linux: `npm run build:linux`

### 데이터베이스 마이그레이션

데이터베이스 마이그레이션을 실행하려면:

```bash
npm run prisma-migration
```

## 코드 스타일 및 품질

프로젝트는 다음을 사용합니다.

- ESLint (린팅)
- Prettier (코드 포맷팅)
- TypeScript (타입 검사)

코드 포맷을 맞추려면:

```bash
npm run format
```

코드를 린팅하려면:

```bash
npm run lint
```

타입 검사를 실행하려면:

```bash
npm run typecheck
```

## 테스트
프로젝트에 공식적인 테스트 설정은 없는 것으로 보입니다. 프로젝트 디렉토리에서 테스트 파일이 발견되지 않았고, `package.json` 에도 테스트 관련 스크립트가 없습니다.

## Workflow Guidelines for Junie

이 프로젝트에서 작업할 때는 다음 가이드라인을 준수해야 합니다:

1.  **구조 이해**: Electron, React, TypeScript 기반의 아키텍처에 익숙해져야 합니다.
2.  **기존 패턴 준수**: 현재의 코드 구성 및 패턴을 유지하여 일관성을 지켜야 합니다.
3.  **타입 안전성 확인**: 타입 안전성을 유지해야 합니다.
4.  **코드 포맷팅**: 일관된 코드 스타일을 유지해야 합니다.
5.  **한국어 사용자 고려**: 애플리케이션이 한국어 사용자를 위해 설계되었음을 항상 염두에 두어야 합니다.

변경 사항을 적용할 때 유의할 점:

- 데이터베이스 스키마 변경 시, Prisma 마이그레이션에 정확히 반영되었는지 확인해야 합니다.
- UI에 적용된 반응형 디자인 접근법을 유지해야 합니다.
- 기존 컴포넌트 구조 및 명명 규칙을 따라야 합니다.
- Electron의 메인 프로세스와 렌더러 프로세스 분리에 주의해야 합니다.
- typescript 에서 함수가 어떤 값을 반환할 때에는 가능할 경우 반드시 타입 선언을 해야 합니다
-
