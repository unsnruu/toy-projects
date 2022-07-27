import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  return (
    <HomeWrapper>
      <Link to="/counter">Counter</Link>
      <Link to="/dragndrop">drag and drop</Link>
      <Link to="/templatemaker">template maker</Link>
      <Link to="/autobanner">auto banner</Link>
      <Link to="/switch">switch</Link>
      <Link to="/draggablebar">draggable bar</Link>
    </HomeWrapper>
  );
}

export default Home;
