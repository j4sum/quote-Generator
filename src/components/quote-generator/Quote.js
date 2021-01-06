import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import Navbar from "../nav-bar/Navbar";
import Footer from "../footer/Footer";

const Quote = () => {
  const [quote, setQuote] = useState([]);
  const [loading, setLoading] = useState(false);

  if (quote.length === 1 && quote !== undefined) {
    console.log(quote);
    var { quoteText, quoteAuthor, quoteGenre } = quote[0];
  }

  const FETCH_URL = "https://quote-garden.herokuapp.com/api/v3/quotes/random";

  // Defining function for asyncronisly api Call
  async function fetchQuote() {
    setLoading(true)
    try {
       await axios.get(FETCH_URL)
      .then(request => {
          setQuote(request.data.data);
      })
      setLoading(false)
  
    } catch (err) {
      console.error(err.message);
    }
  }

  // fetching data on first mount
  useEffect(() => {
    fetchQuote();
  }, [FETCH_URL]);

  return (
    <React.Fragment>
      <Navbar generateRandomQuote={fetchQuote} />
      <Footer />
      <div className="w-6/7 md:w-1/2 mx-auto absolute custom">

        {!loading ? (
          <div>
            <p className="font-medium text-lg md:text-xl relative quote pl-8">
              {quoteText}
            </p>

            <Link
              to={`/${quoteAuthor}`}
              className=" ml-8 mt-9 w-auto transition duration-500 ease-in-out cursor-pointer hover:bg-secondary py-5 pl-4 pr-8 flex justify-between items-center hover:text-white"
            >
              <div>
                <h1 className="font-bold text-2xl"> {quoteAuthor} </h1>
                <span className="text-subSecondary text-sm">
                  {" "}
                  {quoteGenre}{" "}
                </span>
              </div>

              <svg
                className="w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        ): ( <Loader />)}
      </div>
    </React.Fragment>
  );
};

export default Quote;
