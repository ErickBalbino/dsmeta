import axios from "axios";
import { BASE_URL } from "../../utils/requests";

import notificationIcon from "../../assets/notification-icon.svg";

import "./styles.css";

type Props = {
  saleId: number;
};

const NotificationButton = ({ saleId }: Props) => {
  const sendNotification = () => {
    axios
      .get(`${BASE_URL}/sales/${saleId}/notification`)
      .then((resp) => {
        alert("SMS enviado com sucesso!");
      })
      .catch((err) => {
        alert("Ocorreu um erro ao enviar!");
      });
  };

  return (
    <div className="dsmeta-red-btn" onClick={sendNotification}>
      <img src={notificationIcon} alt="Notificar" />
    </div>
  );
};

export default NotificationButton;
