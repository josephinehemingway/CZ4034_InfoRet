import React from "react";
import Reddit from './../assets/reddit-logo.png'
import {StyledHeading, StyledText, StyledLabel, StyledLink } from "./StyledText";
import './Styles.css';
import moment from 'moment';
import {SENTIMENT, SENTIMENTS_STYLES_MAP} from "../utils/const";
import {ResponseRedditSubmissions} from "../utils/interfaces";
import {Tag} from 'antd'

type Props = {
    result: ResponseRedditSubmissions
    sentiment: number;
};

const ResultsCard: React.FC<Props> = ({result, sentiment}) => {

    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    let sentimentString = SENTIMENT[sentiment.toString()]
    let sentimentCol = SENTIMENTS_STYLES_MAP[sentimentString]

    return (
        <div className={"results-card"} draggable>
            <div className={'source-desc'}>
                <img width={'50px'} src={Reddit} alt={'reddit'}/>
                <div className={'text-desc'}>
                    <StyledHeading fontsize={'15px'} bottom={'0.25rem'} align={'start'}>
                        {result.author}
                    </StyledHeading>
                    <StyledHeading fontsize={'15px'} bottom={'0'} align={'start'}>
                        REDDIT | r/{result.subreddit}
                    </StyledHeading>
                </div>
                <div className={'sentiment'}>
                    <StyledLabel color={sentimentCol}>
                        {sentimentString}
                    </StyledLabel>
                </div>
            </div>

            <StyledLabel fontsize={'14px'} bottom={'0.25rem'}>
                {moment(result.date, 'DD/M/YY H:mm').format('ddd, D MMMM YYYY [at] h:mmA')}
            </StyledLabel>

            <Tag color={'blue'} style={{marginBottom: '1rem'}}>
                {result.tags}
            </Tag>

            <StyledHeading align={'start'}>{result.title}</StyledHeading>
            <StyledText>{result.text}</StyledText>

            { regex.test(result.link) &&
                <img width={'50%'} src={result.link} alt="link" />
            }

            <div className={'footer'}>
                <div className={'metadata'}>
                    <StyledLabel right={'0.5rem'}>
                        Score:
                        {result.score}
                    </StyledLabel>
                    <StyledLabel right={'0.5rem'}>
                        Upvote Ratio:
                        {result.upvote_ratio}
                    </StyledLabel>
                    <StyledLabel right={'0.5rem'}>
                        Comments:
                        {result.num_comments}
                    </StyledLabel>
                </div>
                <StyledLink href={`https://${result.url}`}
                            target="_blank"
                            rel="noopener noreferrer">View more</StyledLink>
            </div>

        </div>
    )
};

export default ResultsCard;
