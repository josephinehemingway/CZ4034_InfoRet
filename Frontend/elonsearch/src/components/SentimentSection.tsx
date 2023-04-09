import React from 'react';
import './Styles.css'
import {StyledHeading} from "./StyledText";
import {ResponseApi} from "../utils/interfaces";
import Plot from 'react-plotly.js';

type Props = {
    results: ResponseApi[]
}

const SentimentSection: React.FC<Props> = ({results}) => {
    const layout = {
        margin: {l: 0, r: 0, b: 0, t: 0},
        width: 279.55,
        height: 200,
        paper_bgcolor: 'transparent',
        color: '#fff',
    };

    //@ts-ignore
    const neutral: number = results.filter(d => d.subjectivity[0] === 0).length;
    //@ts-ignore
    const positive: number = results.filter(d => d.subjectivity[0] === 1 && d.sentiment[0] === 1).length;
    //@ts-ignore
    const negative: number = results.filter(d => d.subjectivity[0] === 1 && d.sentiment[0] === -1).length;

    return (
        <div className={'sentiment-card'}>
            <StyledHeading align={'start'} bottom={'0.5rem'}>Sentiment Scores</StyledHeading>
            <Plot data={
                //@ts-ignore
                [
                    {   type: 'sunburst',
                        labels: ['Opinionated', 'Neutral', 'Positive', 'Negative'],
                        parents: ['','', 'Opinionated', 'Opinionated', 'Opinionated'],
                        values: [positive + negative, neutral, positive, negative],
                        branchvalues: 'total',
                        //@ts-ignore
                        textinfo: 'label+percent parent',
                        marker: { colors: ['#F58518','#73c7c7', '#c3ffb5', '#ff3d36'],
                            line: {
                                width: 2,
                            },
                        }
                    },
                ]
            } layout={layout} />
        </div>
    );
};

export default SentimentSection;