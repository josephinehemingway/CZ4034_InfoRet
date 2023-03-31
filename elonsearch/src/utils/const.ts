import tesla from "../assets/bg/tesla.jpeg";
import twitter from "../assets/bg/twitter.png";
import spacex from "../assets/bg/spacex.jpeg";
import starlink from "../assets/bg/starlink.webp";
import {KeywordBackgroundMap, Sentiment} from "./interfaces";

export const DATEFORMAT = "ddd, D MMMM YYYY [at] h:mmA"

export const keywordBackgroundMap: KeywordBackgroundMap = {
    'tesla': tesla,
    'twitter': twitter,
    'spacex': spacex,
    'starlink': starlink,
};

export const SENTIMENT: Sentiment = {
    '1': 'POSITIVE',
    '0': 'NEUTRAL',
    '-1': 'NEGATIVE',
}

export const SENTIMENTS_STYLES_MAP: Sentiment = {
    'POSITIVE': 'rgba(122,250,58,0.8)',
    'NEUTRAL': 'rgb(168,173,183)',
    'NEGATIVE': 'rgb(199,70,70)',
}

export const WORD_VALUE_MAP = [
    {
        text: 'told',
        value: 64,
    },
    {
        text: 'mistake',
        value: 11,
    },
    {
        text: 'thought',
        value: 16,
    },
    {
        text: 'bad',
        value: 17,
    },
]

export const DUMMY_REDDIT_RES = [
    {
        id: '12150g4',
        title: 'Liftoff.54321.',
        text: 'Twitter confirmed that roughly 50% of its workforce has been laid off. \\n\\nThis is what will cause advertisers to pull out, at least in the short term. What does any company look like after losing half their employees? Especially a vibrant tech company that needs to stay relevant \\n\\n[https://amp.cnn.com/cnn/2022/11/03/tech/twitter-layoffs/index.html](https://amp.cnn.com/cnn/2022/11/03/tech/twitter-layoffs/index.html)',
        subreddit: 'elonmusk',
        author: 'ZaroonKhan5',
        upvote_ratio: 0.91,
        score: 290,
        url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
        link: 'https://v.redd.it/e72u906e8spa1',
        num_comments: 18,
        tags: ['SpaceX'],
        date: '25/3/23 0:46',
        source: 'reddit_cmt'
    },
    {
        id: '12150g5',
        title: 'Liftoff.54321.',
        text: '',
        subreddit: 'elonmusk',
        author: 'ZaroonKhan5',
        upvote_ratio: 0.91,
        score: 290,
        url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
        link: 'https://i.redd.it/x3tffx02ljy91.jpg',
        num_comments: 18,
        tags: ['SpaceX', 'Twitter'],
        date: '25/3/23 0:46',
        source: 'twitter'
    },
    {
        id: '12150g6',
        title: 'Liftoff.54321.',
        text: 'Twitter confirmed that roughly 50% of its workforce has been laid off. \\n\\nThis is what will cause advertisers to pull out, at least in the short term. What does any company look like after losing half their employees? Especially a vibrant tech company that needs to stay relevant \\n\\n[https://amp.cnn.com/cnn/2022/11/03/tech/twitter-layoffs/index.html](https://amp.cnn.com/cnn/2022/11/03/tech/twitter-layoffs/index.html)',
        subreddit: 'elonmusk',
        author: 'ZaroonKhan5',
        upvote_ratio: 0.91,
        score: 290,
        url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
        link: 'https://i.redd.it/4ltf63wfh2y91.png',
        num_comments: 18,
        tags: ['SpaceX'],
        date: '25/3/23 0:46',
        source: 'reddit_sub'
    },
]

export const DUMMY_STARLINK= [
    {
        id: '12150g7',
        title: 'Starlink',
        text: '',
        subreddit: 'elonmusk',
        author: 'ZaroonKhan5',
        upvote_ratio: 0.91,
        score: 290,
        url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
        link: 'https://v.redd.it/e72u906e8spa1',
        num_comments: 18,
        tags: ['SpaceX'],
        date: '25/3/23 0:46',
        source: 'reddit_cmt'
    },
]