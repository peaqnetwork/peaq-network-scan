
import styles from './snapshot.module.css'

export default function Snapshot(){
  return (
    <div className={styles.snapshot}>
      <div className={styles.snapshotRow}>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Finalized Blocks</p>
          <p className={styles.snapshotValue}>7,784,893</p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Signed Extrinsics</p>
          <p className={styles.snapshotValue}>5,784,893</p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Transfers</p>
          <p className={styles.snapshotValue}>7,784,893</p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Holders</p>
          <p className={styles.snapshotValue}>7,784,893</p>
        </div>
      </div>
      <div className={styles.snapshotRow}>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Total Issuance</p>
          <p className={styles.snapshotValue}>1,343B</p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Staked Vaue</p>
          <p className={styles.snapshotValue}>892,2M(34%)</p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Validators</p>
          <p className={styles.snapshotValue}>297/291</p>
        </div>
        <div className={styles.snapshotItem}>
          <p className={styles.snapshotLabel}>Inflation Rate</p>
          <p className={styles.snapshotValue}>7.87%</p>
        </div>
      </div>
    </div>
  )
}