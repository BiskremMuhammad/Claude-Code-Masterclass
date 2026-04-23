'use client';

import { Clock8, LogOut } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const router = useRouter()
  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push('/login')
  }

  return (
    <div className={styles.siteNav}>
      <nav>
        <header>
          <h1>
            <Link href="/heists">
              P<Clock8 className={styles.logo} size={14} strokeWidth={2.75} />
              cket Heist
            </Link>
          </h1>
          <div>Tiny missions. Big office mischief.</div>
        </header>
        <ul>
          <li>
            <Link href="/heists/create">Create Heist</Link>
          </li>
          {user && (
            <li className={styles.userInfo}>
              <span className={styles.agentLabel}>Agent</span>
              <span className={styles.userName}>{user.name}</span>
            </li>
          )}
          {user && (
            <li>
              <button onClick={handleLogout} className={styles.logoutBtn}>
                <LogOut size={14} />
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}
