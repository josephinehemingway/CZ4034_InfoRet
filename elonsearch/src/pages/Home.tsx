import React, {useEffect, useState} from 'react';
import {StyledInputSearch} from "../components/Searchbar";
import {SearchOutlined} from "@ant-design/icons";
import {BorderedButton} from '../components/Button';
import {StyledLink, StyledText, StyledTitle} from "../components/StyledText";
import './Pages.css'
import SentimentSection from "../components/SentimentSection";
import MatchDesc from "../components/MatchDesc";
// import logo from "../assets/elon.png";

interface ResponseRedditSubmissions {
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
}

const Home = () => {
    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<ResponseRedditSubmissions[]>()

    const onSearch = () => {
        console.log(query);
        // setResults(!results);
        setResults([{
            id: '12150g4',
            title: 'Liftoff.54321.',
            text: '',
            subreddit: 'elonmusk',
            author: 'ZaroonKhan5',
            upvote_ratio: 0.91,
            score: 290,
            url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
            link: 'https://v.redd.it/e72u906e8spa1',
            num_comments: 18,
            tags: ['SpaceX'],
            date: '25/3/23 0:46',
        },
            {
                id: '12150g4',
                title: 'Liftoff.54321.',
                text: '',
                subreddit: 'elonmusk',
                author: 'ZaroonKhan5',
                upvote_ratio: 0.91,
                score: 290,
                url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
                link: 'https://v.redd.it/e72u906e8spa1',
                num_comments: 18,
                tags: ['SpaceX'],
                date: '25/3/23 0:46',
            },
            {
                id: '12150g4',
                title: 'Liftoff.54321.',
                text: '',
                subreddit: 'elonmusk',
                author: 'ZaroonKhan5',
                upvote_ratio: 0.91,
                score: 290,
                url: 'reddit.com/r/elonmusk/comments/12150g4/liftoff54321/',
                link: 'https://v.redd.it/e72u906e8spa1',
                num_comments: 18,
                tags: ['SpaceX'],
                date: '25/3/23 0:46',
            },
        ])
    };

    useEffect(() => {
        console.log(results);
    }, [results])

    return (
        <header>
            <div className={`home-header${results ? " sticky" : ""}`}>
                <div className={`heading`}>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <StyledTitle bottom={'0'}> ElonSearch </StyledTitle>
                    <div className={'searchdiv'}>
                        <StyledInputSearch
                            prefix={<SearchOutlined />}
                            placeholder="Enter keywords to search"
                            value={query === '' ? undefined : query }
                            onChange={(e: { target: { value: any } }) => setQuery(e.target.value)}
                            allowClear
                            width={'50%'}
                        />
                        <BorderedButton left={'1rem'} width={'8%'} onClick={onSearch}> Search </BorderedButton>
                    </div>
                    <StyledText bottom={'2rem'}>Search by category:
                        <StyledLink href={'/search/SpaceX'} left={'1rem'} right={'0.5rem'}>
                            SpaceX
                        </StyledLink>|
                        <StyledLink href={'/search/Tesla'} left={'0.5rem'} right={'0.5rem'}>
                            Tesla
                        </StyledLink>|
                        <StyledLink href={'/search/Twitter'} left={'0.5rem'} right={'0.5rem'}>
                            Twitter
                        </StyledLink>|
                        <StyledLink href={'/search/Starlink'} left={'0.5rem'} right={'0.5rem'}>
                            Starlink
                        </StyledLink>
                    </StyledText>
                </div>
                {
                    results &&
                    <div className={'results-container'}>
                        <MatchDesc numResults={100} duration={0} query={'SpaceX'}/>
                        <div className={'results-section'}>
                            <div className={'sentiment-section'}>
                                <SentimentSection/>
                            </div>
                            <div className={'results-list'}>
                                Results
                            </div>
                        </div>
                    </div>
                }
            </div>
        </header>
    );
};

export default Home;