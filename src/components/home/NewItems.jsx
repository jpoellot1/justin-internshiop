import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CountdownTimer from "../UI/CountdownTimer";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";
import Nft from "../UI/Nft";

const NewItems = () => {
  const [newItems, setNewItems] = useState([])
  const [loading, setLoading] = useState(true)
  

  async function fetchNewItemsApi() {
    setLoading(true)
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`)
    setNewItems(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchNewItemsApi()
  }, [])


  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
                      className="owl-theme"
                      loop
                      items={4}
                      nav={true}
                      margin={10}
                      dots={false}
                      key={loading}
                      responsive={{
                        0: { items: 1 },
                        572: { items: 2 },
                        992: { items: 3 },
                        1200: { items: 4 },
                      }}
            >        
            {loading ? (
              <>
                {new Array(4).fill(0).map((_, index) => (
                  <div key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                          <Skeleton height="50px" width="50px" borderRadius="50%" />
                          <i className="fa fa-check"></i>
                      </div>  
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                          <Skeleton height="230px" width="230px" />
                      </div>
                      <div className="nft__item_info">
                          <Skeleton width="180px" height="30px" />
                          <br />
                          <>
                          <Skeleton width="100px" height="20px" />
                          <div className="nft__item_like">
                            <Skeleton width="30px" height="15px" />
                          </div>
                          </>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) :
              <>
              {newItems.map((newItem) =>
                <div key={newItem.id}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to={`/author/${newItem.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img className="lazy" src={newItem.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    {<CountdownTimer expiryDate={newItem.expiryDate}/>}
                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                      <Link to={`/item-details/${newItem.nftId}`}>
                        <img
                          src={newItem.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${newItem.nftId}`}>
                        <h4>{newItem.title}</h4>
                      </Link>
                      <div className="nft__item_price">{newItem.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newItem.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </>
          }
        </OwlCarousel>
        </div>
      </div>
    </section>
    
  );
};

export default NewItems;
