import React, { Component }   from 'react';
import axios from 'axios';
import KEY from './apikey';

class IceCreamShop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reviewer: {}
            }
        }

     
  componentDidMount() {
    this.getReviewer(this.props.shop.id);
  }

  render() {
    const reviewer = this.state.reviewer;
    if(!reviewer) return null;

    const shop = this.props.shop;
    return <tr key={shop.id}><td><img src={shop.image_url} width="60" alt="logo" height="60"></img></td><td>{shop.name}</td><td>{shop.location.address1}, {shop.location.city}</td><td>{reviewer.text}</td><td>{reviewer.user?.name}</td></tr>;
  }

  getReviewer(id) {
    const url =`http://localhost:8010/proxy/v3/businesses/${id}/reviews`; //local proxy to handle cors issue
    // const url =`https://api.yelp.com/proxy/v3/businesses/${id}/reviews`; 
   
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${KEY}`
      }
    }).then((res) =>{
      const reviewers = res.data.reviews.sort((a, b) => {
        if(a.time_created < b.time_created) {
          return 1;
        } else if (a.time_created > b.time_created) {
          return -1;
        } else {
          return 0;
        }
      });

      if (reviewers && reviewers.length > 0) {
        this.setState(
          {
            reviewer: reviewers[0]
          }
        );
      }
    })
    .catch((err) => {
           console.log ('error')
     })
   }
}

export default IceCreamShop;



 