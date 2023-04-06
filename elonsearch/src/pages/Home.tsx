import React, { useEffect, useState, useMemo } from "react";
import { StyledInputSearch } from "../components/Searchbar";
import { SearchOutlined } from "@ant-design/icons";
import {BorderedButton} from "../components/Button";
import {StyledLabel, StyledLink, StyledSelect, StyledText, StyledTitle} from "../components/StyledText";
import "./Pages.css";
import SentimentSection from "../components/SentimentSection";
import MatchDesc from "../components/MatchDesc";
import ResultsCard from "../components/ResultsCard";
import { ResponseApi } from "../utils/interfaces";
import {
    FILTER_SENTIMENT_OPTIONS,
    FILTER_SOURCE_OPTIONS, FILTER_SUBJECTIVITY_OPTIONS,
    keywordBackgroundMap, SORTING_OPTIONS,
} from "../utils/const";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/bg/bg.jpeg";
import WordCloudSection from "../components/WordCloudSection";
import {Checkbox, Divider, Popover} from "antd";
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
// import logo from "../assets/elon.png";

const CheckboxGroup = Checkbox.Group;
const { Option } = StyledSelect;

const Home = () => {
    const queryTerm = useLocation().pathname.split("/")[2];
    const [backgroundImage, setBackgroundImage] = useState(bg);
    const [query, setQuery] = useState<string>(queryTerm ? queryTerm : "");
    const [results, setResults] = useState<ResponseApi[]>([]);
    const [words, setWords] = useState<string[]>([]);
    const [duration, setDuration] = useState<number>(0)
    const [numResults, setNumResults] = useState<number>(0)
    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(FILTER_SOURCE_OPTIONS);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(true);

    const onChange = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < FILTER_SOURCE_OPTIONS.length);
        setCheckAll(list.length === FILTER_SOURCE_OPTIONS.length);
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? FILTER_SOURCE_OPTIONS : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

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

    const onSearch = (kw: string) => {
        if (kw !== "") {
            nav(`/search/${kw}`);

            var start = performance.now();

            fetch(`http://localhost:8983/solr/elonsearch/select?indent=true&q.op=OR&q=text:${kw}&useParams=`
            ).then((res) =>
                res.json().then((data) => {
                    console.log(data.response.numFound)
                    setNumResults(data.response.numFound)

                    console.log(data.response.docs)
                    setResults(data.response.docs);
                })
            );

            var end = performance.now();
            setDuration(parseFloat((end - start).toFixed(5)));

        } else {
            nav(`/`);
            setResults([]);
        }
    };

    const onClickKeyword = (kw: string) => {
        setQuery(kw);
        nav(`/search/${kw}`);
        onSearch(kw)
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
        <ResultsCard key={d.id} result={d} sentiment={0}/>
    ));

    const sortOptions = useMemo(() => {
        return SORTING_OPTIONS.map((b) => (
            <Option key={b} value={b}>
                {b}
            </Option>
        ));
    }, []);

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
                            onClick={() => onSearch(query)}
                        >
                            Search
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
                {results.length === 0 && query !== '' && (
                    <div className={"no-results-container"}>
                        <MatchDesc
                            numResults={results.length}
                            duration={duration}
                            query={queryTerm}
                        />
                    </div>
                )
                }
                {results.length !== 0 && (
                    <div className={"results-container"}>
                        <div className={'header-section'}>
                            <MatchDesc
                                numResults={numResults}
                                duration={duration}
                                query={queryTerm}
                                numRows={10}
                            />
                            <StyledLabel bottom={"1rem"}>
                                Refine search:
                                <Popover content={
                                    <div className="popover">
                                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                            Select all
                                        </Checkbox>

                                        <Divider orientationMargin={'5px'}/>

                                        <StyledLabel color={'grey'} fontsize={'15px'} marginbottom={'2rem'}>
                                            Filter by <b>source</b>
                                        </StyledLabel>
                                        <CheckboxGroup options={FILTER_SOURCE_OPTIONS} value={checkedList} onChange={onChange} />

                                        <Divider orientationMargin={'5px'}/>

                                        <StyledLabel color={'grey'} fontsize={'15px'} marginbottom={'2rem'}>
                                            Filter by <b>sentiment</b>
                                        </StyledLabel>
                                        <CheckboxGroup options={FILTER_SENTIMENT_OPTIONS} value={checkedList} onChange={onChange} />

                                        <Divider orientationMargin={'5px'}/>

                                        <StyledLabel color={'grey'} fontsize={'15px'} marginbottom={'2rem'}>
                                            Filter by <b>subjectivity</b>
                                        </StyledLabel>
                                        <CheckboxGroup options={FILTER_SUBJECTIVITY_OPTIONS} value={checkedList} onChange={onChange} />

                                    </div>
                                }
                                         trigger="click"
                                         placement={'bottomRight'}>
                                    <StyledLink
                                        left={"0.5rem"}
                                        right={"0.5rem"}
                                    >
                                        Filter
                                    </StyledLink>
                                </Popover>

                                |
                                <StyledSelect
                                    bordered={false}
                                    style={{ width: 150 }}
                                    placeholder="Sort by"
                                    allowClear
                                >
                                    {sortOptions}
                                    {/*<StyledLink*/}
                                    {/*    onClick={handleFilter}*/}
                                    {/*    left={"0.5rem"}*/}
                                    {/*>*/}
                                    {/*    Sort by*/}
                                    {/*</StyledLink>*/}
                                </StyledSelect>
                            </StyledLabel>
                        </div>

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
