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
      const imageAlt = await result.data.memes[2].name
      setMeme(prevMeme => ({
        ...prevMeme,
        imageUrl: imageUrl,
        memeId: imageTempId,
        imageAlt: imageAlt
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
    memeId: '',
    imageAlt: ''
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
    const imageAlt = allMemes[randomNumber].name
    setMeme(prevMeme => ({
      ...prevMeme,
      imageUrl: randomUrl,
      memeId: memeId,
      imageAlt: imageAlt,
    }))
  }

  // ===============
  // POST MEME IMAGE
  // ===============

  async function postMemeImage() {
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

    const res = await fetch('https://api.imgflip.com/caption_image', options)
    const data = await res.json()

    // this url will be used in the functions below
    return data.data.url
  }

  async function openMeme() {
    const userMemeUrl = await postMemeImage()
    window.open(userMemeUrl, '_blank').focus();
  }

  async function downloadMeme() {
    const userMemeUrl = await postMemeImage()

    fetch(userMemeUrl)
      .then(resp => resp.blob())
      .then(blobobject => {
        const blob = window.URL.createObjectURL(blobobject);
        const fileName = userMemeUrl.split('/').pop();
        const anchor = document.createElement('a');
        anchor.style.display = 'none';
        anchor.href = blob;
        anchor.download = fileName;
        document.body.appendChild(anchor);
        anchor.click();
        window.URL.revokeObjectURL(blob);
      })
      .catch(() => console.log('An error in downloadin gthe file sorry'));
  }

  return (
    <main>
      <form>
        <div className="form--input-texts-container">

          <div className="form--input-container">
            <label htmlFor="form--top-text">
              TOP TEXT
            </label>
            <input
              type="text"
              name="topText"
              id="form--top-text"
              value={meme.topText}
              onChange={handleInputTextChange}
              onFocus={onFocusInputField}
            />
          </div>
  
          <div className="form--input-container">
            <label htmlFor="form--top-text">BOTTOM TEXT</label>
            <input
              type="text"
              name="bottomText"
              id="form--bottom-text"
              value={meme.bottomText}
              onChange={handleInputTextChange}
              onFocus={onFocusInputField}
            />
          </div>
        </div>

        <button onClick={getNewMemeImage} className="button">Get New Image</button>
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
            alt={meme.imageAlt}
            className="meme-image"
            />
        </section>
      }

      <section className="meme-button-container">
        <button onClick={openMeme} className="button">Open Meme</button>
        <button onClick={downloadMeme} className="button">Download Meme</button>
      </section>
    </main>
  )
}

export default Body