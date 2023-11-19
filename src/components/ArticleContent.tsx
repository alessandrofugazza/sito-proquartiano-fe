import ArticleCategories from "./shared-components/ArticleCategories";
import ArticleDateAuthorTag from "./shared-components/ArticleDateAuthorTag";

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
      <p>{content}</p>
      <img src={img} alt="" />
      <embed src={pdf} type="application/pdf" width="600" height="400" />
    </>
  );
}
