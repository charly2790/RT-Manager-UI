import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Importa los estilos de Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export const DialogTrainingShotsSwiper = (props) => {
   
    const { open, onClose, entrenamiento } = props;
    const [trainingShots, setTrainingShots] = useState([]);

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
                    {trainingShots.map((shot, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={shot.link}
                                alt={shot.title}
                                style={{
                                    width: "100%",
                                    borderRadius: "10px",
                                    objectFit: "cover"
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

        </Dialog>
    )
}
