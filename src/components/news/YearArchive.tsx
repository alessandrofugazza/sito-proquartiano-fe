import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

interface YearArchiveProps {
  year: string;
}


function YearArchive({year}: YearArchiveProps) {

  let months: string[] = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile',
    'Maggio', 'Giugno', 'Luglio', 'Agosto',
    'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];

  let monthsNumber: string[] = [
    '01', '02', '03', '04',
    '05', '06', '07', '08',
    '09', '10', '11', '12'
  ];

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear().toString();
  const currentMonthIndex = currentDate.getMonth();

  if (year === currentYear) {
    months = months.slice(0, currentMonthIndex + 1).reverse();
    monthsNumber = monthsNumber.slice(0, currentMonthIndex + 1).reverse();
  } else {
    months.reverse();
    monthsNumber.reverse();
  }

  return(
    <ListGroup >
      {months.map((month, index) => (
        <Link to={`news/${year}/${monthsNumber[index]}`} key={monthsNumber[index]} style={{textDecoration: "none"}}>
          <ListGroup.Item>{month} {year}</ListGroup.Item>
        </Link>
      ))}
    </ListGroup >
  )
}

export default YearArchive;