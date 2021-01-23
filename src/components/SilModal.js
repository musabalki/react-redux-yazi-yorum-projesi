import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
//import { api } from "../api";
import {yaziSil} from "../actions/index"

const SilModal = ({ yazi}) => {
  const [open, setOpen] = useState(false);
  const hata=useSelector(state=>state.yaziSilHata);
  const show = () => setOpen(true);
  const close = () => setOpen(false);
  const dispatch=useDispatch();
  const {push}=useHistory();
  const handleDelete = (id) => {
    
    dispatch(yaziSil(yazi.id,close,push));
    /*api()
      .delete(`/posts/${id}`)
      .then(() => {
        setHata("");
        close();
        push(`/`);
      })
      .catch(() => {
        setHata("Yazıyı silerken hata oluştu.");
      });*/
  };

  return (
    <React.Fragment>
      <Button color="red" onClick={show}>
        Sil
      </Button>
      <Modal size="mini" open={open} onClose={close}>
        <Modal.Header>Yazıyı Sil</Modal.Header>
        <Modal.Content>
          <p>
            <b>{yazi.title}</b> başlıklı yazıyı silmek istediğinizden emin
            misiniz?
          </p>
          {hata && <p>{hata}</p>}
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={close}>
            İptal Et
          </Button>
          <Button
            positive
            icon="delete"
            labelPosition="right"
            content="Evet, Sil!"
            onClick={() => handleDelete(yazi.id)}
          />
        </Modal.Actions>
      </Modal>
    </React.Fragment>
  );
};

export default SilModal;
