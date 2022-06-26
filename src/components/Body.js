import './Body.css'
import React, { useState } from 'react'

function Body() {

  const [text, setText] = useState({
    topText: '',
    bottomText: '',
  })

  function handleInputTextChange(event) {
    const { name, value } = event.target
    setText(prevText => ({
      ...prevText,
      [name]: value
    }))
  }
  console.log(text)
  return (
    <main>
        <section>
            <form>
                <input
                    type="text"
                    name="topText"
                    value={text.topText}
                    onChange={handleInputTextChange}
                />
                <input
                    type="text"
                    name="bottomText"
                    value={text.bottomText}
                    onChange={handleInputTextChange}
                />
            </form>

            <button>Get New Image</button>
        </section>
        <section>
            {/* meme image */}
        </section>
    </main>
  )
}

export default Body