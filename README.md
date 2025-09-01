# 지윤 앱 프로젝트 가이드라인

## 통계 목표치

### 기준
```md
🌳 임상심리전문가 수련요건 (총 3,000시간 / 3년)
│
├── 🧠 *심리평가 총 시간* (필수: 300시간 이상)
│   ├── 📊 종합심리평가 (필수: 30례 이상)
│   └── 🧠 신경심리평가 (선택: 최대 50% 인정)
│
├── 💚 심리치료 (필수: 300시간 이상)
│   ├── ⏳ 주치료자 시간 (필수: 100시간 이상)
│   └── 👥 주치료자 사례 (필수: 10례 이상)
│
├── 🎓 학술활동 참석
│   ├── 🗣️ 학술회의 참석 (필수: 30시간 이상)
│   ├── 👨‍🏫 사례회의 참석 (필수: 10시간 이상)
│   └── 📜 윤리교육 참석 (필수: 1회 이상)
│
├── 📝 연구/발표
│   ├── ✒️ 연구논문 (필수: 제1저자 1편, A급 학술지)
│   └── 🎤 사례발표 (필수: 2회)
│       ├── 📄 학회/지회/연구회 사례발표 2회
│       └── 📄 학회/지회/연구회 사례발표 1회 + 논문발표(포스터/구연) 1회
│
├─── 🤝 대외협력 지원 사업 (필수: 30시간 이상)
│
└─── ✨ 기타 수련 활동 (선택)


🌳 연차별 기간
│
├── 1년차: 2023.3.1 ~ 2024.2.29
├── 2년차: 2024.3.1 ~ 2025.2.28
└── 3년차: 2025.3.1 ~ 2026.2.28
```

### AssessmentLog 에 대한 목표치
1. 연차별 검사일 (researchDate) 기준으로 인정시간 (creditTime) 의 합 - 심리평가 총 시간
2. 연차별 검사일 (researchDate) 기준으로 사례(row) 수의 합 - 심리평가 총 사례 수
3. 검사 종류 (researchType) 가 종합심리평가인 경우 사례(row) 수의 합 - 종합심리평가 총 사례 수
4. 검사 종류 (researchType) 가 종합심리평가인 경우 인정시간 (creditTime) 시간의 합 - 종합심리평가 총 인정시간

### IndividualTherapyLog, GroupTherapyLog 에 대한 목표치

**개인 및 집단 심리치료 데이터 전체에서 계산**

1. 연차별 종료일 (endDate) 기준으로 인정시간 (prepareTime + sessionTime + supervisionTime) 의 합 - 심리치료 총 인정 시간
2. 연차별 종료일 (endDate) 기준으로 인정시간 사례(row) 의 합 - 심리치료 총 사례 수
3. 치료자 유형 (therapyType) 가 주치료자일 경우 인정시간 (prepareTime + sessionTime + supervisionTime) 의 합 - 주치료자 심리치료 총 인정 시간
4. 치료자 유형 (therapyType) 가 주치료자일 경우 인정시간 사례(row) 의 합 - 주치료자 심리치료 총 사례 수

### AcademicActivityLog 에 대한 목표치
---

### ResearchLog
---

### OtherActivityLog
---

### 연차별 총 인정시간
1. AssessmentLog 에서 연차별 검사일 (researchDate) 기준으로 인정시간 (creditTime) 의 합 - 연차별 심리평가 인정시간
2. IndividualTherapyLog, GroupTherapyLog 에서 연차별 종료일 (endDate) 기준으로 인정시간 (prepareTime + sessionTime + supervisionTime) 의 합 - 연차별 심리치료 인정 시간
3. AcademicActivityLog 에서 연차별 (activityDate) 모든 인정시간 (creditTime) 의 합 - 연차별 학술활동 인정시간
4. OtherActivityLog 에서 연차별 (endDate) 총 인정시간(creditTime) - 연차별 기타 수련 활동 인정시간
5. 연차별 1,2,3,4 의 모든 인정시간의 합 - 연차별 총 인정시간

### 모든 연차의 합
1. AssessmentLog 에서 인정시간 (creditTime) 의 합 - 300 시간 이상
2. AssessmentLog 에서 종합심리평가 사례 (row) 수 - 30례 이상
3. IndividualTherapyLog, GroupTherapyLog 에서 인정시간 (prepareTime + sessionTime + supervisionTime) 의 합 - 300 시간 이상
4. IndividualTherapyLog, GroupTherapyLog 에서 치료자 유형 (therapyType) 가 주치료자일 경우 인정시간 (prepareTime + sessionTime + supervisionTime) 의 합 - 100 시간 이상
5. IndividualTherapyLog, GroupTherapyLog 에서 치료자 유형 (therapyType) 가 주치료자일 경우 인정시간 사례(row) 의 합 - 10 례 이상
6. AcademicActivityLog 에서 모든 인정시간 (creditTime) 의 합
7. AcademicActivityLog 에서 참여 형식(act)이 참석이고 activityType 이 윤리교육일 경우 사례 (row) 의 합 - 1회 이상
8. AcademicActivityLog 에서 참여 형식(act)이 참석이고 activityType 이 학술회의일 경우 인정시간 (creditTime) 의 합 - 30시간 이상
9. AcademicActivityLog 에서 참여 형식(act)이 참석이고 activityType 이 사례회의일 경우 인정시간 (creditTime) 의 합 - 10시간 이상
10. AcademicActivityLog 에서 참여 형식(act)이 발표이고 activityType 이 사례회의일 경우 사례 (row) 의 합 - 2번 이상
11. AcademicActivityLog 에서 참여 형식(act)이 발표이고 activityType 이 논문발표일 경우 사례 (row) 의 합 - 1번 이상
12. ResearchLog 에서 총 사례(row) 수 - 총 연구 수 - 1건
13. OtherActivityLog 대외협력(activityType) 총 인정시간(creditTime) - 대외협력 인정시간 - 30 시간 이상
14. OtherActivityLog 기타수련(activityType) 총 인정시간(creditTime) - 기타수련 인정시간 - .
15. 총 수련시간 - 항목 1 + 항목 3 + 항목 6 + 항목 13 + 항목 14 - 3000 시간 이상
---

## 프로젝트 개요

지윤 앱은 **Electron** 기반의 데스크톱 애플리케이션으로, **React**와 **TypeScript**를 사용하여 개발되었습니다. 이 앱은 심리 전문가들이 다양한 전문 활동을 효율적으로 기록하고 관리할 수 있도록 설계되었습니다. 주요 관리 항목은 다음과 같습니다:

- 심리 검사
- 개인 치료 세션
- 집단 치료 세션
- 학술 활동
- 연구 출판물
- 기타 전문 활동

사용자는 이 애플리케이션을 통해 자신의 활동을 기록, 추적, 시각화할 수 있으며, 이는 자격증 갱신이나 전문성 개발에 유용하게 활용될 수 있습니다. 사용자 인터페이스가 한국어이므로, 주 사용자는 한국의 심리 전문가들입니다.

---
## 프로젝트 구조

```
jiyoon-app/
├── .junie/              # 주니어 가이드라인
├── dist/                # 배포 파일
├── out/                 # 출력 파일
├── prisma/              # Prisma ORM 파일 및 데이터베이스 스키마
├── resources/           # 애플리케이션 리소스
└── src/                 # 소스 코드
    ├── main/            # Electron 메인 프로세스
    │   ├── academic-activity/
    │   ├── assessment/
    │   ├── group-therapy/
    │   ├── individual-therapy/
    │   ├── other-activity/
    │   ├── prisma/
    │   ├── research/
    │   └── test/
    ├── preload/         # Electron 프리로드 스크립트
    ├── renderer/        # React 애플리케이션 (렌더러 프로세스)
    │   └── src/
    │       ├── component/   # 재사용 가능한 UI 컴포넌트
    │       ├── data/        # 데이터 관련 파일
    │       ├── helpers/     # 헬퍼 함수
    │       ├── hook/        # 커스텀 React 훅
    │       ├── i18n/        # 국제화
    │       ├── pages/       # 애플리케이션 페이지
    │       └── type/        # TypeScript 타입 정의
    └── shared/          # 프로세스 간 공유 코드
        ├── constants/
        └── types/
```

## 데이터베이스 스키마

애플리케이션은 **Prisma ORM**과 **SQLite**를 사용하며, 다음 모델들이 포함된 데이터베이스 스키마를 가지고 있습니다:

1.  **AssessmentLog**: 심리 검사 기록
2.  **IndividualTherapyLog**: 개인 치료 세션 기록
3.  **GroupTherapyLog**: 집단 치료 세션 기록
4.  **AcademicActivityLog**: 학술 활동 기록
5.  **ResearchLog**: 연구 출판물 기록
6.  **OtherActivityLog**: 기타 전문 활동 기록

각 모델에는 날짜, 시간, 기타 관련 정보를 추적하는 필드와 함께, "usable" 플래그 및 생성/수정 타임스탬프 필드가 포함되어 있습니다.

---

## 코드 스타일 및 품질

프로젝트는 코드 스타일 및 품질 관리를 위해 다음 도구들을 사용합니다:

- **ESLint**: 코드 린팅
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 검사

---

## 테스트

현재 프로젝트에는 공식적인 테스트 설정이 없는 것으로 보입니다. 프로젝트 디렉토리나 `package.json` 파일에서 테스트 관련 스크립트가 발견되지 않았습니다.

---

## 주니어를 위한 작업 가이드라인

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
