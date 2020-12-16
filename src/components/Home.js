import React from 'react'
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
    </div>
  )
}

export default Home