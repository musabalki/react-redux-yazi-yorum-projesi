import React, {useEffect } from "react";
//import axios from "axios";
//import { api } from "../api";
import YaziYorumlari from "./YaziYorumlari";
import { Link, useParams} from "react-router-dom";
import SilModal from "./SilModal";
import { yaziGetir,yorumEkle } from "../actions";
import { useDispatch, useSelector } from "react-redux";

const YaziDetayi = () => {
  //const [yaziDetayi, setYaziDetayi] = useState({});
  //const [yorumlar, setYorumlar] = useState([]);
  const yaziDetayi=useSelector(state=>state.yaziDetayi)
  const { id } = useParams();
  //const history = useHistory();
  const dispatch=useDispatch();
  const handleCommentSubmit = (event, yorum) => {
    event.preventDefault();
    dispatch(yorumEkle(id,yorum))
  };
  
  useEffect(() => {
    dispatch(yaziGetir(id))
  }, []);

  return (
    <React.Fragment>
      <h2 className="ui header">{yaziDetayi.title}</h2>
      <p>{yaziDetayi.created_at}</p>
      <div className="ui buttons">
        <Link className="ui blue button" to={`/posts/${yaziDetayi.id}/edit`}>
          Düzenle
        </Link>
        <SilModal yazi={yaziDetayi} />
      </div>
      <p>{yaziDetayi.content}</p>
      <YaziYorumlari yorumlar={yaziDetayi.yorumlar} handleSubmit={handleCommentSubmit} />
    </React.Fragment>
  );
};

export default YaziDetayi;
