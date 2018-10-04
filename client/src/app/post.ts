import Tag from "./tag";

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
    tags: Tag[];
};