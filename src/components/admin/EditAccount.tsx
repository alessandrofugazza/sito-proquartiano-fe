import { useEffect, useState } from "react";

interface IProfileData {
  email: string;
  signature: string;
}

export default function EditAccount() {
  const [profileData, setProfileData] = useState<IProfileData | null>(null);
  const fetchProfileData = async () => {
    const re = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    });
    const profileData = await re.json();
    setProfileData(profileData);
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between">
        <span>Email:</span>
        <span>{profileData?.email}</span>
      </div>
      <div className="d-flex justify-content-between">
        <span>Username:</span>
        <span>{profileData?.signature}</span>
      </div>
    </>
  );
}
