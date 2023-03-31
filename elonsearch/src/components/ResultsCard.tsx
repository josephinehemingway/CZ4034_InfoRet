import React from "react";
import Reddit from './../assets/reddit-logo.png'
import {StyledHeading, StyledText, StyledLabel, StyledLink } from "./StyledText";
import './Styles.css';

type Props = {
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
    sentiment: number;
};

const ResultsCard: React.FC<Props> = ({
    id,
    title,
    text,
    subreddit,
    author,
    score,
    upvote_ratio,
    date,
    url,
    link,
    tags,
    num_comments,
    sentiment
}) => {

    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);

    return (
        <div className={"results-card"} draggable>
            <div className={'source-desc'}>
                <img width={'50px'} src={Reddit} alt={'reddit'}/>
                <div className={'text-desc'}>
                    <StyledHeading fontsize={'16px'} bottom={'0.25rem'} align={'start'}>
                        {author}
                    </StyledHeading>
                    <StyledHeading fontsize={'16px'} bottom={'0'} align={'start'}>
                        REDDIT | r/{subreddit}
                    </StyledHeading>
                </div>
                <div className={'sentiment'}>
                    <StyledLabel>POSITIVE</StyledLabel>
                </div>
            </div>
            <StyledLabel fontsize={'14px'} bottom={'0.5rem'}>{date}</StyledLabel>
            <StyledHeading align={'start'}>{title}</StyledHeading>
            <StyledText>{text}</StyledText>

            { regex.test(link) &&
                <img width={'50%'} src={link} alt="link" />
            }

            <StyledLink href={`https://${url}`}
                        target="_blank"
                        rel="noopener noreferrer">View more</StyledLink>
        </div>
    )
};

export default ResultsCard;
