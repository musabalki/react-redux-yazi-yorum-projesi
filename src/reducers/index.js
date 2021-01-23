import { act } from "react-dom/test-utils";

const INITIAL_STATE={
    yaziListesi:[],
    yaziListesiHata:"",
    yaziDetayi:{id:'',title:'',content:'',created_at:'',yorumlar:[]},
    yorumEkleHata:"",
    yaziDetayiHata:"",
    yaziSilHata:"",
    yaziGuncelleHata:""
}
export const reducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case "YAZI_LISTESI_GETIR":
            return {...state,yaziListesi:action.payload,yaziListesiHata:""};
        case "YAZI_LISTESI_GETIR_HATA":
             return {...state,yaziListesiHata:action.payload};
        case "YAZI_GETIR":
             return {...state,yaziDetayi:action.payload,yaziDetayiHata:""};
        case "YAZI_GETIR_HATA":
             return {...state,yaziDetayiHata:action.payload};
        case "YORUM_EKLE":
        return {
            ...state,
            yaziDetayi:{ 
                ...state.yaziDetayi,
                yorumlar:[...state.yaziDetayi.yorumlar,action.payload],
            },yorumEkleHata:""
        };

        case "YORUM_EKLE_HATA":
            return {...state,yorumHata:action.payload};
        case "YAZI_SIL":
            return {...state,yaziListesi:state.yaziListesi.filter((yazi)=>yazi.id!==action.payload),yaziSilHata:""}
        case "YAZI_SIL_HATA":
            return {...state,yaziSilHata:action.payload}
        case "YAZI_GUNCELLE":
            return {...state,yaziDetayi:{...state.yaziDetayi,...action.payload}}
        case "YAZI_GUNCELLE_HATA":
            return {...state,yaziGuncelleHata:action.payload}
    }
    return state;
}

