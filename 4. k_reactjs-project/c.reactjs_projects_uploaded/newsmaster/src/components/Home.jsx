import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home(props) {

    // let pageSize = 6;
    let [page, setPage] = useState(1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let [news, setNews] = useState([]);
    let [totalResults, setTotalArticles] = useState(0);
    let [nextBtn, setNextBtn] = useState(true)
    let [loading, setLoading] = useState(false)
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function getNews(url) {
        props.setProgress(10);
        setLoading(true)
        let response = await fetch(url);
        props.setProgress(30);

        let data = await response.json();
        props.setProgress(50);

        let newsArr = (data.articles)
        props.setProgress(70);

        setNews(newsArr)
        setTotalArticles(data.totalResults)
        props.setProgress(90);

        setNextBtn(false)
        setLoading(false)
        props.setProgress(100);
    }
    const handlePrevClick = () => {
        setNextBtn(false)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setPage(page - 1)
        console.log(page)
        getNews(url)
    }
    const handleNextClick = () => {

        if (page + 1 > Math.ceil(totalResults / props.pageSize)) {
            setNextBtn(true)
        } else {
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
            setPage(page + 1)
            // console.log(page)
            getNews(url)
            setNextBtn(false)

        }
    }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setNews(news.concat(parsedData.articles))
        setTotalArticles(parsedData.totalResults)
        console.log(news.length, totalResults)
    };

    useEffect(() => {
        getNews(url);
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
    }, [props.category])
    return (
        <>
            <h1 className="text-center" style={{ margin: '20px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={news.length}
                next={fetchMoreData}
                hasMore={news.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {news.map((element) => {
                            // console.log(element.sourc.name)
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>

                            );
                        })}
                    </div>
                    {/* <div className="container d-flex justify-content-between">
                        <button
                            disabled={page <= 1}
                            type="button"
                            className="btn btn-dark"
                            onClick={handlePrevClick}
                        >
                            {" "}
                            &larr; Previous
                        </button>
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={handleNextClick}
                            disabled={nextBtn}
                        >
                            Next &rarr;
                        </button>
                    </div> */}
                </div>
            </InfiniteScroll>
        </>
    )
}
