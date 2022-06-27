import './Body.css'
import React, { useEffect, useState } from 'react'

function Body() {

  const [allMemes, setAllMemes] = useState({})

  // ========================
  // FETCH MEME DATA FROM API
  // ========================
  
  
  useEffect(() => {
  //   fetch('https://api.imgflip.com/get_memes')
  //     .then(res => res.json())
  //     .then(data => setAllMemes(data.data.memes))
  //     .catch(error => {
  //       console.error('There was an error!', error)
  //     })
    // work on the error message 
    

    // ===== ASYNC + AWAIT =====
    const fetchData = async () => {
      const data = await fetch('https://api.imgflip.com/get_memes')
      const result = await data.json();
      setAllMemes(result.data.memes)
      const imageUrl = await result.data.memes[2].url
      const imageTempId = await result.data.memes[2].id
      setMeme(prevMeme => ({
        ...prevMeme,
        imageUrl: imageUrl,
        memeId: imageTempId
      }))
    }
    fetchData()
     .catch(console.error)
  }, [])
  // add counter to discrepancies array - we fetch only 100 images at the same time and we do only fetch it once so theuser will run out of new picture after a while
  // https://i.imgflip.com/1g8my4.jpg


  // ============
  // MEME -- TEXT 
  // ============

  const [meme, setMeme] = useState({
    topText: 'TOP TEXT',
    bottomText: 'BOTTOM TEXT',
    imageUrl: '',
    memeId: ''
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

  // =============
  // MEME -- IMAGE
  // =============

  function getNewMemeImage(event) {
    event.preventDefault()
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const randomUrl = allMemes[randomNumber].url
    const memeId = allMemes[randomNumber].id
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: randomUrl,
      memeId: memeId
    }))
  }

  const [whatsNextToShow, setWhatsNextToShow] = useState(false)
  function toggleWhatsNext() {
    setWhatsNextToShow(!whatsNextToShow)
  }

  // ===============
  // POST MEME IMAGE
  // ===============

  function postMemeImage() {

    // const text1 = {
    //     "text": `${meme.topText}`,
    //     "x": 10,
    //     "y": 10,
    //     "width": 548,
    //     "height": 100,
    //     "color": "#ffffff",
    //     "outline_color": "#000000"
    //   }
    // const text2 = {
    //     "text": `${meme.bottomText}`,
    //     "x": 10,
    //     "y": 225,
    //     "width": 548,
    //     "height": 100,
    //     "color": "#ffffff",
    //     "outline_color": "#000000"
    //   }

    // const objectToQueryParam = obj => {
    //   const params = Object.entries(obj).map(([key, value]) => `${key}=${value}`);
    //   return params.join("&");
    // };
    // console.log(objectToQueryParam(text1))
    // const urlText1 = objectToQueryParam(text1)
    // const urlText2 = objectToQueryParam(text2)

    // const params = `template_id=${meme.memeId}&username=pitju&password=bah102IMG&boxes=${urlText1}&${urlText2}`
    const params = `template_id=${meme.memeId}&username=pitju&password=bah102IMG&text0=${meme.topText}&text1=${meme.bottomText}`
    
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params,
    };

    function getUserMeme(url) {
      window.open(url, '_blank').focus();
    }
    fetch('https://api.imgflip.com/caption_image', options)
      .then(res => res.json())
      .then(data =>getUserMeme(data.data.url))
  }
  return (
    <main>
      <form>
        <div className="form--input-texts-container">
          <div className="form--input-container">
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

      { allMemes.length > 0 && 
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
            />
        </section>
      }

      <section className="whats-next">
        <button onClick={postMemeImage}>Get Meme</button>
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