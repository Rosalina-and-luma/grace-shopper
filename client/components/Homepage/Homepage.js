import React from 'react'
import './homepage.css'

const Homepage = () => {
  return (
    <div>
      <main>
        <div className="homepage-container">
          <h1>Welcome to Diagon E-lley</h1>
          <img
            className="intro-gif"
            src="https://vignette.wikia.nocookie.net/cour-de-cassation/images/5/5d/PS_Harry_getting_his_wand.gif/revision/latest?cb=20190719102823"
            alt="harry-potter-want-gif"
          />
          <img />
          <h2 className="intro">
            Diagon E-lley is your one-stop-shop to get everything you need for
            your upcoming year a Hogwarts school of Witchcraft and Wizardry.
          </h2>
        </div>
      </main>
    </div>
  )
}

export default Homepage
