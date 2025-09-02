# Layout Components

Web3-Korea Bridge 프로젝트의 레이아웃 컴포넌트들입니다.

## 컴포넌트 구성

### 1. Header (`components/layout/header.tsx`)
- 네비게이션 메뉴
- 다국어 전환 기능 (한국어/영어)
- 반응형 모바일 메뉴
- 스크롤에 따른 배경 변경
- Glass effect 적용

### 2. Footer (`components/layout/footer.tsx`)
- 회사 정보 및 브랜딩
- 네비게이션 링크
- 서비스 목록
- 연락처 정보
- 소셜 미디어 링크
- ScrollToTop 버튼 내장
- 그라디언트 배경과 장식적 요소

### 3. MainLayout (`components/layout/main-layout.tsx`)
- 메인 콘텐츠 래퍼
- ScrollToTop 버튼 (독립적)
- Container, Section 래퍼 컴포넌트
- AdminLayout (향후 관리자 페이지용)

## 사용 방법

### 기본 사용법
\`\`\`tsx
import { MainLayout, Container, Section } from '@/components/layout'

export default function Page() {
  return (
    <MainLayout>
      <Section padding="lg" background="gradient">
        <Container>
          <h1>페이지 제목</h1>
          <p>내용</p>
        </Container>
      </Section>
    </MainLayout>
  )
}
\`\`\`

### Container 크기 옵션
- `sm`: max-w-3xl (작은 내용)
- `default`: max-w-7xl (기본)
- `lg`: max-w-8xl (큰 내용)
- `xl`: max-w-9xl (매우 큰 내용)
- `full`: max-w-full (전체 너비)

### Section 배경 옵션
- `default`: 기본 배경
- `muted`: 회색 계열 배경
- `primary`: 주색상 배경
- `gradient`: 그라디언트 배경

### Section 패딩 옵션
- `none`: 패딩 없음
- `sm`: py-8 sm:py-12
- `default`: py-12 sm:py-16 lg:py-20
- `lg`: py-16 sm:py-20 lg:py-24
- `xl`: py-20 sm:py-24 lg:py-32

## 특징

### 접근성
- ARIA labels 적용
- 키보드 내비게이션 지원
- 스크린 리더 호환성
- Semantic HTML 사용

### 성능
- 최적화된 이벤트 리스너
- 스크롤 성능 최적화
- 레이지 로딩 준비
- 최소한의 리렌더링

### 반응형 디자인
- Mobile-first 접근법
- Breakpoint 기반 반응형
- Touch-friendly 인터페이스
- 다양한 화면 크기 지원

### 다크모드 준비
- CSS Custom Properties 활용
- 테마 전환 준비
- 컨트라스트 고려

## CSS 클래스

추가된 유틸리티 클래스들:
- `.scroll-to-top`: 스크롤 투 탑 버튼
- `.container-*`: 컨테이너 크기 변형
- `.section-*`: 섹션 패딩 변형
- `.bg-gradient-subtle`: 미묘한 그라디언트 배경
- `.footer-gradient`: 푸터 그라디언트 배경

## 향후 개선사항
- [ ] 다크모드 완전 지원
- [ ] 애니메이션 효과 추가
- [ ] PWA 지원을 위한 오프라인 상태 표시
- [ ] 성능 모니터링 통합