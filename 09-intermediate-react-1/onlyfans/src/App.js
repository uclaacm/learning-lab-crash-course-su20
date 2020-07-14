import React from 'react';
import './App.css';

import FanCard from './FanCard';
import FeaturedFanCard from './FeaturedFanCard';

const listOfFanOwners = [
  {
    name: "Arjun",
    favFan: "Vornado 633 Mid-Size 9 in. Whole Room Air Circulator Fan",
    link: "https://www.homedepot.com/p/Vornado-633-Mid-Size-9-in-Whole-Room-Air-Circulator-Fan-CR1-0120-06/203682426"
  },
  {
    name: "Leo",
    favFan: "Honeywell HT-900 TurboForce Air Circulator Fan Black",
    link: "https://smile.amazon.com/Honeywell-HT-900-TurboForce-Circulator-Black/dp/B001R1RXUG/ref=sr_1_3?dchild=1&keywords=fan&qid=1594701152&sr=8-3"
  },
  {
    name: "Matt",
    favFan: "OMyTea \"Grassflowers 8.27\" (21cm) Hand Held Folding Fans",
    link: "https://smile.amazon.com/OMyTea-Grassflowers-8-27-21cm-Folding/dp/B01AZIKXF8/ref=sr_1_10?dchild=1&keywords=paper+fan&qid=1594701198&sr=8-10"
  },
];

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>OnlyFans</h1>
        <p>
          A website just for fans.
        </p>
      </header>
      <div className="featured-card-container">
        <FeaturedFanCard />
      </div>
      <div className="card-container">
        {
          listOfFanOwners.map((owner) => {
            return <FanCard name={owner.name} fan={owner.favFan} link={owner.link} />;
          })
        }
      </div>
    </div>
  );
}

export default App;
