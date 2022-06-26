import './Header.css'
import trollFaceLogo from '../images/troll-face.png'

function Header() {
  return (
    <header>
        <div className="header--content-container">
            <img 
                src={trollFaceLogo} alt="troll face logo" 
                className="troll-face-logo"     
            />
            <div className='header--text'>MEME GENERATOR <span className="header--text-version-nr">v1</span></div>
        </div>
    </header>
  )
}

export default Header
