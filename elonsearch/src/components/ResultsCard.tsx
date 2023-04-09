import React from "react";
import {
    StyledHeading,
    StyledText,
    StyledLabel,
    StyledLink,
} from "./StyledText";
import "./Styles.css";
import moment from "moment";
import {DATEFORMAT, INPUT_DATE_FORMAT, SENTIMENT, SENTIMENTS_STYLES_MAP} from "../utils/const";
import { ResponseApi } from "../utils/interfaces";
import { Tag } from "antd";
import Reddit from "./../assets/reddit-logo.png";
import Twitter from "./../assets/twitter-logo.webp";
import Icon from "@mdi/react";
import {
    mdiRepeatVariant,
    mdiHeartOutline,
    mdiCommentOutline,
    mdiArrowUpBold,
} from "@mdi/js";

type Props = {
    result: ResponseApi;
    sentiment: number;
};

const ResultsCard: React.FC<Props> = ({ result, sentiment}) => {
    let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);
    let sentimentString = SENTIMENT[sentiment.toString()];
    let sentimentCol = SENTIMENTS_STYLES_MAP[sentimentString];

    return (
        <div className={"results-card"}>
            <div className={"source-desc"}>
                <img
                    width={"50px"}
                    src={result.source[0] === "twitter" ? Twitter : Reddit}
                    alt={"source"}
                />

                <div className={"text-desc"}>
                    <StyledHeading
                        fontsize={"16px"}
                        bottom={"0.25rem"}
                        align={"start"}
                    >
                        {result.source[0] === "twitter" ? "@" : ""}
                        {result.author}
                    </StyledHeading>
                    <StyledHeading
                        fontsize={"16px"}
                        bottom={"0"}
                        align={"start"}
                    >
                        {result.source[0].startsWith("reddit")
                            ? `REDDIT | r/${result.subreddit}`
                            : "TWITTER"}
                    </StyledHeading>
                </div>

                <div className={"sentiment"}>
                    <StyledLabel align={'end'} color={sentimentCol}>
                        {sentimentString}
                    </StyledLabel>
                </div>
            </div>

            <div className={'footer'}>
                <StyledLabel fontsize={"14px"} bottom={"0.25rem"} style={{whiteSpace: 'nowrap'}}>
                    {moment(result.date, INPUT_DATE_FORMAT).format(DATEFORMAT)}
                </StyledLabel>

                {
                    result.source[0] === 'reddit_sub' && result.tags &&
                    <div className={"tags"}>
                        {eval(result.tags).map((tag: string) => {
                            return (
                            eval(tag).length !== 0 &&
                            (
                                <Tag color={"blue"} style={{ marginLeft: "0.25rem", marginRight: '0', fontSize: '14px'}}>
                                    {eval(tag)}
                                </Tag>
                            )
                            )}
                        )}
                    </div>
                }
            </div>

            {result.source[0] === "reddit_sub" &&
                <StyledHeading align={"start"} bottom={'0.75rem'}>{result.title}</StyledHeading>

            }

            {   result.source[0] === "reddit_sub" ?
                (
                    result.post_text[0] !== '' && result.post_text[0] !== 'NaN' &&
                    <StyledText align={"start"} bottom={'1.5rem'}>{result.post_text}</StyledText>
                ) : (
                    result.text !== '' &&
                    <StyledText align={"start"} bottom={'1.5rem'}>{result.text}</StyledText>
                )
            }

            {regex.test(result.link) && (
                <img width={"50%"} src={result.link} alt="link" style={{marginBottom: '1rem'}}/>
            )}

            <div className={"footer"}>
                {result.source[0].startsWith("reddit") ? (
                    <div className={"metadata"}>
                        <div className={'metadata-details'}>
                            <Icon path={mdiArrowUpBold} size={0.85}
                                  style={{marginRight: '0.25rem'}}
                            />
                            <StyledLabel right={"0.5rem"} >
                                {result.net_upvotes} { result.source[0] === 'reddit_sub' && `(${(result.upvote_ratio * 100).toString()}%)`}
                            </StyledLabel>
                        </div>

                        {result.source[0] === 'reddit_sub' && (
                            <div className={'metadata-details'}>
                                <Icon path={mdiCommentOutline} size={0.85} style={{marginRight: '0.25rem', }}/>
                                <StyledLabel right={"0.5rem"}>
                                    {result.num_comments}
                                </StyledLabel>
                            </div>
                        )}
                    </div>
                ) :
                    <div className={"metadata"}>
                        <div className={'metadata-details'}>
                            <Icon path={mdiRepeatVariant} size={0.85} style={{marginRight: '0.25rem'}}/>
                            <StyledLabel right={"0.5rem"}>
                                {result.retweet_count}
                            </StyledLabel>
                        </div>

                        <div className={'metadata-details'}>
                            <Icon path={mdiHeartOutline} size={0.85} style={{marginRight: '0.25rem'}}/>
                            <StyledLabel right={"0.5rem"}>
                                {result.like_count}
                            </StyledLabel>
                        </div>
                    </div>
                }

                <StyledLink
                    href={ result.source[0] === 'reddit_sub' ? `https://${result.url}` : result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View original
                </StyledLink>
            </div>
        </div>
    );
};

export default ResultsCard;
