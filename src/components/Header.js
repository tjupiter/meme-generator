import './Header.css'
import trollFaceLogo from '../images/troll-face.png'

function Header() {
  return (
    <header>
    <img 
        src={trollFaceLogo} alt="troll face logo" 
        class="troll-face-logo"     
    />
    <div class='header--text'>MEME GENERATOR</div>
    </header>
  )
}

export default Header
