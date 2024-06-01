import BackgroundText from "./residence-home-component/BackgroundText";
import RoomCard from "./residence-home-component/RoomCard";
import Subheader from "./residence-home-component/subHeader";
import image1 from '../../../src/assets/G.jpg';
import {Link} from 'react-router-dom'
import { Button } from '@material-tailwind/react';

function ResidenceHome() {
    return (
      <div>
        <BackgroundText/>
        <Subheader
            Title="Room Types"
          />
        <div class="my-4 flex justify-between mx-40 mb-28">
          
        <RoomCard
          imageUrl={image1}
          Title="Eco Jungle Chalet"
          Description="There are 16 spacious chalets, featuring a private balcony with a view of the rushing river, are perfect for honeymooners or couples looking to escape the hustle and bustle of the city lights for a romantic getaway. Include private bathroom, solid timber flooring and full-length glass walls with draping. Wake up to the sound of the rushing river as the morning light trickles through your 4-poster bed which is draped with mosquito netting."
        />
        <RoomCard
          imageUrl="https://www.ellajungleresort.lk/wp-content/uploads/2019/06/Eco-Jungle-Cottage.jpg"
          Title="Eco Jungle Cottage"
          Description="There are 6 Cottages. Each Eco Jungle Cottages has 2 rooms. One on the upper and one on the ground floor. All chalets are based on double sharing and can be converted to triple sharing on request. Your chalet features a balcony overlooking the river, covered by glass and fitted with parquet flooring, mosquito net seating. Rooms come with a shared toilet and shared bathroom with full shower facilities."
        />
        <RoomCard
          imageUrl="https://www.ellajungleresort.lk/wp-content/uploads/2019/06/Eco-Jungle-Cabin.jpg"
          Title="Eco Jungle Cabin"
          Description="There are 6 rooms available and each Eco Cabin has 2 rooms on the upper and ground floor. All rooms are on a double sharing basis and can be converted to a triple sharing basis on request. Your room has a balcony overlooking the river. Open to the environment, rooms are comfy and fitted with parquet flooring, a mosquito net and a seating area. Standard rooms come with a shared toilet and a shared bathroom with full shower facilities."
        />
        </div>

      </div>
    );
  }
  
  export default ResidenceHome;
  