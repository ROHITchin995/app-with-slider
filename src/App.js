import { useEffect, useState } from 'react';
import './App.css';
import data from './data';
import { FaQuoteRight } from 'react-icons/fa';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

function App() {
  const [people, setPeople] = useState(data)
  const [index, setIndex] = useState(0);
  
  const nextPerson = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };

  const prevPerson = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex((oldIndex) => {
        let index = oldIndex + 1
        if (index > people.length - 1) {
          index = 0
        }
        return index
      })
    }, 5000)
    return () => {
      clearInterval(slider)
    }
  }, [index])

  const checkNumber = (number) => {
    if (number > people.length - 1) {
      return 0;
    }
    if (number < 0) {
      return people.length - 1;
    }
    return number;
  };

  const randomPerson = () => {
    let randomNumber = Math.floor(Math.random() * people.length);
    if (randomNumber === index) {
      randomNumber = index + 1;
    }
    setIndex(checkNumber(randomNumber));
  };

  return (
    <section className='section'>
      <div className="title">
        <h2>
          Our Reviews
        </h2>
        <div className='underline'></div>
      </div>
      <div className="section-center">
        {
          people.map((person, personIndex) => {
            const { id, image, name, title, quote } = person;
            let position = 'nextSlide';
            if (personIndex === index) {
              position = 'activeSlide'
            }
            if (personIndex === index - 1 || (index === 0 && personIndex === people.length - 1)) {
              position = 'lastSlide'
            }
            return (
              <article className={position} key={id}>
                <div className='outer_icon'>
                  <FaQuoteRight className='icon' />
                </div>
                <img src={image} alt={name} className="person-img" />
                <h4>{name}</h4>
                <p className="title">{title}</p>
                <p className="text">{quote}</p>
                <button className='prev' onClick={prevPerson}>
                  <FiChevronLeft />
                </button>
                <button className='next' onClick={nextPerson}>
                  <FiChevronRight />
                </button>
                <button className='suprise_me_button' onClick={randomPerson}>Suprise Me</button>
              </article>
            )
          })
        }
        

      </div>
    </section>
  );
}

export default App;
