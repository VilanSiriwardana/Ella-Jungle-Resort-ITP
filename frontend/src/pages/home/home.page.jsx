import Hero from './components/Hero';
import Heromid from './components/Heromid';
import { BookingCardsContainer } from './components/Cardpack';
import { FAQsection } from './components/FAQ';
import topleft from '../../assets/topleft.png'
import LatestFeedbacks from './components/FEEDBACK'

function HomePage() {
  const backgroundStyle = {
    position: 'absolute',
    top: -140,
    left: -40,
    width: '1000px', 
    height: '790px',
    zIndex: -1,
  };
  return (
    <div style={{ position: 'relative' }}>
      <img src={topleft} alt="Top Left Background" style={backgroundStyle} />
      <Hero />
      <Heromid />
      <BookingCardsContainer />
      <FAQsection />
      <LatestFeedbacks />
    </div>
  );
}

export default HomePage;
