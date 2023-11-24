import { useEffect } from "react";
import { Button } from "react-bootstrap";

export default function Profilo() {
  const fetchProfileData = async () => {
    const re = await fetch("http://localhost:3001/admins/profilo", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    });
    console.log(await re.json());
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <div className="d-flex flex-column align-items-start">
      <Button variant="link">Modifica profilo</Button>
      <Button variant="link">Articoli pubblicati</Button>
    </div>
  );
}
