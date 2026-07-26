import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Nft from "../UI/Nft";

const AuthorItems = ({authorId, authorImage, nftCollection}) => {
  const items = nftCollection

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          <>
          {items.map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index} style={{ display: "block", backgroundSize: "cover" }}>
              <Nft
              authorId={authorId}
              authorImage={authorImage}
              nftImage={item.nftImage}
              nftId={item.nftId}
              title={item.title}
              price={item.price}
              like={item.likes}
              />
            </div>
          ))
          }
          </>
        </div>
      </div>
    </div>
  )};

export default AuthorItems;
