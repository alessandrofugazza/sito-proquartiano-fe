import { useEffect } from "react";

export default function PublishedArticles() {
  const fetchArticles = async () => {
    const re = await fetch(`${process.env.REACT_APP_API_URL}/articoli/my-articles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      },
    });
    console.log(await re.json());
  };
  useEffect(() => {
    fetchArticles();
  }, []);
  return <></>;
}
