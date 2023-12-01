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

export default function ArticleContent({ author, date, content, categories, tags, img, pdf }: IArticleContentProps) {
  return (
    <>
      <ArticleCategories categories={categories} />
      <ArticleDateAuthorTag date={date} author={author} tags={tags} />
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <img src={img} alt="" className="img-fluid" />
      <embed src={pdf} type="application/pdf" width="100%" height="600" style={{ border: "none" }}></embed>
    </>
  );
}
