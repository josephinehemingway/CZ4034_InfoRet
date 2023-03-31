import React from 'react';
import {StyledLabel} from "./StyledText";

type Props ={
    numResults: number;
    duration: number;
    query: string;
}

const MatchDesc: React.FC<Props> = ({numResults, duration, query}) => {
    return (
        <div className={'match-desc'}>
            <StyledLabel right={'0.5rem'}>
                <b>{numResults}</b> result{numResults === 1 ? '' : 's'} found for <b>'{query}'</b>
            </StyledLabel>
            <StyledLabel>
                ({duration} ms)
            </StyledLabel>
        </div>
    );
};

export default MatchDesc;