export interface NewsArticle {
  id: string;
  slug: string;
  title: {
    en: string;
    ko: string;
  };
  excerpt: {
    en: string;
    ko: string;
  };
  content: {
    en: string;
    ko: string;
  };
  category: 'company' | 'industry' | 'partnership' | 'event' | 'regulation';
  source?: string;
  publishedAt: string;
  featured: boolean;
  urgent?: boolean; // 속보/중요 뉴스
  thumbnail?: string;
  images?: string[];
  tags: string[];
}

export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'web3-korea-bridge-expands-seoul-office',
    title: {
      en: 'Web3 Korea Bridge Expands Seoul Office to Meet Growing Demand',
      ko: 'Web3 Korea Bridge, 증가하는 수요에 대응하여 서울 사무소 확장'
    },
    excerpt: {
      en: 'Web3 Korea Bridge announces significant expansion of its Seoul office, doubling team size to support increasing international client demand.',
      ko: 'Web3 Korea Bridge가 증가하는 국제 고객 수요를 지원하기 위해 팀 규모를 두 배로 늘리며 서울 사무소를 대폭 확장한다고 발표했습니다.'
    },
    content: {
      en: `Web3 Korea Bridge today announced a significant expansion of its Seoul office, marking a major milestone in the company's growth trajectory. The expansion includes doubling the team size and moving to a new 500-square-meter facility in Gangnam district.

## Meeting Market Demand

The expansion comes in response to unprecedented demand from international Web3 companies seeking to enter the Korean market. Over the past year, Web3 Korea Bridge has facilitated the market entry of over 50 global blockchain projects.

"This expansion reflects our commitment to providing world-class services to our clients," said the CEO. "The Korean Web3 market is experiencing explosive growth, and we're positioning ourselves to be the premier bridge for international companies."

## New Capabilities

The expanded office will feature:
- Dedicated client meeting spaces
- State-of-the-art video conferencing facilities
- A blockchain development lab
- Training center for workshops and seminars

## Team Growth

The company plans to hire 20 additional specialists across various departments:
- Legal and compliance experts
- Business development managers
- Technical consultants
- Marketing specialists

This expansion reinforces Web3 Korea Bridge's position as the leading consultancy for Web3 market entry in Korea.`,
      ko: `Web3 Korea Bridge는 오늘 서울 사무소의 대규모 확장을 발표하며, 회사 성장 궤적의 중요한 이정표를 세웠습니다. 이번 확장에는 팀 규모를 두 배로 늘리고 강남구의 500평방미터 규모의 새로운 시설로 이전하는 것이 포함됩니다.

## 시장 수요 충족

이번 확장은 한국 시장 진출을 모색하는 국제 Web3 기업들의 전례 없는 수요에 대응하기 위한 것입니다. 지난 1년간 Web3 Korea Bridge는 50개 이상의 글로벌 블록체인 프로젝트의 시장 진출을 지원했습니다.

"이번 확장은 고객에게 세계적 수준의 서비스를 제공하겠다는 우리의 약속을 반영합니다"라고 CEO는 말했습니다. "한국 Web3 시장은 폭발적인 성장을 경험하고 있으며, 우리는 국제 기업들을 위한 최고의 가교 역할을 할 준비를 하고 있습니다."

## 새로운 역량

확장된 사무소의 특징:
- 전용 고객 미팅 공간
- 최첨단 화상 회의 시설
- 블록체인 개발 연구소
- 워크샵 및 세미나를 위한 교육 센터

## 팀 성장

회사는 다양한 부서에서 20명의 추가 전문가를 채용할 계획입니다:
- 법률 및 컴플라이언스 전문가
- 비즈니스 개발 매니저
- 기술 컨설턴트
- 마케팅 전문가

이번 확장은 한국 Web3 시장 진출을 위한 선도적인 컨설팅 회사로서 Web3 Korea Bridge의 입지를 강화합니다.`
    },
    category: 'company',
    publishedAt: '2024-12-20',
    featured: true,
    urgent: true,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    tags: ['expansion', 'seoul', 'office', 'growth']
  },
  {
    id: '2',
    slug: 'strategic-partnership-chainlink-labs',
    title: {
      en: 'Web3 Korea Bridge Forms Strategic Partnership with Chainlink Labs',
      ko: 'Web3 Korea Bridge, Chainlink Labs와 전략적 파트너십 체결'
    },
    excerpt: {
      en: 'Major partnership announced to accelerate oracle integration and DeFi development in Korean market.',
      ko: '한국 시장에서 오라클 통합 및 DeFi 개발을 가속화하기 위한 주요 파트너십 발표.'
    },
    content: {
      en: `Web3 Korea Bridge and Chainlink Labs today announced a strategic partnership aimed at accelerating the adoption of decentralized oracle networks in South Korea.

## Partnership Details

The collaboration will focus on:
- Technical integration support for Korean DeFi projects
- Educational initiatives for developers
- Joint marketing and business development efforts
- Regulatory compliance consultation

## Impact on Korean DeFi Ecosystem

This partnership is expected to significantly boost the Korean DeFi ecosystem by providing reliable oracle solutions for price feeds, verifiable randomness, and external API connectivity.

"Chainlink's proven oracle technology combined with our local expertise creates unprecedented opportunities for Korean DeFi projects," stated our Head of Partnerships.

## Upcoming Initiatives

- Developer workshops starting January 2025
- Hackathon series focused on oracle integration
- Joint research on Korean market requirements
- Technical documentation in Korean language

The partnership positions both companies at the forefront of Korea's rapidly evolving DeFi landscape.`,
      ko: `Web3 Korea Bridge와 Chainlink Labs는 오늘 한국에서 탈중앙화 오라클 네트워크의 채택을 가속화하기 위한 전략적 파트너십을 발표했습니다.

## 파트너십 세부사항

협력 분야:
- 한국 DeFi 프로젝트를 위한 기술 통합 지원
- 개발자를 위한 교육 이니셔티브
- 공동 마케팅 및 비즈니스 개발 노력
- 규제 준수 컨설팅

## 한국 DeFi 생태계에 미치는 영향

이 파트너십은 가격 피드, 검증 가능한 무작위성 및 외부 API 연결을 위한 신뢰할 수 있는 오라클 솔루션을 제공함으로써 한국 DeFi 생태계를 크게 향상시킬 것으로 예상됩니다.

"Chainlink의 검증된 오라클 기술과 우리의 현지 전문성이 결합되어 한국 DeFi 프로젝트에 전례 없는 기회를 창출합니다"라고 파트너십 책임자가 말했습니다.

## 향후 이니셔티브

- 2025년 1월부터 개발자 워크샵 시작
- 오라클 통합에 초점을 맞춘 해커톤 시리즈
- 한국 시장 요구사항에 대한 공동 연구
- 한국어 기술 문서

이 파트너십은 빠르게 진화하는 한국 DeFi 환경의 최전선에 두 회사를 위치시킵니다.`
    },
    category: 'partnership',
    source: 'Press Release',
    publishedAt: '2024-12-18',
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
    tags: ['partnership', 'chainlink', 'defi', 'oracle']
  },
  {
    id: '3',
    slug: 'korean-government-announces-web3-support-fund',
    title: {
      en: 'Korean Government Announces $100M Web3 Innovation Support Fund',
      ko: '한국 정부, 1억 달러 규모 Web3 혁신 지원 기금 발표'
    },
    excerpt: {
      en: 'Major government initiative to support Web3 startups and blockchain innovation in South Korea.',
      ko: '한국의 Web3 스타트업과 블록체인 혁신을 지원하기 위한 정부의 주요 이니셔티브.'
    },
    content: {
      en: `The Korean government has unveiled a groundbreaking $100 million fund dedicated to supporting Web3 innovation and blockchain development in the country.

## Fund Overview

The Web3 Innovation Support Fund will provide:
- Direct investments in promising Web3 startups
- Grants for blockchain research and development
- Support for international partnerships
- Infrastructure development for blockchain projects

## Eligibility and Application

Companies can apply for funding if they meet the following criteria:
- Registered business entity in Korea
- Focus on Web3/blockchain technology
- Clear business model and growth potential
- Compliance with Korean regulations

## Industry Response

The announcement has been met with enthusiasm from the Korean blockchain community. Industry leaders see this as a pivotal moment for Korea's position in the global Web3 landscape.

"This fund demonstrates Korea's commitment to becoming a global leader in Web3 innovation," commented a spokesperson from the Korean Blockchain Association.

## Application Timeline

- Applications open: January 15, 2025
- First round evaluation: February 2025
- Fund disbursement: March 2025

Web3 Korea Bridge will assist international companies in accessing this fund through our comprehensive support services.`,
      ko: `한국 정부가 국내 Web3 혁신과 블록체인 개발을 지원하기 위한 획기적인 1억 달러 규모의 기금을 공개했습니다.

## 기금 개요

Web3 혁신 지원 기금은 다음을 제공합니다:
- 유망한 Web3 스타트업에 대한 직접 투자
- 블록체인 연구 개발을 위한 보조금
- 국제 파트너십 지원
- 블록체인 프로젝트를 위한 인프라 개발

## 자격 요건 및 신청

다음 기준을 충족하는 기업은 자금을 신청할 수 있습니다:
- 한국 내 등록된 사업체
- Web3/블록체인 기술에 중점
- 명확한 비즈니스 모델과 성장 잠재력
- 한국 규정 준수

## 업계 반응

이번 발표는 한국 블록체인 커뮤니티로부터 열광적인 반응을 얻었습니다. 업계 리더들은 이를 글로벌 Web3 환경에서 한국의 입지를 위한 중요한 순간으로 보고 있습니다.

"이 기금은 Web3 혁신의 글로벌 리더가 되려는 한국의 의지를 보여줍니다"라고 한국블록체인협회 대변인이 말했습니다.

## 신청 일정

- 신청 시작: 2025년 1월 15일
- 1차 평가: 2025년 2월
- 자금 지급: 2025년 3월

Web3 Korea Bridge는 포괄적인 지원 서비스를 통해 국제 기업들이 이 기금에 접근할 수 있도록 지원할 것입니다.`
    },
    category: 'regulation',
    source: 'Ministry of Science and ICT',
    publishedAt: '2024-12-17',
    featured: false,
    urgent: true,
    thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    tags: ['government', 'fund', 'investment', 'support']
  },
  {
    id: '4',
    slug: 'korea-blockchain-week-2025-announced',
    title: {
      en: 'Korea Blockchain Week 2025: Web3 Korea Bridge as Official Partner',
      ko: '코리아 블록체인 위크 2025: Web3 Korea Bridge 공식 파트너로 참여'
    },
    excerpt: {
      en: 'Asia\'s premier blockchain event returns with Web3 Korea Bridge as an official partner, featuring expanded programming and global speakers.',
      ko: '아시아 최고의 블록체인 이벤트가 Web3 Korea Bridge를 공식 파트너로 하여 확장된 프로그램과 글로벌 연사들과 함께 돌아옵니다.'
    },
    content: {
      en: `Korea Blockchain Week (KBW) 2025 has been officially announced, with Web3 Korea Bridge joining as an official partner for this landmark event in Asia's blockchain calendar.

## Event Overview

- Dates: September 1-7, 2025
- Location: COEX, Seoul
- Expected attendance: 15,000+ participants
- Countries represented: 60+
- Speaking sessions: 200+

## Web3 Korea Bridge Involvement

As an official partner, Web3 Korea Bridge will:
- Host the International Business Pavilion
- Organize matchmaking sessions for global companies
- Conduct workshops on Korean market entry
- Facilitate meetings with Korean regulators

## Key Highlights

### Main Conference Tracks
- DeFi and Financial Innovation
- NFTs and Digital Culture
- Enterprise Blockchain Solutions
- Regulatory Frameworks and Compliance
- Web3 Gaming and Metaverse

### Special Programs
- Startup Pitch Competition ($500K prize pool)
- Developer Hackathon
- Investor Networking Sessions
- Regulatory Roundtables

## Early Bird Registration

Registration opens January 1, 2025, with early bird discounts available until March 31. Web3 Korea Bridge clients receive exclusive benefits including VIP access and priority meeting scheduling.

"KBW 2025 will be the definitive gathering for anyone serious about Web3 in Asia," said the event organizers.`,
      ko: `코리아 블록체인 위크(KBW) 2025가 공식 발표되었으며, Web3 Korea Bridge가 아시아 블록체인 일정의 이 랜드마크 이벤트의 공식 파트너로 참여합니다.

## 이벤트 개요

- 일정: 2025년 9월 1-7일
- 장소: 서울 COEX
- 예상 참가자: 15,000명 이상
- 참가 국가: 60개국 이상
- 강연 세션: 200개 이상

## Web3 Korea Bridge 참여

공식 파트너로서 Web3 Korea Bridge는:
- 국제 비즈니스 파빌리온 주최
- 글로벌 기업을 위한 매칭 세션 조직
- 한국 시장 진출 워크샵 진행
- 한국 규제 당국과의 미팅 주선

## 주요 하이라이트

### 메인 컨퍼런스 트랙
- DeFi 및 금융 혁신
- NFT 및 디지털 문화
- 엔터프라이즈 블록체인 솔루션
- 규제 프레임워크 및 컴플라이언스
- Web3 게이밍 및 메타버스

### 특별 프로그램
- 스타트업 피치 대회 (상금 50만 달러)
- 개발자 해커톤
- 투자자 네트워킹 세션
- 규제 라운드테이블

## 얼리버드 등록

2025년 1월 1일 등록이 시작되며, 3월 31일까지 얼리버드 할인이 제공됩니다. Web3 Korea Bridge 고객은 VIP 액세스 및 우선 미팅 일정 등 독점 혜택을 받습니다.

"KBW 2025는 아시아에서 Web3에 진지한 모든 사람들을 위한 결정적인 모임이 될 것입니다"라고 이벤트 주최측이 말했습니다.`
    },
    category: 'event',
    publishedAt: '2024-12-15',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    tags: ['kbw', 'event', 'conference', 'blockchain']
  },
  {
    id: '5',
    slug: 'defi-tvl-korea-reaches-5-billion',
    title: {
      en: 'Korean DeFi TVL Surpasses $5 Billion: Market Analysis',
      ko: '한국 DeFi TVL 50억 달러 돌파: 시장 분석'
    },
    excerpt: {
      en: 'Total Value Locked in Korean DeFi protocols reaches new milestone, signaling market maturity and growing institutional adoption.',
      ko: '한국 DeFi 프로토콜의 TVL이 새로운 이정표에 도달하며 시장 성숙도와 기관 채택 증가를 보여줍니다.'
    },
    content: {
      en: `The Korean DeFi ecosystem has reached a significant milestone with Total Value Locked (TVL) surpassing $5 billion for the first time, according to latest market data.

## Market Breakdown

### Leading Protocols
1. Klaytn-based DeFi: $2.1B (42%)
2. Ethereum Layer 2s: $1.8B (36%)
3. Cross-chain protocols: $1.1B (22%)

## Growth Drivers

Several factors have contributed to this remarkable growth:

### Institutional Adoption
Korean financial institutions have begun actively participating in DeFi protocols, with several major banks exploring yield farming strategies for their treasury operations.

### Regulatory Clarity
Recent regulatory guidelines have provided clearer frameworks for DeFi operations, reducing uncertainty and encouraging participation from traditional finance players.

### Technical Innovation
Korean DeFi projects have introduced innovative features:
- Real-world asset tokenization
- Advanced risk management protocols
- Korean won stablecoin integrations

## Market Implications

"This milestone represents a turning point for Korean DeFi," notes our market analyst. "We're seeing a shift from experimental to institutional-grade protocols."

## Future Outlook

Analysts project continued growth with TVL potentially reaching $10 billion by end of 2025, driven by:
- Increased institutional participation
- New protocol launches
- Integration with traditional finance
- Cross-border DeFi collaborations

Web3 Korea Bridge continues to facilitate international projects entering this thriving ecosystem.`,
      ko: `최신 시장 데이터에 따르면 한국 DeFi 생태계가 TVL(Total Value Locked)이 처음으로 50억 달러를 넘어서는 중요한 이정표에 도달했습니다.

## 시장 분석

### 주요 프로토콜
1. Klaytn 기반 DeFi: 21억 달러 (42%)
2. 이더리움 레이어 2: 18억 달러 (36%)
3. 크로스체인 프로토콜: 11억 달러 (22%)

## 성장 동력

이러한 놀라운 성장에 기여한 여러 요인들:

### 기관 채택
한국 금융 기관들이 DeFi 프로토콜에 적극적으로 참여하기 시작했으며, 여러 주요 은행들이 자금 운용을 위한 이자 농사 전략을 탐색하고 있습니다.

### 규제 명확성
최근 규제 가이드라인은 DeFi 운영을 위한 더 명확한 프레임워크를 제공하여 불확실성을 줄이고 전통 금융 참여자들의 참여를 장려했습니다.

### 기술 혁신
한국 DeFi 프로젝트들이 혁신적인 기능을 도입했습니다:
- 실물 자산 토큰화
- 고급 위험 관리 프로토콜
- 한국 원화 스테이블코인 통합

## 시장 시사점

"이 이정표는 한국 DeFi의 전환점을 나타냅니다"라고 우리 시장 분석가는 말합니다. "실험적인 것에서 기관급 프로토콜로의 전환을 보고 있습니다."

## 미래 전망

분석가들은 다음과 같은 요인으로 2025년 말까지 TVL이 100억 달러에 도달할 가능성과 함께 지속적인 성장을 예상합니다:
- 기관 참여 증가
- 새로운 프로토콜 출시
- 전통 금융과의 통합
- 국경 간 DeFi 협력

Web3 Korea Bridge는 이 번성하는 생태계에 진입하는 국제 프로젝트를 계속 지원하고 있습니다.`
    },
    category: 'industry',
    publishedAt: '2024-12-14',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800',
    tags: ['defi', 'tvl', 'market', 'analysis']
  },
  {
    id: '6',
    slug: 'web3-talent-program-launch',
    title: {
      en: 'Web3 Korea Bridge Launches Talent Development Program',
      ko: 'Web3 Korea Bridge, 인재 개발 프로그램 출시'
    },
    excerpt: {
      en: 'New initiative to train and certify Web3 professionals for the growing Korean blockchain industry.',
      ko: '성장하는 한국 블록체인 산업을 위한 Web3 전문가 양성 및 인증 새로운 이니셔티브.'
    },
    content: {
      en: `Web3 Korea Bridge today announced the launch of a comprehensive talent development program aimed at addressing the critical skills gap in Korea's rapidly growing blockchain industry.

## Program Overview

The Web3 Professional Certification Program offers:
- 12-week intensive training curriculum
- Hands-on project experience
- Industry mentorship
- Job placement assistance

## Curriculum Highlights

### Technical Track
- Smart contract development
- DeFi protocol design
- Security auditing
- Blockchain architecture

### Business Track
- Web3 business models
- Token economics
- Regulatory compliance
- Project management

## Industry Partnership

Leading Web3 companies have committed to:
- Providing guest lectures
- Offering internship opportunities
- Participating in job fairs
- Sponsoring top performers

## First Cohort Details

- Start date: February 1, 2025
- Duration: 12 weeks
- Format: Hybrid (online + in-person)
- Locations: Seoul, Busan
- Capacity: 100 students

## Application Process

Applications are now open with the following requirements:
- Basic programming knowledge (technical track)
- Business background (business track)
- English proficiency
- Commitment to full program duration

"This program will create a pipeline of qualified professionals to support Korea's Web3 ecosystem growth," stated our Education Director.

Scholarships available for exceptional candidates.`,
      ko: `Web3 Korea Bridge는 오늘 한국의 빠르게 성장하는 블록체인 산업의 중요한 기술 격차를 해결하기 위한 종합적인 인재 개발 프로그램의 출시를 발표했습니다.

## 프로그램 개요

Web3 전문가 인증 프로그램 제공:
- 12주 집중 교육 커리큘럼
- 실습 프로젝트 경험
- 업계 멘토십
- 취업 지원

## 커리큘럼 하이라이트

### 기술 트랙
- 스마트 컨트랙트 개발
- DeFi 프로토콜 설계
- 보안 감사
- 블록체인 아키텍처

### 비즈니스 트랙
- Web3 비즈니스 모델
- 토큰 경제학
- 규제 준수
- 프로젝트 관리

## 업계 파트너십

선도적인 Web3 기업들의 약속:
- 게스트 강의 제공
- 인턴십 기회 제공
- 취업 박람회 참여
- 우수 학생 후원

## 첫 번째 코호트 세부사항

- 시작일: 2025년 2월 1일
- 기간: 12주
- 형식: 하이브리드 (온라인 + 대면)
- 위치: 서울, 부산
- 정원: 100명

## 지원 절차

다음 요구사항으로 지원 접수 중:
- 기본 프로그래밍 지식 (기술 트랙)
- 비즈니스 배경 (비즈니스 트랙)
- 영어 능력
- 전체 프로그램 기간 참여 약속

"이 프로그램은 한국의 Web3 생태계 성장을 지원할 자격을 갖춘 전문가 파이프라인을 만들 것입니다"라고 교육 이사가 말했습니다.

우수한 지원자를 위한 장학금 제공.`
    },
    category: 'company',
    publishedAt: '2024-12-12',
    featured: false,
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
    tags: ['education', 'talent', 'training', 'certification']
  }
];

export function getNewsArticles(): NewsArticle[] {
  return newsArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNewsByCategory(category: NewsArticle['category']): NewsArticle[] {
  return newsArticles
    .filter(article => article.category === category)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(article => article.slug === slug);
}

export function getFeaturedNews(): NewsArticle[] {
  return newsArticles
    .filter(article => article.featured)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, 3);
}

export function getUrgentNews(): NewsArticle[] {
  return newsArticles
    .filter(article => article.urgent)
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getRelatedNews(currentSlug: string, limit: number = 3): NewsArticle[] {
  const current = getNewsBySlug(currentSlug);
  if (!current) return [];

  return newsArticles
    .filter(article => 
      article.slug !== currentSlug && 
      (article.category === current.category || 
       article.tags.some(tag => current.tags.includes(tag)))
    )
    .sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}