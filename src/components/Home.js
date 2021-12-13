import React from 'react'
import Layout from './layout/Layout'
import '../styles/Home.css'


const Home = ()=>{
  return(
    <Layout>
      <div className="Home">
        <header className="header">
          TRACK YOUR PERFORMANCE PROGRESS AND HEALTH CONDITION
        </header>
        
        <article className="article-metrics">
          <div className="article-text">
            <h3>Keep your physical metrics under control</h3>
            <hr />
            <p>
              Record your weight and main muscle groups metrics to clearly track your physical progress
            </p>
          </div>
        </article>
        
        <article className="article-workout">
          <div className="article-text">
            <h3>Encourage yourself to improve in every workout</h3>
            <hr />
            <p>
              Save your training results to check your performance improvement
            </p>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default Home