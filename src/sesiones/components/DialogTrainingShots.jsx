import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import _ from 'lodash';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}


export const DialogTrainingShots = (props) => {

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };

    const { open, onClose, entrenamiento } = props;
    const [trainingShots, setTrainingShots] = useState([]);

    const settings = {
        //fade: true,
        dots: true,
        infinite: true,
        //speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,        
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
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
        >
            <div className='slider-container'>
                <Slider
                    {...settings}
                >
                    {trainingShots.map((shot, index) => (
                        <div key={index}>
                            <img
                                src={shot.link}
                                alt={`Slide ${index + 1}`}
                                style={{ width: "50%", borderRadius: "10px" }}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            {/* <div style={{ textAlign: "center" }}>
                <button className="button" onClick={previous}>
                    Previous
                </button>
                <button className="button" onClick={next}>
                    Next
                </button>
            </div> */}

        </Dialog>
    )
}
