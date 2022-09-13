import axios from "axios";
import { BASE_URL } from "../../utils/requests";

import notificationIcon from "../../assets/notification-icon.svg";

import "./styles.css";
import { toast } from "react-toastify";

type Props = {
  saleId: number;
};

const NotificationButton = ({ saleId }: Props) => {
  const sendNotification = () => {
    axios
      .get(`${BASE_URL}/sales/${saleId}/notification`)
      .then((resp) => {
        toast.info("SMS enviado com sucesso!");
      })
      .catch((err) => {
        toast.info("Ops, ocorreu um erro!");
      });
  };

  return (
    <div className="dsmeta-red-btn" onClick={sendNotification}>
      <img src={notificationIcon} alt="Notificar" />
    </div>
  );
};

export default NotificationButton;
