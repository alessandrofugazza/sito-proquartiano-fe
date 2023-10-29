import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

interface YearArchiveProps {
  year: string;
}


function YearArchive({year}: YearArchiveProps) {
  const months: string[] = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile',
    'Maggio', 'Giugno', 'Luglio', 'Agosto',
    'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  const monthsNumber: string[] = [
    '01', '02', '03', '04',
    '05', '06', '07', '08',
    '09', '10', '11', '12'
  ];
  return(
    <ListGroup >
      {monthsNumber.reverse().map((month, index) => (
        <Link to={`news/${year}/${month}`} key={month} style={{textDecoration: "none"}}>
          <ListGroup.Item>{months.reverse()[index]} {year}</ListGroup.Item>
        </Link>
      ))}
    </ListGroup >
  )
}

export default YearArchive;