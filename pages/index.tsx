import { GetStaticProps } from 'next'
import { getApi } from '../libs/api'

interface Props {
  api: {
    genesisHash: string
  }
}

export default function Home({api}: Props)  {
  return (
    <div className="">
      <h1>peaqScan</h1>
      <p>{api.genesisHash}</p>
    </div>
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



