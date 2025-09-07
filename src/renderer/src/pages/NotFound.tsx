import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h2>404 - Not Found</h2>
      <p>Not exists Requested page</p>
      <Link to="/">back home</Link>
    </div>
  );
};

export default NotFound;
