import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'radial-gradient(circle at 20% 20%, white 2px, transparent 2px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
            backgroundSize: '100px 100px, 60px 60px',
          }}
        />

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            maxWidth: '1000px',
            textAlign: 'center',
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '120px',
              height: '120px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '60px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                background: 'white',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          </div>

          {/* Main Title */}
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: 'white',
              margin: '0 0 20px 0',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Web3-Korea Bridge
          </h1>

          {/* Subtitle */}
          <h2
            style={{
              fontSize: '32px',
              color: 'rgba(255, 255, 255, 0.9)',
              margin: '0 0 20px 0',
              fontWeight: 'normal',
            }}
          >
            Connect Web3 to Korea
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              margin: '0 0 40px 0',
            }}
          >
            해외 Web3 기업의 한국 진출 파트너
          </p>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '30px',
              justifyContent: 'center',
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            <span>• Consulting Services</span>
            <span>• Market Research</span>
            <span>• Legal Compliance</span>
            <span>• Partnership Support</span>
          </div>
        </div>

        {/* Bottom Brand */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '16px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          web3-korea-bridge.vercel.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}