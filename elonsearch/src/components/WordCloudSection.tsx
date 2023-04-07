import React from 'react';
import { StyledHeading } from './StyledText';
import WordCloud from "./WordCloud";
import {WordValueMap} from "../utils/interfaces";

type Props = {
    words: WordValueMap[]
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