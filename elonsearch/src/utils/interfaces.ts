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
    source: string;
}

interface ResponseRedditComments {
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
    source: string;
}

interface ResponseTwitter {
    tweet_id: string;
    username: string;
    text: string;
    retweet_count: number;
    like_count: number;
    datetime: string;
    url: string;
    source: string;
}

interface KeywordBackgroundMap {
    [key: string]: string;
}

interface Sentiment {
    [key: string]: string;
}

export type { ResponseRedditSubmissions, KeywordBackgroundMap, Sentiment }