import { Container, Row, Col } from 'react-bootstrap';


function Footer() {
  return (
    <footer className="mt-auto bg-black/70 text-white flex justify-around items-center">
      <div className="col-md-6 border border-white rounded-2xl p-4">
        <p>TCC Store</p>
        <div>
          <a href="https://www.instagram.com/tccinthehouse_create/" target="_blank" rel="noopener noreferrer">
            <img src="/images/insta.webp" alt="Instagram" className="w-6 h-6 inline-block mr-2 invert" />
          </a>   
          <a href="https://makerworld.com/en/@TCCINTHEHOUSE" target="_blank" rel="noopener noreferrer">
            <img src="/images/makerWorld.png" alt="MakerWorld" className="w-6 h-6 inline-block mr-2" />
          </a>    
          <a href="https://www.printables.com/@TCCINTHEHOUS_1203809" target="_blank" rel="noopener noreferrer">
            <img src="/images/Printables.webp" alt="Printables" className="w-6 h-6 inline-block mr-2 rounded-xs" />
          </a> 
        </div>
      </div>
      <div className="col-md-6">
        <img src="/images/logo.png" alt="TCC Store" className="p-5 w-auto" />
      </div>
      <div className="col-md-6 border border-white rounded-2xl p-4">
        <p>Liana Cruz</p>
        <a href="https://www.instagram.com/hotfox_art/" target="_blank" rel="noopener noreferrer">
            <img src="/images/insta.webp" alt="Instagram" className="w-6 h-6 inline-block mr-2 invert" />
        </a>
        <a href="https://www.linkedin.com/in/liana-cruz-74779b3b1/" target="_blank" rel="noopener noreferrer">
          <img src="/images/linkedin.png" alt="LinkedIn" className="w-6 h-6 inline-block mr-2" />
        </a>
        <a href="https://github.com/Hotfox-1" target="_blank" rel="noopener noreferrer">
          <img src="/images/github.webp" alt="GitHub" className="w-6 h-6 inline-block mr-2" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;