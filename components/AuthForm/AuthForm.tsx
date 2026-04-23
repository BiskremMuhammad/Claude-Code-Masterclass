'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import styles from './AuthForm.module.css';

type Mode = 'login' | 'signup';

export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const { login, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setIsPending(true);
    try {
      if (mode === 'signup') {
        await signup(email, name || email.split('@')[0], password);
      } else {
        await login(email, password);
      }
      router.push('/heists');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.tabs}>
        <Link
          href="/login"
          className={`${styles.tab} ${mode === 'login' ? styles.activeTab : ''}`}
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className={`${styles.tab} ${mode === 'signup' ? styles.activeTab : ''}`}
        >
          Sign Up
        </Link>
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <span className={styles.badge}>MISSION ACCESS</span>
          <h2>{mode === 'login' ? 'Welcome Back, Agent' : 'Join the Crew'}</h2>
          <p className={styles.subtitle}>
            {mode === 'login'
              ? 'Enter your credentials to access your missions.'
              : 'Create your account to start your first heist.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {mode === 'signup' && (
            <div className={styles.field}>
              <label htmlFor="name">Agent Name <span className={styles.optional}>(optional)</span></label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
          )}

          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="agent@email.com"
              required
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && <p className={styles.error} role="alert">{error}</p>}

          <button type="submit" className={styles.submit} disabled={isPending}>
            {isPending
              ? 'Loading…'
              : mode === 'login'
              ? 'Access Mission Files'
              : 'Initiate Mission'}
          </button>
        </form>
      </div>
    </div>
  );
}
