import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import '../styles/MyBreadcrumb.scss'

function MyBreadcrumb() {
  const location = useLocation();
  const pathnames: string[] = location.pathname.split('/').filter(item => item);
  let page: string = '';
  if (pathnames.length > 0) {
    const lastElement = pathnames.pop();
    page = lastElement ? lastElement.replace('-', ' ') : '';
  }

  
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={to}>
            <Link to={to}>{(value.charAt(0).toUpperCase() + value.slice(1)).replace('-', ' ')}</Link>
          </Breadcrumb.Item>
        );
      })}
      <Breadcrumb.Item active>{page.charAt(0).toUpperCase() + page.slice(1)}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default MyBreadcrumb;