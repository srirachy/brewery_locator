import React from 'react';
import { useEffect, useState } from 'react';
import { Map, Overlay } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import styled from 'styled-components';
import beerImg from '../img/beer.png';
import { nanoid } from 'nanoid';
import { device } from '../utils/device';
import { useNavigate } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;
const maptilerProvider = maptiler(apiKey, 'streets');
const MapContainer = styled.div`
    width: 100vw;
    height: 60vh;
    img{
        cursor: pointer;
        opacity: 0.7;
        &:hover{
            opacity: 1;
        }
    }

    @media ${device.tablet}{
        width: 77vw;
        height: 100vh;
    }
`

const Maps = ( {data, lng, lat, selectBrewery} ) => {
    const [switchPages, setSwitchPages] = useState(false);
    const navigate = useNavigate();
    const [curLng, setCurLng] = useState(0);
    const [curLat, setCurLat] = useState(0);
    const [curZoom, setCurZoom] = useState(0);

    useEffect(() => {
        setCurLng(lng);
        setCurLat(lat);
        setCurZoom(11);
    }, [lat, lng])

    const brewClick = (bname, blng, blat, id) => {
        setSwitchPages(true);
        setCurZoom(14);
        setCurLng(parseFloat(blng));
        setCurLat(parseFloat(blat));
        if(switchPages){
          setSwitchPages(false);
          navigate(`/brewery_locator/brewery/${id}`)
        }
    }

    const renderOverlays = () => {
        const coordElmts=[];
        for (const {name, longitude, latitude, id} of data){
            const flat=parseFloat(latitude)
            const flng=parseFloat(longitude)
            //add overlay if long and lat have values
            if(!isNaN(flat) && !isNaN(flng)){
                coordElmts.push(
                    <Overlay anchor={[flat, flng]} key={nanoid()}>
                        <img src={beerImg} width={50} height={50} onMouseEnter={() => selectBrewery(id)} onMouseLeave={() => selectBrewery({})} onClick={() => brewClick(name, longitude, latitude, id)} alt={name}/>
                    </Overlay>
                )
            }
        }
        return coordElmts;
    }

    const renderMap = () => {
        const mapElmt=[];
        mapElmt.push(
            <Map provider={maptilerProvider}
                key={nanoid()}
                dprs={[1,2]}
                center={[curLat, curLng]}
                defaultZoom={curZoom}>
                {renderOverlays()}
            </Map>
        );
        return mapElmt;
    };

    return (
        <MapContainer>
            {renderMap()}
        </MapContainer>
    )                                                                   
}                                                                           

export default React.memo(Maps);