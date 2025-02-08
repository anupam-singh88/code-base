import React, { useEffect, useState } from "react";
import "./App.css";

export default function Covid() {
  const [data, setData] = useState([]);
  const getCovidData = async () => {
    try {
      const res = await fetch("https://data.covid19india.org/data.json");
      const actualData = await res.json();
      // console.log(actualData.statewise[0]);
      setData(actualData.statewise[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCovidData();
  }, []);
  return (
    <>
      <section>
        <p className="live">Live</p>
        <h2>Covid 19 Coronavirus Tracker</h2>
        <div className="card__container">
          <ul>
            <li className="card">
              <div className="card_main">
                <div className="card__inner">
                  <p className="card__name">
                    <span className="our">
                      <span>Our</span>
                    </span>
                    Country
                  </p>
                  <p className="card__total card__small">India</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li className="card">
              <div className="card_main">
                <div className="card__inner">
                  <p className="card__name">
                    <span className="our">
                      <span>Total</span>
                    </span>
                    Recoverd
                  </p>
                  <p className="card__total card__small">{data.recovered}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li className="card">
              <div className="card_main">
                <div className="card__inner">
                  <p className="card__name">
                    <span className="our">
                      <span>Our</span>
                    </span>{" "}
                    Confirrmed
                  </p>
                  <p className="card__total card__small">{data.confirmed}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li className="card">
              <div className="card_main">
                <div className="card__inner">
                  <p className="card__name">
                    <span className="our">
                      <span>Total</span>
                    </span>{" "}
                    Deaths
                  </p>
                  <p className="card__total card__small">{data.deaths}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li className="card">
              <div className="card_main">
                <div className="card__inner">
                  <p className="card__name">
                    <span className="our">
                      <span>Total</span>
                    </span>{" "}
                    Active
                  </p>
                  <p className="card__total card__small">{data.active}</p>
                </div>
              </div>
            </li>
          </ul>
          <ul>
            <li className="card">
              <div className="card_main">
                <div className="card__inner">
                  <p className="card__name">
                    <span className="our">
                      <span>Last</span>
                    </span>{" "}
                    Updated
                  </p>
                  <p className="card__total card__small">
                    {data.lastupdatedtime}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
