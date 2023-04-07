interface ResponseApi {
    author: string;
    date: string;
    id: string;
    like_count: number;
    link: string;
    num_comments: number | string;
    post_text: string;
    retweet_count: number;
    score: number;
    sentiment: number;
    source: string;
    subjectivity: number;
    subreddit: string;
    tags: string;
    text: string;
    title: string;
    upvote_ratio: number;
    url: string;
}

interface KeywordBackgroundMap {
    [key: string]: string;
}

interface Sentiment {
    [key: string]: string;
}

interface WordValueMap {
    text: string;
    value: number;
}

export type { ResponseApi, KeywordBackgroundMap, Sentiment, WordValueMap }