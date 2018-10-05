import Tag from "./tag";
import Comment from "./comment";

export default class Post {
    id: number;
    name: string = "";
    content: string = "";
    categoryid: number = 0;
    categoryname: string;
    datepublished: Date;
    authorid: number;
    authorname: string;
    previewimage: string;
    public: boolean;
    commentcount: number;
    favoritecount: number;
    favorites: number[];
    comments: Comment[];
    tags: Tag[];
};