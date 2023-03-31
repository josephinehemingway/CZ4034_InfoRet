import React from 'react';
import './Styles.css'
import {StyledHeading} from "./StyledText";

const SentimentSection = () => {
    return (
        <div className={'sentiment-card'}>
            <StyledHeading>Sentiment Scores</StyledHeading>
        </div>
    );
};

export default SentimentSection;