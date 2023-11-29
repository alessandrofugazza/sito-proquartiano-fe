import ArticleCategories from "./shared-components/ArticleCategories";
import ArticleDateAuthorTag from "./shared-components/ArticleDateAuthorTag";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface IArticleContentProps {
  author: string;
  date: string;
  content: string;
  categories: string[];
  tags: string[];
  img: string;
  pdf: string;
}

// todo display pdf from cloudinary. wasted 2 hrs on this
export default function ArticleContent({ author, date, content, categories, tags, img, pdf }: IArticleContentProps) {
  return (
    <>
      <ArticleCategories categories={categories} />
      <ArticleDateAuthorTag date={date} author={author} tags={tags} />
      {/* <p>{content}</p> */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <img src={img} alt="" className="img-fluid" />

      {/* <embed src="https://www.africau.edu/images/default/sample.pdf" type="application/pdf" width="600" height="400" /> */}
      {/* <embed src={pdf} type="application/pdf" width="100%" height="600" style={{ border: "none" }}></embed> */}
      {/* <embed
        src="https://res.cloudinary.com/dij3rpuyk/raw/upload/v1701218710/gclkbu2xpul1bgmdwt1g"
        type="application/pdf"
        width="100%"
        height="600"
        style={{ border: "none" }}
      ></embed> */}
      {/* <iframe
        src="https://res.cloudinary.com/dij3rpuyk/raw/upload/v1701218710/gclkbu2xpul1bgmdwt1g"
        width="600"
        height="400"
      ></iframe> */}
    </>
  );
}
