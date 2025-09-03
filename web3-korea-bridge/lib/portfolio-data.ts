export interface PortfolioCase {
  id: string
  client: {
    name: string
    anonymous?: boolean
  }
  project: {
    title: {
      ko: string
      en: string
    }
    category: 'market-entry' | 'partnership' | 'investment' | 'legal' | 'marketing'
    duration: string
  }
  results: {
    primary: {
      ko: string
      en: string
    }
    metrics?: string[]
  }
  story: {
    brief: {
      ko: string
      en: string
    }
    tags: string[]
  }
  featured: boolean
}

export const portfolioCases: PortfolioCase[] = [
  {
    id: '1',
    client: {
      name: 'Global DeFi Protocol A',
      anonymous: false
    },
    project: {
      title: {
        ko: '한국 시장 진출 전략 수립 및 실행',
        en: 'Korea Market Entry Strategy & Execution'
      },
      category: 'market-entry',
      duration: '2024.01 - 2024.06'
    },
    results: {
      primary: {
        ko: '6개월 만에 한국 DeFi TVL 3위 달성',
        en: 'Achieved 3rd place in Korean DeFi TVL within 6 months'
      },
      metrics: ['TVL $500M+', '한국 사용자 10,000+', '파트너십 5개']
    },
    story: {
      brief: {
        ko: '글로벌 DeFi 프로토콜의 한국 시장 진출을 위한 종합적인 전략을 수립하고 실행했습니다. 현지화, 규제 대응, 마케팅 캠페인을 통해 빠른 성장을 달성했습니다.',
        en: 'Developed and executed a comprehensive strategy for a global DeFi protocol to enter the Korean market. Achieved rapid growth through localization, regulatory compliance, and targeted marketing campaigns.'
      },
      tags: ['DeFi', 'Market Entry', 'Localization']
    },
    featured: true
  },
  {
    id: '2',
    client: {
      name: 'Korean Enterprise B',
      anonymous: false
    },
    project: {
      title: {
        ko: 'Web3 사업 파트너십 구축',
        en: 'Web3 Business Partnership Development'
      },
      category: 'partnership',
      duration: '2023.09 - 2024.03'
    },
    results: {
      primary: {
        ko: 'Fortune 500 기업과 전략적 파트너십 체결',
        en: 'Strategic partnership with Fortune 500 company'
      },
      metrics: ['계약 규모 50억원', 'PoC 3건 완료', '공동 제품 출시']
    },
    story: {
      brief: {
        ko: '국내 대기업의 Web3 전환을 위한 글로벌 파트너십 구축을 지원했습니다. 기술 검증부터 계약 협상까지 전 과정을 성공적으로 이끌었습니다.',
        en: 'Supported a Korean enterprise in establishing global partnerships for Web3 transformation. Successfully managed the entire process from technical validation to contract negotiation.'
      },
      tags: ['Partnership', 'Enterprise', 'PoC']
    },
    featured: true
  },
  {
    id: '3',
    client: {
      name: 'Web3 Startup C',
      anonymous: false
    },
    project: {
      title: {
        ko: '시리즈 A 투자 유치 지원',
        en: 'Series A Fundraising Support'
      },
      category: 'investment',
      duration: '2023.06 - 2023.12'
    },
    results: {
      primary: {
        ko: '$15M 시리즈 A 라운드 성공적 마감',
        en: 'Successfully closed $15M Series A round'
      },
      metrics: ['투자금 $15M', '밸류에이션 $100M', '투자자 8곳']
    },
    story: {
      brief: {
        ko: 'Web3 스타트업의 시리즈 A 투자 유치를 위한 전략 수립, IR 자료 작성, 투자자 미팅 주선을 통해 목표 금액을 초과 달성했습니다.',
        en: 'Exceeded fundraising targets through strategic planning, IR deck preparation, and investor meeting facilitation for a Web3 startup.'
      },
      tags: ['Investment', 'Series A', 'Startup']
    },
    featured: false
  },
  {
    id: '4',
    client: {
      name: 'NFT Platform D',
      anonymous: false
    },
    project: {
      title: {
        ko: '규제 대응 및 라이선스 취득',
        en: 'Regulatory Compliance & Licensing'
      },
      category: 'legal',
      duration: '2023.03 - 2023.09'
    },
    results: {
      primary: {
        ko: '국내 최초 NFT 거래소 정식 라이선스 취득',
        en: 'First official NFT exchange license in Korea'
      },
      metrics: ['라이선스 취득', '규제 준수 100%', '운영 승인']
    },
    story: {
      brief: {
        ko: 'NFT 플랫폼의 한국 규제 대응을 지원하여 정식 라이선스를 취득했습니다. 법률 자문부터 당국 협의까지 모든 과정을 성공적으로 완료했습니다.',
        en: 'Supported NFT platform in obtaining official license through comprehensive regulatory compliance, from legal consultation to authority negotiations.'
      },
      tags: ['Legal', 'NFT', 'Compliance']
    },
    featured: false
  },
  {
    id: '5',
    client: {
      name: 'GameFi Project E',
      anonymous: false
    },
    project: {
      title: {
        ko: '한국 커뮤니티 구축 및 마케팅',
        en: 'Korean Community Building & Marketing'
      },
      category: 'marketing',
      duration: '2024.02 - 2024.08'
    },
    results: {
      primary: {
        ko: '한국 유저 50,000명 달성',
        en: 'Achieved 50,000 Korean users'
      },
      metrics: ['유저 50,000+', 'DAU 5,000+', '커뮤니티 성장률 300%']
    },
    story: {
      brief: {
        ko: 'GameFi 프로젝트의 한국 커뮤니티 구축과 마케팅 캠페인을 진행했습니다. 인플루언서 마케팅과 이벤트를 통해 빠른 유저 증가를 달성했습니다.',
        en: 'Built Korean community and executed marketing campaigns for GameFi project. Achieved rapid user growth through influencer marketing and events.'
      },
      tags: ['GameFi', 'Marketing', 'Community']
    },
    featured: false
  },
  {
    id: '6',
    client: {
      name: 'L2 Solution F',
      anonymous: true
    },
    project: {
      title: {
        ko: '한국 개발자 생태계 구축',
        en: 'Korean Developer Ecosystem Building'
      },
      category: 'market-entry',
      duration: '2023.11 - 2024.05'
    },
    results: {
      primary: {
        ko: '한국 개발자 1,000명+ 온보딩',
        en: 'Onboarded 1,000+ Korean developers'
      },
      metrics: ['개발자 1,000+', '해커톤 3회', 'dApps 50+']
    },
    story: {
      brief: {
        ko: 'L2 솔루션의 한국 개발자 생태계 구축을 지원했습니다. 교육 프로그램, 해커톤, 그랜트 프로그램을 통해 활발한 개발자 커뮤니티를 조성했습니다.',
        en: 'Supported L2 solution in building Korean developer ecosystem through education programs, hackathons, and grant programs.'
      },
      tags: ['L2', 'Developer', 'Ecosystem']
    },
    featured: false
  }
]

export function getPortfolioCases(): PortfolioCase[] {
  return portfolioCases
}

export function getFeaturedCases(): PortfolioCase[] {
  return portfolioCases.filter(c => c.featured)
}

export function getCasesByCategory(category: string): PortfolioCase[] {
  return portfolioCases.filter(c => c.project.category === category)
}

export const portfolioStats = {
  totalProjects: 50,
  totalInvestment: '100억원+',
  partnerships: 30,
  successRate: 95
}