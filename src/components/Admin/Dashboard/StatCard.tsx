import styles from "./StatCard.module.css";

interface StatCardProps {
  title: string;
  value: string | number;
  color: string;
  icon?: React.ReactNode;
}

const StatCard = ({ title, value, color }: StatCardProps) => {
  return (
    <div className={styles.card} style={{ borderLeftColor: color }}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default StatCard;
