export interface IArticlesApiResponse {
    content: IArticleApiResponse[];
}

export interface IArticleApiResponse {
    id: string;
    title: string;
    author: IAuthor;
    date: string;
    content: string;
    categories: ICategory[];
    tags: ITag[];
}

export interface IAuthor {
    id: string;
    username: string;
    email: string;
}

export interface ICategory {
    id: string;
    name: string;
}

export interface ITag {
    id: string;
    name: string;
}