import React from 'react'
// import { Carousel } from 'react-bootstrap';
import '../styles/Home.css'



const Home = ()=>{
  return(
    <div className="Home">
      
      <aside>
        Would you like to track your performance progress and health condition?
      </aside>
      <hr />
      <article>
        <h3>Keep your physical condition under control</h3>
        <p>
          You can record your weight and also your metrics of the main muscle groups to clearly track your physical progress
        </p>
      </article>
      <hr />
      <article>
        <h3>Encourage yourself to improve in every workout</h3>
        <p>
        Save your training results to check your performance improvement
        </p>
      </article>
      <hr />


      {/* <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=First slide&bg=373940"
            alt="First slide"
          />
          <Carousel.Caption>
            <h2>welcome to app</h2>
            <p>Would you like to track your performance progress and health condition?</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="second slide"
          />

          <Carousel.Caption>
            <h2>Keep your physical condition under control</h2>
            <p>You can record your weight and also your metrics of the main muscle groups to clearly track your physical progress</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Third slide&bg=20232a"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h2>Encourage yourself to improve in every workout</h2>
            <p>Save each exercise every time you have done it with your results to check your performance improvement.You can also incorporate feedback to take into account next time</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}



    </div>
  )
}

export default Home