import dynamic from 'next/dynamic';
import Container from '../components/Container';
const AddPost = dynamic(() =>  import("../components/post/AddPost"), {
  ssr: false
})

export default async function Dashboard() {

  return (
    <Container>
      <AddPost />
    </Container>
  )
}