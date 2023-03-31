interface ResponseRedditSubmissions {
    id: string;
    title: string;
    text: string;
    subreddit: string;
    author: string;
    score: number;
    upvote_ratio: number;
    date: string;
    url: string;
    link: string;
    tags: string[];
    num_comments: number;
}

interface KeywordBackgroundMap {
    [key: string]: string;
}

export type { ResponseRedditSubmissions, KeywordBackgroundMap }