import { useDispatch } from "react-redux";
import { ADD_TO_FAVORITES, addToFavoritesAction } from "../redux/actions";
import ArticleCategories from "./shared-components/ArticleCategories";
import ArticleDateAuthorTag from "./shared-components/ArticleDateAuthorTag";
import { IArticleApiResponse } from "../interfaces/IArticleApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface IArticleContentProps {
  author: string;
  date: string;
  content: string;
  categories: string[];
  tags: string[];
  img: string;
  pdf: string;
}

// export default function ArticleContent({ author, date, content, categories, tags, img, pdf }: IArticleContentProps) {
//   return (
//     <div className="position-relative">
//       <ArticleCategories categories={categories} />
//       <ArticleDateAuthorTag date={date} author={author} tags={tags} />
//       <div dangerouslySetInnerHTML={{ __html: content }} />
//       <img src={img} alt="" className="img-fluid" />
//       <embed src={pdf} type="application/pdf" width="100%" height="600" style={{ border: "none" }}></embed>
//       <i className="bi bi-star position-absolute" onClick={useDispatch(addToFavoritesAction)}></i>
//     </div>
//   );
// }
interface ArticleContentProps {
  articleData: IArticleApiResponse;
}

export default function ArticleContent() {
  const dispatch = useDispatch();
  const selectedArticle = useSelector((state: RootState) => state.selectedArticle.content);
  const handleAddToFavorites = () => {
    // dispatch(addToFavoritesAction(articleData));
    dispatch({ type: ADD_TO_FAVORITES, payload: selectedArticle });
  };
  return (
    <div className="position-relative">
      <ArticleCategories categories={selectedArticle.categories.map(category => category.name)} />
      <ArticleDateAuthorTag
        date={selectedArticle.date}
        author={selectedArticle.author.signature}
        tags={selectedArticle.tags.map(tag => tag.name)}
      />
      <div dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
      <img src={selectedArticle.img} alt="" className="img-fluid" />
      <embed
        src={selectedArticle.pdf}
        type="application/pdf"
        width="100%"
        height="600"
        style={{ border: "none" }}
      ></embed>
      <i className="bi bi-star position-absolute" onClick={handleAddToFavorites}></i>
    </div>
  );
}
