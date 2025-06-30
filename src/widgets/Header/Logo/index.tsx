import styles from './Logo.module.css';

interface LogoProps {
  onClick: () => void;
}

export default function Logo({ onClick }: LogoProps) {
  return (
    <div className={styles.logoContainer} onClick={onClick}>
      <span className={styles.logo}>Bookstore</span>
    </div>
  );
}
