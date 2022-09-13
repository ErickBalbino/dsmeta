import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NotificationButton from "../NotificationButton";
import axios from "axios";
import { BASE_URL } from "../../utils/requests";

import "./styles.css";
import { Sale } from "../../models/Sale";

const SalesCard = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  const min = new Date(new Date().setDate(new Date().getDate() - 365));

  const [minDate, setMinDate] = useState(min);
  const [maxDate, setMaxDate] = useState(new Date());

  useEffect(() => {
    const dmin = minDate.toISOString().slice(0, 10);
    const dmax = maxDate.toISOString().slice(0, 10);

    setLoading(true);

    axios
      .get(`${BASE_URL}/sales?minDate=${dmin}&maxDate=${dmax}`)
      .then((resp) => {
        setSales(resp.data.content);
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  }, [minDate, maxDate]);

  return (
    <div className="dsmeta-card">
      <h2 className="dsmeta-sales-title">Vendas</h2>
      <div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={minDate}
            onChange={(date: Date) => setMinDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="dsmeta-form-control-container">
          <DatePicker
            selected={maxDate}
            onChange={(date: Date) => setMaxDate(date)}
            className="dsmeta-form-control"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div>
        <table className="dsmeta-sales-table">
          <thead>
            <tr>
              <th className="show992">ID</th>
              <th className="show576">Data</th>
              <th>Vendedor</th>
              <th className="show992">Visitas</th>
              <th className="show992">Vendas</th>
              <th>Total</th>
              <th>Notificar</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 &&
              loading === false &&
              sales.map((sale) => {
                return (
                  <tr key={sale.id}>
                    <td className="show992">{sale.id}</td>
                    <td className="show576">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td>{sale.sellerName}</td>
                    <td className="show992">{sale.visited}</td>
                    <td className="show992">{sale.deals}</td>
                    <td>
                      {sale.amount.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td>
                      <div className="dsmeta-red-btn-container">
                        <NotificationButton saleId={sale.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {loading && (
          <tbody>
            <p>Carregando dados...</p>
          </tbody>
        )}

        {sales.length === 0 && loading === false && (
          <tbody>
            <p>Este periodo não possui registro de venda!</p>
          </tbody>
        )}
      </div>
    </div>
  );
};

export default SalesCard;
