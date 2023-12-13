export interface IArticlePostBody {
  title: string;
  eventDate: Date | null;
  content: string;
  categories: string[];
  tags: string[];
  section: string;
}