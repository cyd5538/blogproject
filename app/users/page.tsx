
import Container from "../components/Container";
import getCurrentUser from "../actions/getCurrentUser";
import Myprofile from "../components/users/Myprofile";
import EditModal from "../components/Modals/EditModal";
import Mypost from "../components/users/Mypost";

export default async function Home() {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <Myprofile currentUser={currentUser}/>
      <Mypost currentUser={currentUser}/>
      <EditModal />
    </Container>
  )
}
