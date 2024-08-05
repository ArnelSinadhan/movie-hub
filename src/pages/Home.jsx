import { Container, Row, Col, Button } from "react-bootstrap";
import GetMovies from "../components/GetMovies";
export default function Home() {
  return (
    <>
      <Container fluid className="hero">
        <Row className="heroRow">
          <Col lg={12} className="text-center">
            <Button className="watchNowBtn">
              Watch Now
              <i className="fa-solid fa-circle-play"></i>
            </Button>
            <Button className="watchLaterBtn">
              Watch Later
              <i className="fa-regular fa-clock"></i>
            </Button>
            <div className="titleWrapper mt-5">
              <h3>Avatar: The Way of Water</h3>
              <p>
                Set more than a decade after the events of the first film, learn
                the story of the Sully family (Jake, Neytiri, and their kids),
                the trouble that follows them, the lengths they go to keep each
                other safe, the battles they fight to stay alive, and the
                tragedies they endure.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid className="heroContainer2">
        <GetMovies />/
      </Container>
    </>
  );
}
