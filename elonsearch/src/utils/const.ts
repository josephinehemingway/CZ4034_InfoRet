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