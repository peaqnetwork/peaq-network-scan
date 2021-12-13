import { GetStaticProps } from 'next'
import Blocks from '../components/HomeScreen/blocks/blocks'
import Layout from '../components/layout/layout'
import Snapshot from '../components/HomeScreen/snapshot/snapshot'
import Validators from '../components/HomeScreen/validators/validators'
import { getApi } from '../libs/api'

interface Props {
  api: {
    genesisHash: string
  }
}

export default function Home({api}: Props)  {
  return (
    <Layout>
      <div className="section top-section">
        <Snapshot />
        <Blocks />
        <Validators />
        {/* <p>{api.genesisHash}</p> */}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const api = await getApi();
  return {
    props: {
      api
    }
  }
}



