import React, { Component }  from 'react';
import './App.css';
import axios from 'axios';
import IceCreamShop from './iceCreamShop';
import KEY from './apikey';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: []
    }
  }
  
  componentDidMount() {
    this.getIceCreamShops();
  }

  render() {
    const shops = this.state.shops;
    if(!shops) return null;
    const shopList = shops.map(shop => {
      return <IceCreamShop key={shop.id} shop={shop}></IceCreamShop>
    })
    return (
      <div className="App">
          <div className="shops">
            My Top 5 Ice Cream Shops
          </div>
          <table>
             <thead>
                <tr>
                  <th></th><th>Business Name</th><th>Address</th><th>Excerpt</th><th>Reviewer</th>
                </tr>
              </thead>
            <tbody>
              { shopList} 
             </tbody>
           </table>   
     </div>
    );

  }


  getIceCreamShops() {
   // const url =`https://api.yelp.com/v3/businesses/search`;
    const url ='http://localhost:8010/proxy/v3/businesses/search';  //with local proxy to handle cors issue
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${KEY}`,
      },
      params: {
       term: 'ice cream',
       location: 'Alpharetta, GA'
      }
    }).then((res) => {
    
      if (res.data.businesses) {
        let businesses = res.data.businesses;
        if(businesses.length > 5) {
          businesses = businesses.slice(0,5);
        }
        this.setState(
          {
            shops: businesses
          }
        );
      }
    }).catch((err) => {
       console.log ('error')
    })
   }
}

export default App;
