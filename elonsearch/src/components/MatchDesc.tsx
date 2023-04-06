import React from 'react';
import {StyledLabel} from "./StyledText";

type Props ={
    numResults: number;
    duration: number;
    query: string;
    numRows?: number;
}

const MatchDesc: React.FC<Props> = ({numResults, duration, query, numRows}) => {
    return (
        <div className={'match-desc'}>
            {
                numRows ?
                    <StyledLabel right={'0.5rem'}>
                        Showing <b>{numRows}</b> out of <b>{numResults}</b> result{numResults === 1 ? '' : 's'} found for <b>'{query}'</b>
                    </StyledLabel> :
                    <StyledLabel right={'0.5rem'}>
                        <b>{numResults}</b> result{numResults === 1 ? '' : 's'} found for <b>'{query}'</b>
                    </StyledLabel>
            }

            <StyledLabel>
                ({duration} ms)
            </StyledLabel>
        </div>
    );
};

export default MatchDesc;