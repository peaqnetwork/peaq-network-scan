import Link from 'next/link'
import Image from 'next/image'

import logo from '../../public/images/logo_test.svg'

export default function Footer(){
  return (
    <div className="footer">
      <Link href="/"><a><Image src={logo} alt="Logo" width="120px" /></a></Link>
    </div>
  )
}