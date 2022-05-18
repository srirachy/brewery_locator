import React from "react";
import { useEffect, useState } from "react";
import { Map, Overlay } from "pigeon-maps";
import { maptiler } from "pigeon-maps/providers";
import styled from "styled-components";
import beerImg from "../img/beer.png";
import { nanoid } from "nanoid";
import { device } from "../utils/device";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

const apiKey = process.env.REACT_APP_API_KEY;
const maptilerProvider = maptiler(apiKey, "streets");
const MapContainer = styled.div`
  width: 100vw;
  height: 60vh;
  .theOverlay {
    z-index: 1;
    &:hover {
      z-index: 2;
      .likeContainer {
        visibility: visible;
      }
    }
    img {
      cursor: pointer;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
    .likeContainer {
      position: fixed;
      bottom: 55px;
      left: 20px;
      width: 50px;
      height: 50px;
      visibility: hidden;
    }
    .textContainer {
      position: absolute;
      left: 2px;
      bottom: 15px;
      width: 50px;
    }
    .likeText {
      color: #ffffff;
      position: relative;
      font-size: 28px;
      line-height: 28px;
      width: 100%;
      text-align: center;
    }
  }
  @media ${device.tablet} {
    width: 77vw;
    height: 100vh;
  }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: #94e6ed;
  font-size: 60px;
`;

const Maps = ({ data, lng, lat, selectBrewery }) => {
  const [switchPages, setSwitchPages] = useState(false);
  const navigate = useNavigate();
  const [curLng, setCurLng] = useState(0);
  const [curLat, setCurLat] = useState(0);
  const [curZoom, setCurZoom] = useState(0);
  const [brewLikes, setBrewLikes] = useState([]);
  const likesCollectionRef = collection(db, "likes");

  useEffect(() => {
    const getLikes = async () => {
      const data = await getDocs(likesCollectionRef);
      setBrewLikes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getLikes();
  }, []);

  useEffect(() => {
    setCurLng(lng);
    setCurLat(lat);
    setCurZoom(11);
  }, [lat, lng]);

  const brewClick = (bname, blng, blat, id) => {
    setSwitchPages(true);
    setCurZoom(14);
    setCurLng(parseFloat(blng));
    setCurLat(parseFloat(blat));
    if (switchPages) {
      setSwitchPages(false);
      navigate(`/brewery_locator/brewery/${id}`);
    }
  };

  const renderOverlays = () => {
    const coordElmts = [];
    for (const { name, longitude, latitude, id } of data) {
      const flat = parseFloat(latitude);
      const flng = parseFloat(longitude);
      //add overlay if long and lat have values
      if (!isNaN(flat) && !isNaN(flng)) {
        coordElmts.push(
          <Overlay anchor={[flat, flng]} key={nanoid()} className="theOverlay">
            <img
              src={beerImg}
              width={50}
              height={50}
              onMouseEnter={() => selectBrewery(id)}
              onMouseLeave={() => selectBrewery({})}
              onClick={() => brewClick(name, longitude, latitude, id)}
              alt={name}
            />
            <div className="likeContainer">
              <StyledFontAwesomeIcon icon={faMessage} />
              <div className="textContainer">{renderLikes(name)}</div>
            </div>
          </Overlay>
        );
      }
    }
    return coordElmts;
  };

  const renderLikes = (curName) => {
    const pElmt = [];
    const bLikes = brewLikes.find(({ name }) => name === curName);
    if (typeof bLikes !== "undefined") {
      pElmt.push(
        <p className="likeText" key={nanoid()}>
          +{bLikes.numLikes}
        </p>
      );
    } else {
      pElmt.push(
        <p className="likeText" key={nanoid()}>
          +0
        </p>
      );
    }
    return pElmt;
  };

  const renderMap = () => {
    const mapElmt = [];
    mapElmt.push(
      <Map
        provider={maptilerProvider}
        key={nanoid()}
        dprs={[1, 2]}
        center={[curLat, curLng]}
        defaultZoom={curZoom}
      >
        {renderOverlays()}
      </Map>
    );
    return mapElmt;
  };

  return <MapContainer>{renderMap()}</MapContainer>;
};

export default React.memo(Maps);