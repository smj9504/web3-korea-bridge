# Web3 Korea Bridge - Reference Documentation

이 문서들은 프로젝트 구현 시 참고할 수 있는 설계 및 구조 가이드입니다.

## 📁 문서 구조

### `/reference/backend/`
백엔드 시스템 설계 참고 자료
- `api/` - API 엔드포인트 구조 설계
- `auth/` - 인증 시스템 설계
- `backup/` - 백업 및 복구 전략
- `database/` - 데이터베이스 설계
- `email/` - 이메일 서비스 계획
- `security/` - 보안 모범 사례
- `storage/` - 파일 저장 전략

### `/reference/components/`
UI 컴포넌트 프로토타입 및 참고 구조
- 기본 컴포넌트 구조 예시
- 레이아웃 컴포넌트 참고
- 타입 정의 예시

### `/reference/structure/`
프로젝트 구조 참고 자료
- `app/` - Next.js App Router 구조 예시
- `lib/` - 유틸리티 함수 구조
- `store/` - 상태 관리 구조
- `types/` - TypeScript 타입 정의
- `prisma/` - 데이터베이스 스키마 참고
- `messages/` - 국제화 구조
- `scripts/` - 배포 및 운영 스크립트
- 설정 파일들 (next.config.js, tailwind.config.js 등)

## 🎯 실제 구현

모든 실제 구현은 `/web3-korea-bridge/` 디렉토리에서 진행됩니다.

이 reference 문서들은 구현 시 참고용으로만 사용하며, 실제 코드는 web3-korea-bridge 내에서 관리됩니다.

## 📝 사용 방법

1. 새로운 기능 구현 시 해당 reference 문서 확인
2. 구조 및 패턴 참고하여 web3-korea-bridge에서 실제 구현
3. Reference 문서는 필요에 따라 업데이트 가능

---

**중요**: 이 문서들은 참고용이며, 실제 개발은 `web3-korea-bridge` 디렉토리에서 진행하세요.