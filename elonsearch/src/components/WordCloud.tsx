import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import {WORD_VALUE_MAP} from "../utils/const";

type Props = {
    words: string[]
}

const WordCloud: React.FC<Props> = ({words}) => {

    console.log(words)

    const callbacks = {
        // getWordColor: (word: { value: number; }) => word.value > 50 ? "blue" : "red",
        onWordClick: console.log,
        onWordMouseOver: console.log,
        getWordTooltip: (word: { text: any; value: number; }) => `${word.text} (${word.value})`,
    }
    const options = {
        rotations: 2,
        rotationAngles: [-90, 0],
        fontFamily: 'Inter-Bold',
        fontSizes: [10,50],
        scale: 'log',
        colors: ['#CDDC9C', '#9C9EDE', '#E7BA51',
                 '#E7969B', '#B6CE6B', '#E7CB94',
                 '#DD9ED6', '#73c7c7']
        // Spiral: 'archimedean'
    };

    const size = [279.55, 300];

    return (
        <ReactWordcloud
            // @ts-ignore
            callbacks={callbacks} options={options} size={size} words={WORD_VALUE_MAP}
            minSize={[200, 200]}
        />
    );
};

export default WordCloud;