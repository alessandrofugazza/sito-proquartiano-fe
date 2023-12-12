export interface IArticlesApiResponse {
    content: IArticleApiResponse[];
}

export interface IArticleApiResponse {
    id: string;
    title: string;
    author: IAuthor;
    date: string;
    eventDate: string;
    content: string;
    section: string;
    categories: ICategory[];
    tags: ITag[];
    img: string[];
    pdf: string[];
}

export interface IAuthor {
    id: string;
    signature: string;
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