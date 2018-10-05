export default class Comment {
    id: number;
    name: string = "";
    content: string = "";
    postid: number;
    commenterid: number;
    commentername: string;
    datecommented: Date;
    children: Comment[];
};