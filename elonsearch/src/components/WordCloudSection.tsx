import React from 'react';
import { StyledHeading } from './StyledText';
import WordCloud from "./WordCloud";

type Props = {
    words: string[]
}

const WordCloudSection: React.FC<Props> = ({words}) => {
    return (
        <div className={'wordcloud-section'}>
            <StyledHeading align={'start'}>
                Word Cloud
            </StyledHeading>
            <WordCloud words={words}/>
        </div>
    );
};

export default WordCloudSection;