import { Dialog, IconButton, ImageList, ImageListItem, ImageListItemBar, ListSubheader } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import React, { useEffect, useState } from 'react'
import _ from 'lodash';
// import Slider from 'react-slick';


const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
        rows: 2,
        cols: 2,
        featured: true,
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
        rows: 2,
        cols: 2,
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
        cols: 2,
    },
];

export const DialogTrainingShots = (props) => {

    const { open, onClose, entrenamiento } = props;
    const [trainingShots, setTrainingShots] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    useEffect(() => {
        if (!_.isNil(entrenamiento) &&
            !_.isEmpty(entrenamiento.MediaEntrenamientos)) {

            const { MediaEntrenamientos } = entrenamiento;

            let items = MediaEntrenamientos.map((media) => {
                return {
                    link: media.Documento.link,
                    title: 'Captura de entrenamiento',
                }
            });

            setTrainingShots(items);
        }

    }, [])

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <ImageList sx={{ width: 640, height: 480 }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">December</ListSubheader>
                </ImageListItem>
                {trainingShots.map((shot) => (
                    <ImageListItem key={shot.link}>
                        <img
                            //srcSet={`${shot.link}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            src={`${shot.link}?w=248&fit=crop&auto=format`}
                            //src={shot.link}
                            alt={shot.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={shot.title}
                            subtitle={shot.title}
                            actionIcon={
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${shot.title}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
           {/* <Slider>
                {trainingShots.map((shot, index) => (
                    <div key={index}>
                        <img
                            src={shot.links}
                            alt={`Slide ${index + 1}`}
                            style={{ width: "100%", borderRadius: "10px" }}
                        />
                    </div>
                ))}
            </Slider> */}

        </Dialog>
    )
}
