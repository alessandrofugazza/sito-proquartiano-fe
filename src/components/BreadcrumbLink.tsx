import { Link } from "react-router-dom";

interface BreadcrumbLinkProps {
  to: string;
  children: string;
}

function BreadcrumbLink({ to, children }: BreadcrumbLinkProps) {
  return (
    <div className="breadcrumb-item">
      <Link to={to}>{children}</Link>
    </div>
  );
}

export default BreadcrumbLink;
