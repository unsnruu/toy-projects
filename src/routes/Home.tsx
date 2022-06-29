import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Link to="/counter">Counter</Link>
      <Link to="/dragndrop">drag and drop</Link>
    </div>
  );
}

export default Home;
