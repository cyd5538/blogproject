import dynamic from "next/dynamic";
import Container from "../../components/Container"
import getCurrentUser from "@/app/actions/getCurrentUser";
const BlogPosts = dynamic(() =>  import("@/app/components/blog/BlogPosts"), {
  ssr: false
})

export default async function Home() {
  const currentUser = await getCurrentUser()

  return (
    <Container>
      <BlogPosts currentUser={currentUser}/>
    </Container>
  )
}
