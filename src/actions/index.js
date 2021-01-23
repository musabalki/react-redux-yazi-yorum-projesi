import { api } from "../api.js";
import axios from "axios";

const yaziListesiGetir=()=>dispatch=>{
    api()
      .get("/posts")
      .then((response) => {
        dispatch({type:"YAZI_LISTESI_GETIR",payload:response.data})
      })
      .catch((error)=>dispatch({type:"YAZI_LISTESI_GETIR_HATA",payload:"Yazılar listelenirken hata"}))
}
export const yaziSil=(id,close,push)=>dispatch=>{
  api()
      .delete(`/posts/${id}`)
      .then(() => {
        dispatch({type:"YAZI_SIL",payload:id})
        close();
        push(`/`);
      })
      .catch(() => {
        dispatch({type:"YAZI_SIL_HATA",payload:"Yazı silerken hata"})
      });
}
export const yaziGetir=(id)=>dispatch=>{
  axios
      .all([api().get(`/posts/${id}`), api().get(`/posts/${id}/comments`)])
      .then((responses) => {
        const payload={
          ...responses[0].data,yorumlar:responses[1].data
        }
        dispatch({type:"YAZI_GETIR",payload})
        //setYaziDetayi(responses[0].data);
        //setYorumlar(responses[1].data);
      })
      .catch((error) => {
        dispatch({type:"YAZI_GETIR_HATA",payload:"Yazı detay hata"})
        //console.log(error);
      });
}
export const yorumEkle=(id,yorum)=>dispatch=>{
  api()
  .post(`/posts/${id}/comments`, yorum)
  .then((response) => {
    //console.log(response.data)
     dispatch({type:"YORUM_EKLE",payload:response.data})
    //setYorumlar([...yorumlar, response.data]);
  })
  .catch((error) => {
    dispatch({type:"YORUM_HATA",payload:"Yorum ekle hata"})
  });
}
export const yaziGuncelle=(id,yazi,push)=>dispatch=>{
 
  api()
  .put(`/posts/${id}`, yazi)
  .then((response) => {
    dispatch({type:"YAZI_GUNCELLE",payload:response.data})
    push(`/posts/${id}`);
  })
  .catch((error) => {
    dispatch({type:"YAZI_GUNCELLE_HATA",payload:"Yazı güncelle hata"})
  });
}
export default yaziListesiGetir;