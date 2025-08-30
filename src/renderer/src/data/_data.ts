import { TypeTrainingData } from '@renderer/type/trainings'

export const dataMock: TypeTrainingData = {
  // 심리평가 실시 - 161례 (실제 CSV 데이터 기준)
  psychological_assessment: [
    // 1년차 실제 케이스 (50례, 268시간 = 16,080분)
    {id: 1, text: '곽연자 | 여자 | 58세', details: 'EOAD, pseudodementia | SNSB', taskDate: '2023-03-22', totalMinutes: 180, year: 1, evaluationType: 'neuropsychological', completed: true},
    {id: 2, text: '곽연자 | 여자 | 58세', details: 'EOAD, pseudodementia | K-MMSE-2', taskDate: '2023-03-22', totalMinutes: 60, year: 1, evaluationType: 'screening', completed: true},
    {id: 3, text: '최문영 | 남자 | 21세', details: 'PTSD, Schizoid PD | 종합평가', taskDate: '2023-03-06', totalMinutes: 480, year: 1, evaluationType: 'comprehensive', completed: true},
    {id: 4, text: '정말다 | 여자 | 71세', details: 'Dementia | SNSB', taskDate: '2023-04-03', totalMinutes: 180, year: 1, evaluationType: 'neuropsychological', completed: true},
    {id: 5, text: '정말다 | 여자 | 71세', details: 'Dementia | K-MMSE-2', taskDate: '2023-04-03', totalMinutes: 60, year: 1, evaluationType: 'screening', completed: true},
    {id: 6, text: '최종광 | 남자 | 27세', details: 'Substance use disorder | 종합평가', taskDate: '2023-04-10', totalMinutes: 480, year: 1, evaluationType: 'comprehensive', completed: true},
    {id: 7, text: '박경험 | 남자 | 33세', details: 'PTSD | 종합평가', taskDate: '2023-04-26', totalMinutes: 480, year: 1, evaluationType: 'comprehensive', completed: true},
    {id: 8, text: '송태한 | 남자 | 7세', details: 'ADHD, Masked depression | 종합평가', taskDate: '2023-05-09', totalMinutes: 480, year: 1, evaluationType: 'comprehensive', completed: true},
    {id: 9, text: '송태한 부모평가', details: 'PAI, SCT, PAT', taskDate: '2023-05-09', totalMinutes: 120, year: 1, evaluationType: 'parent_assessment', completed: true},
    {id: 10, text: '이나경 | 여자 | 7세', details: 'C-PTSD, ADHD | 종합평가', taskDate: '2023-05-15', totalMinutes: 480, year: 1, evaluationType: 'comprehensive', completed: true},
    // 1년차 나머지 케이스 (총 16,080분에서 위 케이스 제외한 시간)
    {id: 50, text: '1년차 추가 심리평가 케이스 40례', details: '종합평가, 신경심리평가, 스크리닝 검사 포함', taskDate: '2024-02-29', totalMinutes: 13620, year: 1, evaluationType: 'mixed', completed: true},

    // 2년차 실제 케이스 (111례, 616시간 = 36,960분)
    {id: 51, text: '김은우 | 여자 | 14세', details: 'OCD | 종합평가', taskDate: '2024-01-10', totalMinutes: 480, year: 2, evaluationType: 'comprehensive', completed: true},
    {id: 52, text: '김은우 부모평가', details: 'PAI, SCT, PAT', taskDate: '2024-01-10', totalMinutes: 120, year: 2, evaluationType: 'parent_assessment', completed: true},
    {id: 53, text: '장여님 | 여자 | 88세', details: 'Dementia | SNSB', taskDate: '2024-01-17', totalMinutes: 180, year: 2, evaluationType: 'neuropsychological', completed: true},
    {id: 54, text: '장여님', details: 'Dementia | K-MMSE-2', taskDate: '2024-01-17', totalMinutes: 60, year: 2, evaluationType: 'screening', completed: true},
    {id: 55, text: '장우준 | 남자 | 22세', details: 'PTSD, Illness anxiety disorder | 종합평가', taskDate: '2024-02-07', totalMinutes: 480, year: 2, evaluationType: 'comprehensive', completed: true},
    // 2년차 나머지 케이스
    {id: 100, text: '2년차 추가 심리평가 케이스 106례', details: '종합평가, 신경심리평가, 스크리닝 검사 포함', taskDate: '2025-02-28', totalMinutes: 35640, year: 2, evaluationType: 'mixed', completed: true}
  ],

  // 심리치료 참가 (교육분석) - 실제 0시간
  therapy_participation: [],

  // 개인심리치료 실시 - 19례 (실제 데이터 기준)
  individual_therapy: [
    // 1년차 (14례, 355시간 = 21,300분)
    {id: 1, text: '최윤하 | 여자 | 11세', details: '2023.04.04 ~ 2023.09.26 | 22회기 | 주치료자', therapy_approach: '놀이치료', sessions: 22, taskDate: '2023-04-04', totalMinutes: 1680, year: 1, isMainTherapist: true, completed: true},
    {id: 2, text: '배서진 | 남자 | 10세', details: '2023.05.12 ~ 2023.11.10 | 18회기 | 주치료자', therapy_approach: '인지행동치료', sessions: 18, taskDate: '2023-05-12', totalMinutes: 1320, year: 1, isMainTherapist: true, completed: true},
    {id: 3, text: '이나경 | 여자 | 7세', details: '2023.06.12 ~ 2023.07.17 | 4회기 | 주치료자', therapy_approach: '트라우마 치료', sessions: 4, taskDate: '2023-06-12', totalMinutes: 300, year: 1, isMainTherapist: true, completed: true},
    {id: 4, text: '유지환 | 남자 | 9세', details: '2023.07.17 ~ 2023.08.21 | 5회기 | 주치료자', therapy_approach: '놀이치료', sessions: 5, taskDate: '2023-07-17', totalMinutes: 360, year: 1, isMainTherapist: true, completed: true},
    {id: 5, text: '최서아 | 여자 | 7세', details: '2023.07.31 ~ 2024.08.29 | 29회기 | 주치료자', therapy_approach: '놀이치료', sessions: 29, taskDate: '2023-07-31', totalMinutes: 2100, year: 1, isMainTherapist: true, completed: true},
    {id: 6, text: '김예준 | 남자 | 8세', details: '2023.12.11 ~ 2024.01.29 | 5회기 | 주치료자', therapy_approach: '놀이치료', sessions: 5, taskDate: '2023-12-11', totalMinutes: 360, year: 1, isMainTherapist: true, completed: true},
    {id: 7, text: '조효주 | 여자 | 15세', details: '2023.10.24 ~ 2023.11.14 | 3회기 | 주치료자', therapy_approach: '인지행동치료', sessions: 3, taskDate: '2023-10-24', totalMinutes: 240, year: 1, isMainTherapist: true, completed: true},
    {id: 8, text: '박규빈 | 여자 | 6세', details: '2024.02.16 ~ 2025.01.15 | 19회기 | 주치료자', therapy_approach: '놀이치료', sessions: 19, taskDate: '2024-02-16', totalMinutes: 1440, year: 1, isMainTherapist: true, completed: true},
    // 1년차 나머지 6례 (보조치료자 포함)
    {id: 50, text: '1년차 추가 심리치료 6례', details: '보조치료자 역할 포함 | 총 13,500분', therapy_approach: '다양한 접근법', sessions: 180, taskDate: '2024-02-29', totalMinutes: 13500, year: 1, isMainTherapist: false, completed: true},

    // 2년차 (5례, 243시간 = 14,580분)
    {id: 15, text: '박하임 | 여자 | 7세', details: '2024.03.08 ~ 2025.02.26 | 32회기 | 주치료자', therapy_approach: '놀이치료', sessions: 32, taskDate: '2024-03-08', totalMinutes: 2640, year: 2, isMainTherapist: true, completed: true},
    {id: 16, text: '김연아 | 여자 | 16세', details: '2024.03.14 ~ 2025.02.26 | 17회기 | 주치료자', therapy_approach: '인지행동치료', sessions: 17, taskDate: '2024-03-14', totalMinutes: 1500, year: 2, isMainTherapist: true, completed: true},
    {id: 17, text: '이민수 | 남자 | 19세', details: '2024.05.20 ~ 2024.12.18 | 25회기 | 주치료자', therapy_approach: '정신분석적 치료', sessions: 25, taskDate: '2024-05-20', totalMinutes: 2100, year: 2, isMainTherapist: true, completed: true},
    {id: 18, text: '정수현 | 여자 | 14세', details: '2024.08.15 ~ 2025.01.30 | 20회기 | 주치료자', therapy_approach: '인지행동치료', sessions: 20, taskDate: '2024-08-15', totalMinutes: 1800, year: 2, isMainTherapist: true, completed: true},
    // 2년차 나머지 1례
    {id: 51, text: '2년차 추가 심리치료 1례', details: '기타 치료활동 | 총 6,540분', therapy_approach: '다양한 접근법', sessions: 109, taskDate: '2025-02-28', totalMinutes: 6540, year: 2, isMainTherapist: false, completed: true}
  ],

  // 집단심리치료 실시 - 실제 0례
  group_therapy: [],

  // 학술회의 참석 - 실제 데이터 기준 (131회, 459시간 30분 = 27,570분)
  academic_meeting_attendance: [
    // 1년차 학술회의 (39회, 154시간 10분 = 9,250분)
    {id: 1, text: '한국임상심리학회 춘계학술대회 2023', details: '2023년 춘계학술대회', organization: '한국임상심리학회', taskDate: '2023-04-29', totalMinutes: 480, year: 1, completed: true},
    {id: 2, text: '한국심리학회 연차대회 2023', details: '2023년 한국심리학회 연차대회', organization: '한국심리학회', taskDate: '2023-08-25', totalMinutes: 480, year: 1, completed: true},
    {id: 3, text: '한국임상심리학회 추계학술대회 2023', details: '2023년 추계학술대회', organization: '한국임상심리학회', taskDate: '2023-10-14', totalMinutes: 540, year: 1, completed: true},
    {id: 4, text: '수련기관 학술회의 (1년차)', details: '경기도의료원 의정부병원 | 32회 참석', organization: '경기도의료원 의정부병원', taskDate: '2024-02-29', totalMinutes: 5760, year: 1, completed: true},
    {id: 5, text: '1년차 기타 학회 참석', details: '기타 학회 및 워크샵 4회', organization: '기타 학회', taskDate: '2024-02-29', totalMinutes: 1990, year: 1, completed: true},

    // 2년차 학술회의 (87회, 260시간 50분 = 15,650분)
    {id: 6, text: '한국임상심리학회 춘계학술대회 2024', details: '2024년 춘계학술대회', organization: '한국임상심리학회', taskDate: '2024-04-27', totalMinutes: 540, year: 2, completed: true},
    {id: 7, text: '한국임상심리학회 추계학술대회 2024', details: '2024년 추계학술대회', organization: '한국임상심리학회', taskDate: '2024-10-26', totalMinutes: 480, year: 2, completed: true},
    {id: 8, text: '트라우마심리치료연구회 학술회의', details: '트라우마심리치료연구회', organization: '트라우마심리치료연구회', taskDate: '2024-05-23', totalMinutes: 90, year: 2, completed: true},
    {id: 9, text: '수련기관 학술회의 (2년차)', details: '경기도의료원 의정부병원 | 33회 참석', organization: '경기도의료원 의정부병원', taskDate: '2025-02-28', totalMinutes: 5940, year: 2, completed: true},
    {id: 10, text: '2년차 기타 학회 참석', details: '기타 학회 및 워크샵 6회', organization: '기타 학회', taskDate: '2025-02-28', totalMinutes: 8600, year: 2, completed: true},

    // 3년차 학술회의 (5회, 45시간 = 2,700분)
    {id: 11, text: '한국임상심리학회 춘계학술대회 2025', details: '2025년 춘계학술대회', organization: '한국임상심리학회', taskDate: '2025-04-26', totalMinutes: 540, year: 3, completed: true},
    {id: 12, text: '3년차 기타 학회 참석', details: '기타 학회 및 워크샵 4회', organization: '기타 학회', taskDate: '2025-08-25', totalMinutes: 2160, year: 3, completed: true}
  ],

  // 사례회의 참석 - 실제 45회 (57시간 30분 = 3,450분)
  case_meeting_attendance: [
    {id: 1, text: '수련기관 사례회의 (1년차)', details: '경기도의료원 의정부병원 | 32회 참석', organization: '경기도의료원 의정부병원', taskDate: '2024-02-29', totalMinutes: 1920, year: 1, completed: true},
    {id: 2, text: '수련기관 사례회의 (2년차)', details: '경기도의료원 의정부병원 | 12회 참석', organization: '경기도의료원 의정부병원', taskDate: '2025-02-28', totalMinutes: 1440, year: 2, completed: true},
    {id: 3, text: '트라우마심리치료연구회 사례회의', details: '트라우마심리치료연구회 | 1회 참석', organization: '트라우마심리치료연구회', taskDate: '2024-05-23', totalMinutes: 90, year: 2, completed: true}
  ],

  // 윤리교육 참석 - 실제 1회 (2시간 = 120분) - 참석기록.csv에서 확인됨
  ethics_education_attendance: [
    {id: 1, text: '임상심리학자의 윤리와 책임', details: '한국임상심리학회 윤리교육 이수', organization: '한국임상심리학회', taskDate: '2024-04-27', totalMinutes: 120, year: 2, completed: true}
  ],

  // 학술회의 발표 - 실제 19회 (57시간 = 3,420분)
  academic_presentation: [
    // 1년차 (9회, 27시간 = 1,620분)
    {id: 1, text: '도서발표: 인지행동치료의 이해', details: '수련기관 도서발표', presentation_type: '도서발표', venue: '수련기관', taskDate: '2023-05-15', totalMinutes: 180, year: 1, completed: true},
    {id: 2, text: '도서발표: 아동심리치료', details: '수련기관 도서발표', presentation_type: '도서발표', venue: '수련기관', taskDate: '2023-07-20', totalMinutes: 180, year: 1, completed: true},
    {id: 3, text: '도서발표: 트라우마와 PTSD', details: '수련기관 도서발표', presentation_type: '도서발표', venue: '수련기관', taskDate: '2023-09-14', totalMinutes: 180, year: 1, completed: true},
    {id: 4, text: '저널발표: 아동 ADHD 연구', details: '수련기관 저널발표', presentation_type: '저널발표', venue: '수련기관', taskDate: '2023-11-16', totalMinutes: 180, year: 1, completed: true},
    {id: 50, text: '1년차 기타 학술발표', details: '기타 도서발표 및 저널발표 5회', presentation_type: '기타발표', venue: '수련기관', taskDate: '2024-02-29', totalMinutes: 900, year: 1, completed: true},

    // 2년차 (10회, 30시간 = 1,800분)
    {id: 6, text: '도서발표: 성격장애의 이해', details: '수련기관 도서발표', presentation_type: '도서발표', venue: '수련기관', taskDate: '2024-04-18', totalMinutes: 180, year: 2, completed: true},
    {id: 7, text: '도서발표: 집단치료의 실제', details: '수련기관 도서발표', presentation_type: '도서발표', venue: '수련기관', taskDate: '2024-06-20', totalMinutes: 180, year: 2, completed: true},
    {id: 8, text: '저널발표: 청소년 우울증 연구', details: '수련기관 저널발표', presentation_type: '저널발표', venue: '수련기관', taskDate: '2024-08-15', totalMinutes: 180, year: 2, completed: true},
    {id: 51, text: '2년차 기타 학술발표', details: '기타 도서발표 및 저널발표 7회', presentation_type: '기타발표', venue: '수련기관', taskDate: '2025-02-28', totalMinutes: 1260, year: 2, completed: true}
  ],

  // 사례발표대체 학술발표 - 실제 14회 (26시간 = 1,560분)
  case_presentation_substitute: [
    // 수련기관 내 사례발표 - 시간은 인정, 수료요건은 불인정
    {id: 1, text: '[수련기관] ADHD 사례발표', details: '시간만 인정, 수료요건 불충족', case_type: 'ADHD', venue: '수련기관', taskDate: '2023-08-10', totalMinutes: 60, year: 1, completed: true, isValidForRequirement: false},
    {id: 2, text: '[수련기관] 우울증 사례발표', details: '시간만 인정, 수료요건 불충족', case_type: '우울증', venue: '수련기관', taskDate: '2023-12-14', totalMinutes: 60, year: 1, completed: true, isValidForRequirement: false},
    {id: 3, text: '[수련기관] 강박장애 사례발표', details: '시간만 인정, 수료요건 불충족', case_type: 'OCD', venue: '수련기관', taskDate: '2024-05-16', totalMinutes: 120, year: 2, completed: true, isValidForRequirement: false},
    {id: 50, text: '[수련기관] 기타 사례발표 11회', details: '시간만 인정, 수료요건 불충족 | 총 14회', case_type: '기타', venue: '수련기관', taskDate: '2025-02-28', totalMinutes: 1320, year: 2, completed: true, isValidForRequirement: false}
  ],

  // 연구활동 - 실제 0회 (논문 게재 필요)
  research_activity: [],

  // 대외협력 지원사업 - 실제 2회 (312시간 = 18,720분)
  external_cooperation: [
    {id: 1, text: '양주시정신건강복지센터', details: '심리평가 및 치료 지원', organization: '양주시정신건강복지센터', taskDate: '2024-02-29', totalMinutes: 13440, year: 1, completed: true},
    {id: 2, text: '푸른존 심리상담센터', details: '심리평가 지원', organization: '푸른존 심리상담센터', taskDate: '2025-02-28', totalMinutes: 5280, year: 2, completed: true}
  ],

  // 기타 수련사항 - 실제 1회 (1시간 = 60분)
  other_training: [
    {id: 1, text: 'ADHD 관련 교육', details: 'ADHD 아동 치료 교육 참석', organization: '수련기관', taskDate: '2024-02-29', totalMinutes: 60, year: 1, completed: true}
  ]
}

export const data = {
  // 심리평가 실시 - 초기화
  psychological_assessment: [],

  // 심리치료 참가 (교육분석) - 초기화
  therapy_participation: [],

  // 개인심리치료 실시 - 초기화
  individual_therapy: [],

  // 집단심리치료 실시 - 초기화
  group_therapy: [],

  // 학술회의 참석 - 초기화
  academic_meeting_attendance: [],

  // 사례회의 참석 - 초기화
  case_meeting_attendance: [],

  // 윤리교육 참석 - 초기화
  ethics_education_attendance: [],

  // 학술회의 발표 - 초기화
  academic_presentation: [],

  // 사례발표대체 학술발표 - 초기화
  case_presentation_substitute: [],

  // 연구활동 - 초기화
  research_activity: [],

  // 대외협력 지원사업 - 초기화
  external_cooperation: [],

  // 기타 수련사항 - 초기화
  other_training: []
}
