import { useEffect } from "react";

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
  return <></>;
}
