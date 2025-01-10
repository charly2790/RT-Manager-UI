import { Button, Dialog, IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import InfoIcon from '@mui/icons-material/Info';

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export const DialogTrainingShotsSwiper = (props) => {

    const { open, onClose, shots } = props;
    
    console.log('shots-->', shots);

    const handleClose = () => {
        onClose();
    }

    const handleDeleteShot = (shot) => {        
        shot.markToDelete = true;        
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
        >
            <div style={{ padding: "20px" }}>
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {shots.map((shot, index) => {

                        return <SwiperSlide key={index}>
                            <ImageListItem>
                                <img
                                    src={shot.link}
                                    alt={"Captura entrenamiento"}
                                    style={{
                                        width: "100%",
                                        borderRadius: "10px",
                                        objectFit: "cover"
                                    }}
                                />
                                <ImageListItemBar                                    
                                    position='top'
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                            aria-label={`info about ${"captura entrenamiento"}`}
                                            onClick={()=>handleDeleteShot(shot)}
                                        >
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />

                            </ImageListItem>

                        </SwiperSlide>

                    }
                    )}
                </Swiper>
            </div>

        </Dialog>
    )
}
