import Image from 'next/image'
import Link from 'next/link'
import styles from './nav-header.module.css'
import logo from '../../public/images/logo.svg'

export default function NavHeader(){
  return (
    <nav className={styles.topnav}>
      <div>
        <div className={styles.navLinks}>
          <Link href="/accounts"><a>Accounts</a></Link>
          <Link href="/accounts"><a>Blockchain</a></Link>
          <Link href="/accounts"><a>Staking</a></Link>
          <Link href="/accounts"><a>Governance</a></Link>
          <Link href="/accounts"><a>Tools</a></Link>
        </div>
        <Link href="/"><a><Image className={styles.logo} src={logo} alt="Logo" width="120px" /></a></Link>
        
        <div style={{clear: 'both'}}></div>
      </div>
      <div>
        <div className={styles.search}>
          <input type="text" placeholder="Search" />
        </div>
        <div className={styles.chainInfo}>PEAQ $0.201 (+0.32%)</div>
        <div style={{clear: 'both'}}></div>
      </div>
    </nav>
  )
}