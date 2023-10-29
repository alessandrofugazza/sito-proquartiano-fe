import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

function MyBreadcrumb() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
      <Link to="/">
      Home
      
      </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/news">
          News
        </Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item active>Archivio news</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default MyBreadcrumb;