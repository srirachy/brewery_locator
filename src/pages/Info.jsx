import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBrewery } from "../services/API";
import { phoneStyle } from "../services/Functions";
import styled from "styled-components";
import info from "../img/info.png";
import { nanoid } from "nanoid";
import { useLocalStorage } from "../services/useLocalStorage"
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

const InfoWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  background-image: url(${info});
  background-repeat: no-repeat;
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
`;

const TextWrapper = styled.section`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 2rem;
    text-align: center;
  }
  p {
    font-size: 1.5rem;
    text-align: left;
    text-transform: capitalize;
  }
  a {
    color: #ffe5cb;
    &:hover {
      color: #94e6ed;
    }
  }
  #phone {
    color: #ffe5cb;
    text-decoration: underline;
    &:hover {
      color: #94e6ed;
    }
  }
  #phone:hover {
    color: blue;
  }
  button{
    width: 20%;
    margin-top: 20px;
    background-color: #ffe5cb;
    &:hover{
      background-color: #94e6ed;
    }
  }
`;

const Info = () => {
  const [brewery, setBrewery] = useState([]);
  const [likedBrewsLs, setLikedBrewsLs] = useLocalStorage('likedBrews', '');
  const [likedBrews, setLikedBrews] = useState(likedBrewsLs);
  const [dbData, setDbData] = useState([]);
  const [isLikeButton, setIsLikeButton] = useState(true);
  const likesCollectionRef = collection(db, "likes");
  const { name, street, city, state, phone, website_url, brewery_type } =
    brewery;
  const { id } = useParams();

  useEffect(() => {
    const getDbData = async () => {
      const data = await getDocs(likesCollectionRef);
      setDbData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDbData();
  }, []);

  useEffect(() => {
    getBrewery(id)
      .then(({ data: brewery }) => setBrewery(brewery))
      .catch((err) => console.log(err));
  }, [getBrewery, id]);

  useEffect(() => {
    if (likedBrews !== null){
      const found = likedBrewsLs.indexOf(name) > -1;
      if (!found){
        setIsLikeButton(true);  //user could like
      } else{
        setIsLikeButton(false); //user could dislike
      }
    } else{
      setIsLikeButton(true);
    }
  }, [likedBrews, name]);

  const addLike = (curName) => {
    const bData = dbData.find(({ name }) => name === curName);
    if (typeof bData === "undefined") {
      addBrewDb(curName);
    } else {
      updateBrewDb(bData.numLikes, bData.id, true);   // true to notify increase
    }
    addBrewLs(curName);
  };

  const decLike = async (curName) => {
    // code for removing from db
    const bData = dbData.find(({ name }) => name === curName);
    if (typeof bData !== "undefined"){
      if (bData.numLikes > 0){
        updateBrewDb(bData.numLikes, bData.id, false);  //false to notify decrease
      }
    }
    removeBrewLs(curName);  //remove from local storage
  };

  const addBrewDb = async (curName) => {
    await addDoc(likesCollectionRef, { name: curName, numLikes: Number(1) });
  };

  const addBrewLs = (curName) => {
    setLikedBrews(likedBrews => ([
      ...likedBrews,
      curName
    ]));
    setLikedBrewsLs(likedBrewsLs => ([
      ...likedBrewsLs,
      curName
    ]));
  };

  const removeBrewLs = (curName) => {
    const removeBrew = [...likedBrews].filter(curItem => curItem?.toLowerCase() !== curName?.toLowerCase());
    setLikedBrews(removeBrew);
    setLikedBrewsLs(removeBrew);
  };

  const updateBrewDb = async (curLikes, id, isAdd) => {
    const brewDoc = doc(db, "likes", id);
    if (isAdd){
      const updateLikes = { numLikes: curLikes + 1 }; //increase
      await updateDoc(brewDoc, updateLikes);
    } else{
      const updateLikes = { numLikes: curLikes - 1};  //decrease
      await updateDoc(brewDoc, updateLikes);
    }
  };

  const renderButton = () => {
    const btnElmt = [];
    if (isLikeButton === true) {
      btnElmt.push(
        <button key={nanoid()} onClick={() => addLike(name)}>
            Like
          </button>
        );
      } else {
      btnElmt.push(
        <button key={nanoid()} onClick={() => decLike(name)}>
          Dislike
        </button>
      );
    };
    return btnElmt;
  };

  return (
    <InfoWrapper>
      <TextWrapper>
        <h1>Brewery Info</h1>
        <p>
          Name: {name}
          <br />
          Address: {street} {city}, {state}
          <br />
          Phone: {phone ? <span id="phone">{phoneStyle(phone)}</span> : "N/A"}
          <br />
          Website:{" "}
          {website_url ? (
            <a href={website_url} target="_blank" rel="noreferrer">
              {website_url}
            </a>
          ) : (
            "N/A"
          )}
          <br />
          Type of Brewery: {brewery_type}
        </p>
        {renderButton()}
      </TextWrapper>
    </InfoWrapper>
  );
};

export default Info;