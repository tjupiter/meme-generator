import './Body.css'
import React, { useEffect, useState } from 'react'

function Body() {

  const [allMemes, setAllMemes] = useState({})

  // FETCH MEME DATA FROM API
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes))
      .catch(error => {
        console.error('There was an error!', error)
      })
      // work on the error message 
      
      // ===== ASYNC + AWAIT =====
      // const fetchData = async () => {
      //   const data = await fetch('https://api.imgflip.com/get_memes')
      //   const result = await data.json();
      //   setAllMemes(result.data.memes)
      // }
      // fetchData()
      //  .catch(console.error)
      // getNewMemeImage()
  }, [])
  // add counter to discrepancies array - we fetch only 100 images at the same time and we do only fetch it once

  // MEME -- TEXT 
  const [meme, setMeme] = useState({
    topText: 'TOP TEXT',
    bottomText: 'BOTTOM TEXT',
    imageUrl: 'http://i.imgflip.com/1bij.jpg'
  })

  function handleInputTextChange(event) {
    const { name, value } = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }

  function onFocusInputField(event) {
    const { name } = event.target 
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: ''
    }))
  }

  // MEME -- IMAGE
  function getNewMemeImage(event) {
    event.preventDefault()
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const randomUrl = allMemes[randomNumber].url

    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: randomUrl
    }))
  }

  const [whatsNextToShow, setWhatsNextToShow] = useState(false)
  function toggleWhatsNext() {
    setWhatsNextToShow(!whatsNextToShow)
  }

  return (
    <main>
      <form>
        <div className="form--input-texts-container">
          <div className="form--input-container">
            {/* FUTURE FUNCION: ADD BUTTON TO SWITCH ON/OFF CAPITALIZED TEXT */}
            <label htmlFor="from--top-text">
              TOP TEXT
            </label>
            <input
              type="text"
              name="topText"
              id="from--top-text"
              value={meme.topText}
              onChange={handleInputTextChange}
              onFocus={onFocusInputField}
            />
          </div>
  
          <div className="form--input-container">
            <label htmlFor="from--top-text">BOTTOM TEXT</label>
            <input
              type="text"
              name="bottomText"
              id="from--bottom-text"
              value={meme.bottomText}
              onChange={handleInputTextChange}
              onFocus={onFocusInputField}
            />
          </div>
        </div>

        <button onClick={getNewMemeImage}>Get New Image</button>
      </form>

      { meme && 
        <section className="meme-image-container">
          <div className="meme-image--text meme-image--text-top">
            {meme.topText}
          </div>
          <div className="meme-image--text meme-image--text-bottom">
            {meme.bottomText}
          </div>

          <img 
            src={meme.imageUrl}
            alt="meme caption"
            className="meme-image"
            onClick={getNewMemeImage}
            />
        </section>
      }

      <section className="whats-next">
        <button onClick={toggleWhatsNext}>What's next?</button>

        { whatsNextToShow && 
          <div className='whats-next--info'>
            <h2>You'll be able to:</h2>
            <ul>
              <li>position texts</li>
              <li>change text color and size</li>
              <li>save/send your final meme</li>
            </ul>
          </div>
        }
      </section>
    </main>
  )
}

export default Body