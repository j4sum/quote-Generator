import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../../Loader";

const Quotes = () => {
  // getting Parameters from Url
  const { quotes: author } = useParams();

  const [quotes, setQuotes] = useState([]);
  const [randAuthor, setRandAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const FETCH_URL = `https://quote-garden.herokuapp.com/api/v3/quotes/?author=${author}`;
  const FETCH_AUTHORS_URL = `https://quote-garden.herokuapp.com/api/v3/authors`;

  async function fetchQuotes() {
    const request = await axios.get(FETCH_URL);
  }

  // fetching data on first mount
  async function fetchQuotes() {
    setLoading(true);
    try {
      await axios.get(FETCH_URL).then((res) => {
        setQuotes(res.data.data);
      });
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
    const request = await axios.get(FETCH_URL);
    setQuotes(request.data.data);
  }

  useEffect(() => {
    fetchQuotes();
  }, [FETCH_URL]);

  useEffect(() => {
    async function fetchAllAuthors() {
      const request = await axios.get(FETCH_AUTHORS_URL);
      const randomNo = Math.floor(Math.random() * request.data.data.length);
      setRandAuthor(request.data.data[randomNo]);
    }

    fetchAllAuthors();
  }, [FETCH_AUTHORS_URL, randAuthor]);

  return (
    <div className="container mt-2 pl-9">
      {/* fetch random authors Data */}
      <Link
        to={`/${randAuthor}`}
        className="justify-end pr-5 flex items-center cursor-pointer"
      >
        <span className="font-medium text-lg">random</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 ml-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </Link>

      {!loading ? (
        <div className="w-6/7 md:w-5/7 mx-auto m-sm">
          <h1 className="font-bold text-2xl"> {author} </h1>
          {quotes.map((quote, index) => (
            <p
              className="font-medium text-lg md:text-xl mt-9 relative quote pl-8"
              key={index}
            >
              {quote.quoteText}
            </p>
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Quotes;
