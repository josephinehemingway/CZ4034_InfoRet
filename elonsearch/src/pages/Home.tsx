import React, { useEffect, useState } from "react";
import { StyledInputSearch } from "../components/Searchbar";
import { SearchOutlined } from "@ant-design/icons";
import { BorderedButton } from "../components/Button";
import { StyledLink, StyledText, StyledTitle } from "../components/StyledText";
import "./Pages.css";
import SentimentSection from "../components/SentimentSection";
import MatchDesc from "../components/MatchDesc";
import ResultsCard from "../components/ResultsCard";
import { ResponseRedditSubmissions } from "../utils/interfaces";
import {
    DUMMY_REDDIT_RES,
    DUMMY_STARLINK,
    keywordBackgroundMap,
} from "../utils/const";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/bg/bg.jpeg";
import WordCloudSection from "../components/WordCloudSection";
// import logo from "../assets/elon.png";

const Home = () => {
    const queryTerm = useLocation().pathname.split("/")[2];

    const [backgroundImage, setBackgroundImage] = useState(bg);
    const [query, setQuery] = useState<string>(queryTerm ? queryTerm : "");
    const [results, setResults] = useState<ResponseRedditSubmissions[]>([]);
    const [words, setWords] = useState<string[]>([]);

    let nav = useNavigate();

    useEffect(() => {
        if (queryTerm && queryTerm !== "") {
            if (queryTerm.toLowerCase() in keywordBackgroundMap) {
                setBackgroundImage(
                    keywordBackgroundMap[queryTerm.toLowerCase()]
                );
            } else {
                setBackgroundImage(bg);
            }
        } else {
            setBackgroundImage(bg);
        }
    }, [queryTerm]);

    // useEffect(() => {
    //     let text = []
    //     results.forEach((result) => {
    //
    //     })
    //
    // }, [results])

    const onSearch = () => {
        console.log(query);
        if (query !== "") {
            nav(`/search/${query}`);
            setResults(DUMMY_REDDIT_RES);
        } else {
            nav(`/`);
            setResults([]);
        }
    };

    const onClickKeyword = (kw: string) => {
        setQuery(kw);
        nav(`/search/${kw}`);

        if (kw.toLowerCase() === "starlink") {
            setResults(DUMMY_STARLINK);
        } else {
            setResults(DUMMY_REDDIT_RES);
        }
    };

    useEffect(() => {
        // const delay = 80; // Adjust this value to control the delay between each item's animation
        const listItems = document.querySelectorAll(".results-card");
        const resultContainer = document.querySelectorAll(".results-container");

        // let timeout = 0;
        listItems.forEach((item) => {
            setTimeout(() => {
                item.classList.add("show");
            }, 0);
            // timeout += delay;
        });

        resultContainer.forEach((item) => {
            setTimeout(() => {
                item.classList.add("show");
            }, 0);
            // timeout += delay;
        });

        return () => {
            listItems.forEach((item) => {
                item.classList.remove("show");
            });

            resultContainer.forEach((item) => {
                item.classList.remove("show");
            });
        };
    }, [results]);

    const resultsArray = results.map((d) => (
        <ResultsCard key={d.id} result={d} sentiment={0} />
    ));

    return (
        <header style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div
                className={`home-header${
                    results.length !== 0 ? " sticky" : ""
                }`}
            >
                <div className={`heading`}>
                    {/*<img src={logo} className="App-logo" alt="logo" />*/}
                    <StyledTitle bottom={"0"}> ElonSearch </StyledTitle>
                    <div className={"searchdiv"}>
                        <StyledInputSearch
                            prefix={<SearchOutlined />}
                            placeholder="Enter keywords to search"
                            value={query === "" ? undefined : query}
                            onChange={(e: { target: { value: any } }) =>
                                setQuery(e.target.value)
                            }
                            allowClear
                            width={"50%"}
                        />
                        <BorderedButton
                            left={"1rem"}
                            width={"8%"}
                            onClick={onSearch}
                        >
                            {" "}
                            Search{" "}
                        </BorderedButton>
                    </div>
                    <StyledText bottom={"2rem"}>
                        Search keywords:
                        <StyledLink
                            onClick={() => onClickKeyword("SpaceX")}
                            left={"1rem"}
                            right={"0.5rem"}
                        >
                            SpaceX
                        </StyledLink>
                        |
                        <StyledLink
                            onClick={() => onClickKeyword("Tesla")}
                            left={"0.5rem"}
                            right={"0.5rem"}
                        >
                            Tesla
                        </StyledLink>
                        |
                        <StyledLink
                            onClick={() => onClickKeyword("Twitter")}
                            left={"0.5rem"}
                            right={"0.5rem"}
                        >
                            Twitter
                        </StyledLink>
                        |
                        <StyledLink
                            onClick={() => onClickKeyword("Starlink")}
                            left={"0.5rem"}
                            right={"0.5rem"}
                        >
                            Starlink
                        </StyledLink>
                    </StyledText>
                </div>
                {results.length !== 0 && (
                    <div className={"results-container"}>
                        <MatchDesc
                            numResults={results.length}
                            duration={0}
                            query={queryTerm}
                        />
                        <div className={"results-section"}>
                            <div className={"sentiment-section"}>
                                <SentimentSection />
                                <WordCloudSection words={words}/>
                            </div>
                            <div className={"results-list"}>{resultsArray}</div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Home;
