import BlogPosts from "@/app/components/blog/BlogPosts";
import Container from "../../components/Container"
import getCurrentUser from "@/app/actions/getCurrentUser";


export default async function Home() {
  const currentUser = await getCurrentUser()

  return (
    <Container>
      <BlogPosts currentUser={currentUser}/>
    </Container>
  )
}
