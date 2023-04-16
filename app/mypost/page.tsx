import { getServerSession } from "next-auth/next"
import { authOptions } from "../../pages/api/auth/[...nextauth]"
import Container from "../components/Container";
import Mypost from "../components/mypost/Mypost";
import getCurrentUser from "../actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser()

  return (
    <Container>
      <Mypost currentUser={currentUser}/>
    </Container>
  );
}
