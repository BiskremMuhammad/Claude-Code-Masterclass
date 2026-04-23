// Splash page: redirects to /heists when logged in, /login when not.
// Currently rendered as a marketing landing page (auth not yet implemented).

import Link from 'next/link'
import { Clock8, ChevronRight } from 'lucide-react'
import styles from './page.module.css'

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <span className={styles.watermark} aria-hidden="true">CLASSIFIED</span>

      <p className={styles.missionLabel}>
        <span className={styles.statusDot} />
        Mission status: active
      </p>

      <h1 className={styles.title}>
        P<Clock8 className={styles.clock} strokeWidth={2.5} />cket
        <span className={styles.heist}>Heist</span>
      </h1>

      <p className={styles.tagline}>
        Tiny missions.<br />Big office mischief.
      </p>

      <div className={styles.actions}>
        <Link href="/signup" className={styles.primaryBtn}>
          Accept Mission <ChevronRight size={13} strokeWidth={2.5} />
        </Link>
        <Link href="/login" className={styles.ghostBtn}>
          Sign In
        </Link>
      </div>

      <div className={styles.dossier}>
        <span>File #PH-2047</span>
        <span>Clearance: All Staff</span>
        <span>Priority: High</span>
      </div>
    </div>
  )
}
