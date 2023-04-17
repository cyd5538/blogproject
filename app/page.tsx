import getCurrentUser from "./actions/getCurrentUser";
import Container from "./components/Container";
import AllPosts from "./components/post/AllPosts";


export default async function Home() {
  const currentUser = await getCurrentUser()
  return (
    <Container>
      <AllPosts currentUserId={currentUser?.id}/>
    </Container>
  )
}
