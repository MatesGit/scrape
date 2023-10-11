import axios from 'axios';
import React, { Key, useEffect, useState } from 'react';

interface Item {
  id: Key
  name: string
  image: string
}

const Scrape: React.FC = () => {
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/scrapedData/page/${pageNumber}`)
      .then((response) => {
        setData(response.data.rows);
      })
      .catch((error) => {
        console.error('Data fetching error: ', error);
      });
  }, [pageNumber]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePrev = () => {
    setPageNumber(pageNumber - 1)
    scrollToTop()
  }

  const handleNext = () => {
    setPageNumber(pageNumber + 1)
    scrollToTop()
  }
  
  return (
    <>
      <h1>Scrape</h1>
      <div className='property-list'>
        {data.map((item: Item) => (
          <div key={item.id} className='property'>
            <h3>{item.name}</h3>
            <img src={item.image} alt={item.name}/>
          </div>
        ))}
      </div>
      <div className='btns'>
        {pageNumber > 1 ? <button className='prev-btn' onClick={handlePrev}>PREV</button> : null}
        {pageNumber < 25 ? <button className='next-btn' onClick={handleNext}>NEXT</button> : null}
      </div>
    </>
  );
};

export default Scrape;
