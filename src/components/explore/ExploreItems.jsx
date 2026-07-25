import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton"
import CountdownTimer from "../UI/CountdownTimer"
import Nft from "../UI/Nft";

const ExploreItems = () => {
  const [exploreItems, setExploreItems] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchExploreItemsApi() {
    const {data} = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=likes_high_to_low`)
    setExploreItems(data)
  }

  useEffect(() => {
    fetchExploreItemsApi()
  },[])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {exploreItems.map((exploreItem, index) => (
                <Nft
                id={exploreItem.id}
                authorId={exploreItem.authorId}
                authorImage={exploreItem.authorImage}
                nftId={exploreItem.nftId}
                nftImage={exploreItem.nftImage}
                title={exploreItem.title}
                price={exploreItem.price}
                likes={exploreItem.likes}
                expiryDate={exploreItem.expiryDate}
                />
              ))
      }
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
