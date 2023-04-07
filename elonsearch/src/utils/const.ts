import tesla from "../assets/bg/tesla.jpeg";
import twitter from "../assets/bg/twitter.png";
import spacex from "../assets/bg/spacex.jpeg";
import starlink from "../assets/bg/starlink.webp";
import {KeywordBackgroundMap, Sentiment} from "./interfaces";

export const DATEFORMAT = "ddd, D MMMM YYYY [at] h:mmA"
export const INPUT_DATE_FORMAT = "DD/MM/YY HH:mm"

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

export const SOURCE_MAP = {
    'Reddit Submissions': 'reddit_sub',
    'Reddit Comments': 'reddit_cmt',
    'Twitter': 'twitter',
}

export const FILTER_SOURCE_OPTIONS = [
    'Reddit Submissions',
    'Reddit Comments',
    'Twitter'
]

export const FILTER_SENTIMENT_OPTIONS = [
    'Negative',
    'Neutral',
    'Positive'
]

export const FILTER_SUBJECTIVITY_OPTIONS = [
    'Subjective',
    'Objective'
]

export const SORTING_OPTIONS = [
    {
        label: 'Most Relevant',
        value: 'score desc'
    },
    {
        label: 'Newest',
        value: 'date desc'
    },
    {
        label: 'Oldest',
        value: 'date asc'
    },
    {
        label: 'Most Upvoted',
        value: 'net_upvotes desc'
    },
    {
        label: 'Most Liked',
        value: 'like_count desc'
    },
    {
        label: 'Most Retweets',
        value: 'retweet_count desc'
    },
    {
        label: 'Most Comments',
        value: 'num_comments desc'
    },
]