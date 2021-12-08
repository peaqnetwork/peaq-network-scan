import { GetStaticProps } from 'next'
import Layout from '../components/layout/layout'
import NavHeader from '../components/nav-header/nav-header'
import { getApi } from '../libs/api'

interface Props {
  api: {
    genesisHash: string
  }
}

export default function Home({api}: Props)  {
  return (
    <Layout>
      <NavHeader />
      <div className="section top-section">
        <h1>peaqScan</h1>
        <p>{api.genesisHash}</p>
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



