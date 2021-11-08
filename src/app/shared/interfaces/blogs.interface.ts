export interface IBlogsResponse{
    id: number;
    title: string;
    postedBy: string;
    imagePath: string;
    text: string;
    date: any;
}

export interface IBlogsRequest{
    title: string;
    postedBy: string;
    imagePath: string;
    text: string;
    date: any;
}