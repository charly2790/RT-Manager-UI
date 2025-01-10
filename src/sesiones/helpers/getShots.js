import _ from "lodash";

export const getShots = (entrenamiento) => {

    let shots = [];
  
    if(!_.isNil(entrenamiento) && !_.isNil(entrenamiento.MediaEntrenamientos)){
      
      let { MediaEntrenamientos } = entrenamiento;
  
      shots = MediaEntrenamientos.map((media)=>{
  
        const { idMedia, idEntrenamiento, Documento:{ idDocumento, link, idCategoria  } } = media;
  
        return {
          idCategoria,
          idDocumento,
          idEntrenamiento,
          idMedia,
          link,
          markToDelete: false,
        }
      })    
    }
  
    return shots;
  }