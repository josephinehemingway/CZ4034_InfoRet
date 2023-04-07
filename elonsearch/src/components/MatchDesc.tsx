import React from 'react';
import {StyledLabel, StyledLink} from "./StyledText";

type Props ={
    numResults: number;
    duration: number;
    query: string;
    numRows?: number;
    suggestion?: string;
    onClickKeyword: (input: string) => void,
}

const MatchDesc: React.FC<Props> = ({numResults, duration, query, numRows, suggestion, onClickKeyword}) => {
    return (
        <div className={'match-desc'}>
            {
                numRows ?
                    <StyledLabel right={'0.5rem'}>
                        Showing <b>{numRows}</b> out of <b>{numResults}</b> result{numResults === 1 ? '' : 's'} found for <b>'{query}'</b>
                    </StyledLabel> :
                        suggestion !== '' ? <StyledLabel right={'0.5rem'}>
                            <b>{numResults}</b> result{numResults === 1 ? '' : 's'} found for <b>'{query}'</b>. Did you mean
                            <StyledLink onClick={() => onClickKeyword(suggestion!)}> <b>{suggestion}</b> </StyledLink>?
                        </StyledLabel> :
                            <StyledLabel right={'0.5rem'}>
                            <b>{numResults}</b> result{numResults === 1 ? '' : 's'} found for <b>'{query}'</b>.
                        </StyledLabel>
            }
            <StyledLabel>
                ({duration} ms)
            </StyledLabel>
        </div>
    );
};

export default MatchDesc;