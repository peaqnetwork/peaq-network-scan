import styles from './validators.module.css'

export default function Validators(){
  return (
    <div className={styles.validatorsContainer}>
      <div className="d-flex justify-content-space-between">
        <h3>Validators</h3>
        <a href="/validators" className="button small">All</a>
      </div>
      <div>
        <table className="table">
            <thead>
              <tr>
                <th>Validator</th>
                <th>Self-bonded</th>
                <th>Total-bonded</th>
                <th>Nominator</th>
                <th>Commission</th>
                <th>Grandpa Vote</th>
                <th>Reward point</th>
                <th>Latest Mining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className=""> <span className="text-accent-purple">0xcd2d8b2cb...</span></td>
                <td className="text-dark-white">1 PEAQ</td>
                <td className="text-dark-white">4,283,232.234 PEAQ</td>
                <td className="text-accent-purple">12</td>
                <td className="text-dark-white">1.00%</td>
                <td className="text-dark-white">1421</td>
                <td className="text-dark-white">1820</td>
                <td className="text-accent-purple">8012377</td>
              </tr>
              <tr>
                <td className=""> <span className="text-accent-purple">0xcd2d8b2cb...</span></td>
                <td className="text-dark-white">1 PEAQ</td>
                <td className="text-dark-white">4,283,232.234 PEAQ</td>
                <td className="text-accent-purple">12</td>
                <td className="text-dark-white">1.00%</td>
                <td className="text-dark-white">1421</td>
                <td className="text-dark-white">1820</td>
                <td className="text-accent-purple">8012377</td>
              </tr>
              <tr>
                <td className=""> <span className="text-accent-purple">0xcd2d8b2cb...</span></td>
                <td className="text-dark-white">1 PEAQ</td>
                <td className="text-dark-white">4,283,232.234 PEAQ</td>
                <td className="text-accent-purple">12</td>
                <td className="text-dark-white">1.00%</td>
                <td className="text-dark-white">1421</td>
                <td className="text-dark-white">1820</td>
                <td className="text-accent-purple">8012377</td>
              </tr>
              <tr>
                <td className=""> <span className="text-accent-purple">0xcd2d8b2cb...</span></td>
                <td className="text-dark-white">1 PEAQ</td>
                <td className="text-dark-white">4,283,232.234 PEAQ</td>
                <td className="text-accent-purple">12</td>
                <td className="text-dark-white">1.00%</td>
                <td className="text-dark-white">1421</td>
                <td className="text-dark-white">1820</td>
                <td className="text-accent-purple">8012377</td>
              </tr>
              <tr>
                <td className=""> <span className="text-accent-purple">0xcd2d8b2cb...</span></td>
                <td className="text-dark-white">1 PEAQ</td>
                <td className="text-dark-white">4,283,232.234 PEAQ</td>
                <td className="text-accent-purple">12</td>
                <td className="text-dark-white">1.00%</td>
                <td className="text-dark-white">1421</td>
                <td className="text-dark-white">1820</td>
                <td className="text-accent-purple">8012377</td>
              </tr>
              <tr>
                <td className=""> <span className="text-accent-purple">0xcd2d8b2cb...</span></td>
                <td className="text-dark-white">1 PEAQ</td>
                <td className="text-dark-white">4,283,232.234 PEAQ</td>
                <td className="text-accent-purple">12</td>
                <td className="text-dark-white">1.00%</td>
                <td className="text-dark-white">1421</td>
                <td className="text-dark-white">1820</td>
                <td className="text-accent-purple">8012377</td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}