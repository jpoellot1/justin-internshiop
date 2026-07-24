import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchHotCollectionApi() {
    setLoading(true)
    const {data}= await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    setHotCollections(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchHotCollectionApi()
  }, [])

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" style={{ width: "100%", maxWidth: "100%", padding: "0" }} key={index}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                    </div>
                    <div className="nft_coll_pp">
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Skeleton width="100px" height="20px" />
                      <br/>
                      <Skeleton width="60px" height="20px" />
                    </div>
                  </div>
                </div>
              ))}
              </>
            ):
            <>
            {hotCollections.map((hotCollection) => (
              <div key={hotCollection.id}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/hotCollection-details">
                      <img
                        src={hotCollection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={hotCollection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{hotCollection.title}</h4>
                    </Link>
                    <span>ERC-{hotCollection.code}</span>
                  </div>
                </div>
              </div>
            ))}
            </>
            }
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
