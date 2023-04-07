import React, { useEffect, useState, useMemo } from "react";
import { StyledInputSearch } from "../components/Searchbar";
import { SearchOutlined } from "@ant-design/icons";
import {BorderedButton} from "../components/Button";
import {StyledLabel, StyledLink, StyledSelect, StyledText, StyledTitle} from "../components/StyledText";
import "./Pages.css";
import SentimentSection from "../components/SentimentSection";
import MatchDesc from "../components/MatchDesc";
import ResultsCard from "../components/ResultsCard";
import {ResponseApi, WordValueMap} from "../utils/interfaces";
import {
    FILTER_MAPPING,
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

// TODO: Spell Checking
// TODO: PAGINATION
// TODO: Highlighting
// TODO: filtering -


const Home = () => {
    const queryTerm = useLocation().pathname.split("/")[2];
    const [backgroundImage, setBackgroundImage] = useState(bg);
    const [query, setQuery] = useState<string>(queryTerm ? queryTerm : "");
    const [kw, setKw] = useState<string>("")
    const [results, setResults] = useState<ResponseApi[]>([]);
    const [wordCount, setWordCount] = useState<WordValueMap[]>([]);
    const [duration, setDuration] = useState<number>(0)
    const [numResults, setNumResults] = useState<number>(0)
    const [sortBy, setSortBy] = useState<string>('')
    const ALL_SORT_OPTIONS: CheckboxValueType[] = FILTER_SOURCE_OPTIONS.concat(FILTER_SENTIMENT_OPTIONS, FILTER_SUBJECTIVITY_OPTIONS)

    const [checkedList, setCheckedList] = useState<CheckboxValueType[]>(ALL_SORT_OPTIONS);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(true);

    const [allText, setAllText] = useState<string[]>([])

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

    const onSearch = (kw: string, sortBy: string='', start=0, fq: CheckboxValueType[] = [] ) => {
        if (kw !== "") {
            nav(`/search/${kw}`);
            setKw(kw)

            let params: {[key: string]: any} = {
                sort: sortBy,
                rows: 10,
                start: start,
            }

            if (fq.length > 0) {
                const filters: string[] = []

                fq.map(filterTerm => (
                    //@ts-ignore
                    filters.push(FILTER_MAPPING[filterTerm] as string)
                ))
                type KeyValues = {
                    key: string;
                    values: string[];
                };

                const combinedList: KeyValues[] = filters.reduce((accumulator: KeyValues[], currentItem: string) => {
                    const [key, value] = currentItem.split(':');
                    const existingItem = accumulator.find(item => item.key === key);

                    if (existingItem) {
                        existingItem.values.push(value);
                    } else {
                        accumulator.push({ key, values: [value] });
                    }

                    return accumulator;
                }, []);

                const formattedList: string[] = combinedList.map(item => {
                    const valueString = item.values.length > 1 ? `(${item.values.join(' OR ')})` : item.values[0];

                    return `${item.key}: ${valueString}`;
                });

                console.log(formattedList)

                params = {...params,  fq: formattedList.join(' AND ')}
            }

            if (sortBy === 'num_comments desc') {
                params = {
                    ...params,
                    q: `text:${kw}, source: reddit_sub`,
                    'q.op': 'AND',
                };
            } else if (sortBy === 'net_upvotes desc') {
                params = {
                    ...params,
                    q: `text:${kw}, source: (reddit_sub OR reddit_cmt)`,
                    'q.op': 'AND',
                };
            }
            else {
                params = {
                    ...params,
                    q: `text:${kw}`,
                    'q.op': 'OR',
                };
            }

            const queryString = Object.entries(params)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');

            console.log(queryString)

            var startTime = performance.now();

            const url = `http://localhost:8983/solr/elonsearch/select?indent=true&${queryString}&useParams=`
            console.log(url)

            fetch(url
            ).then((res) =>
                res.json().then((data) => {
                    setNumResults(data.response.numFound)
                    setResults(data.response.docs);

                    let arr: string[] = []
                    data.response.docs.map((doc: any) => {
                        arr.push(doc.cleaned_text[0])
                    })
                    setAllText(arr)
                })
            );

            var endTime = performance.now();
            setDuration(parseFloat((endTime - startTime).toFixed(5)));

        } else {
            nav(`/`);
            setResults([]);
        }
    };

    useEffect(() => {
        const wordCount: {[key: string]: number } = {};

        allText.forEach((sentence) => {
            const words = sentence.toLowerCase().split(' ');
            words.forEach((word) => {
                if (wordCount[word]) {
                    wordCount[word]++;
                } else {
                    wordCount[word] = 1;
                }
            });
        });

        const wordValueMap = Object.keys(wordCount).map((word) => {
            return { text: word, value: wordCount[word] };
        })

        setWordCount(wordValueMap)
    }, [allText])

    const onClickKeyword = (kw: string) => {
        setQuery(kw);
        nav(`/search/${kw}`);
        onSearch(kw, '')
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

    const onCheckboxClick = (list: CheckboxValueType[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < ALL_SORT_OPTIONS.length);
        setCheckAll(list.length === ALL_SORT_OPTIONS.length);
        onSearch(query, '', 0, list)
    };

    const onCheckAllChange = (e: CheckboxChangeEvent) => {
        setCheckedList(e.target.checked ? ALL_SORT_OPTIONS : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);

        onSearch(query, '', 0)
    };

    const sortOptions = useMemo(() => {
        return SORTING_OPTIONS.map((b) => (
            <Option key={b.value} value={b.value}>
                {b.label}
            </Option>
        ));
    }, []);

    const handleSort = (e: string) => {
        setSortBy(e);
        onSearch(query, e, 0)
    }

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
                            onClick={() => onSearch(query, '')}
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
                            query={kw}
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
                                query={kw}
                                numRows={results.length}
                            />
                            <StyledLabel bottom={"1rem"}>
                                Refine search:
                                <Popover content={
                                    <div className="popover">

                                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                            Select all
                                        </Checkbox>

                                        <Divider orientationMargin={'5px'}/>

                                        <CheckboxGroup onChange={onCheckboxClick} value={checkedList}>
                                            <StyledLabel color={'grey'} fontsize={'15px'} marginbottom={'2rem'}>
                                                Filter by <b>source</b>
                                            </StyledLabel>

                                            {FILTER_SOURCE_OPTIONS.map((source) =>
                                                <Checkbox key={source} value={source}>{source}</Checkbox>
                                            )}

                                            <Divider orientationMargin={'5px'}/>

                                            <StyledLabel color={'grey'} fontsize={'15px'} marginbottom={'2rem'}>
                                                Filter by <b>sentiment</b>
                                            </StyledLabel>

                                            {FILTER_SENTIMENT_OPTIONS.map((source) =>
                                                <Checkbox key={source} value={source}>{source}</Checkbox>
                                            )}

                                            <Divider orientationMargin={'5px'}/>
                                            <StyledLabel color={'grey'} fontsize={'15px'} marginbottom={'2rem'}>
                                                Filter by <b>subjectivity</b>
                                            </StyledLabel>

                                            {FILTER_SUBJECTIVITY_OPTIONS.map((source) =>
                                                <Checkbox key={source} value={source}>{source}</Checkbox>
                                            )}
                                        </CheckboxGroup>
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
                                    onChange={handleSort}
                                >
                                    {sortOptions}
                                </StyledSelect>
                            </StyledLabel>
                        </div>

                        <div className={"results-section"}>
                            <div className={"sentiment-section"}>
                                <SentimentSection />
                                <WordCloudSection words={wordCount}/>
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
