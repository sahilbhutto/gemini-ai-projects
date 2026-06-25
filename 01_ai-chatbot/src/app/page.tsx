import ChatInterface from "../components/ChatInterface"
import Container from "../components/Container"
import Sidebar from "../components/Sidebar"

const Home = () => {
  return (
    <Container>
      <Sidebar/>
      <ChatInterface/>
    </Container>
  )
}

export default Home