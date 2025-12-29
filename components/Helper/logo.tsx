import Image from 'next/image'
import logoSrc from './logo.png'

type LogoProps = {
  isOpen?: boolean
}

const Logo: React.FC<LogoProps> = ({ isOpen = false }) => {
  return (
    <div className='flex items-center'>
      <Image src={logoSrc} alt="Logo" width={96} height={96} className="w-16 sm:w-20 md:w-24 h-auto object-contain drop-shadow-sm" style={{ height: 'auto' }} priority />

    </div>
  )
}

export default Logo
