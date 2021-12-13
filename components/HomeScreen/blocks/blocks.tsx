import styles from './blocks.module.css'

export default function Blocks(){
  return (
    <div className={styles.blocksContainer}>
      <div className={styles.transfers}>
        <div className="d-flex justify-content-space-between">
          <h3>Transfers</h3>
          <a href="/transfers" className="button small">All</a>
        </div>
        <div>
          <table className={styles.table}>
            <tbody>
            <tr>
              <td className="text-large">
                <div>Extrinsic index# <span className="text-accent-purple">787,89,21</span></div>
                <div><span className="text-dark-white text-small">From</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span> <span className="text-dark-white text-small">To</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span></div>
                </td>
              <td>
                <div className="text-dark-white text-small">4 secs ago</div>
                <div className="text-accent-purple text-small">3,5 PEAQ</div>
              </td>
            </tr>
            <tr>
              <td className="text-large">
                <div>Extrinsic index# <span className="text-accent-purple">787,89,21</span></div>
                <div><span className="text-dark-white text-small">From</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span> <span className="text-dark-white text-small">To</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span></div>
                </td>
              <td>
                <div className="text-dark-white text-small">4 secs ago</div>
                <div className="text-accent-purple text-small">3,5 PEAQ</div>
              </td>
            </tr>
            <tr>
              <td className="text-large">
                <div>Extrinsic index# <span className="text-accent-purple">787,89,21</span></div>
                <div><span className="text-dark-white text-small">From</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span> <span className="text-dark-white text-small">To</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span></div>
                </td>
              <td>
                <div className="text-dark-white text-small">4 secs ago</div>
                <div className="text-accent-purple text-small">3,5 PEAQ</div>
              </td>
            </tr>
            <tr>
              <td className="text-large">
                <div>Extrinsic index# <span className="text-accent-purple">787,89,21</span></div>
                <div><span className="text-dark-white text-small">From</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span> <span className="text-dark-white text-small">To</span> <span className="text-accent-purple text-small">0xcd2d8b2cb...</span></div>
                </td>
              <td>
                <div className="text-dark-white text-small">4 secs ago</div>
                <div className="text-accent-purple text-small">3,5 PEAQ</div>
              </td>
            </tr>
            
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.latestBlocks}>
        <div className="d-flex justify-content-space-between">
          <h3>Latest blocks</h3>
          <a href="/blocks" className="button small">All</a>
        </div>
        <div>
          <table className={styles.table}>
            <tbody>
            <tr>
              <td className="text-large">Block# <span className="text-accent-purple">787,89,21</span></td>
              <td className="text-accent-purple text-small">3 Extrinsic</td>
              <td className="text-accent-purple text-small">16 events</td>
              <td className="text-dark-white text-small">4 secs ago</td>
            </tr>
            <tr>
              <td className="text-large">Block# <span className="text-accent-purple">787,89,21</span></td>
              <td className="text-accent-purple text-small">3 Extrinsic</td>
              <td className="text-accent-purple text-small">16 events</td>
              <td className="text-dark-white text-small">4 secs ago</td>
            </tr>
            <tr>
              <td className="text-large">Block# <span className="text-accent-purple">787,89,21</span></td>
              <td className="text-accent-purple text-small">3 Extrinsic</td>
              <td className="text-accent-purple text-small">16 events</td>
              <td className="text-dark-white text-small">4 secs ago</td>
            </tr>
            <tr>
              <td className="text-large">Block# <span className="text-accent-purple">787,89,21</span></td>
              <td className="text-accent-purple text-small">3 Extrinsic</td>
              <td className="text-accent-purple text-small">16 events</td>
              <td className="text-dark-white text-small">4 secs ago</td>
            </tr>
            <tr>
              <td className="text-large">Block# <span className="text-accent-purple">787,89,21</span></td>
              <td className="text-accent-purple text-small">3 Extrinsic</td>
              <td className="text-accent-purple text-small">16 events</td>
              <td className="text-dark-white text-small">4 secs ago</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div style={{clear: 'both'}}></div>
    </div>
  )
}