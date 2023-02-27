import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Table } from "antd";
import "../dist/output.css";

const { Column } = Table;

function Exchanges() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();
  }, []);

  const titles = ["#", "Coin", "Price", "Price Change", "24th Volume"];

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <main>
      <div className="container mx-auto my-8 bg-black">
        <h1 className="text-3xl font-bold mb-8 text-center">CoinMarket</h1>
        <Input
          className="bg-dark text-white rounded border-0 py-2 px-4 w-full mb-8"
          placeholder="Search coin"
          onChange={handleChange}
          autoFocus
        />
        <Table dataSource={filteredCoins}>
          <Column
            title="Coin Name"
            dataIndex="coin"
            key="coin"
            render={(text, record) => (
              <div className="flex items-center py-2 px-4">
                <img
                  className="inline-block h-6 w-6 mr-2"
                  style={{ height: "60px", width: "60px", marginRight: "15px" }}
                  src={record.image}
                  alt={record.name}
                />
                <span className="text-white" style={{ marginRight: "15px" }}>
                  {record.name}
                </span>
              </div>
            )}
          />
          <Column
            title="Price"
            dataIndex="current_price"
            key="current_price"
            render={(text, record) => (
              <span className="text-white py-2 px-4">
                ${record.current_price.toLocaleString()}
              </span>
            )}
          />
          <Column
            title="% Change (24h)"
            dataIndex="price_change_percentage_24h"
            key="price_change_percentage_24h"
            render={(text, record) => (
              <span
                className={`${
                  record.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                } font-bold py-2 px-4`}
              >
                {record.price_change_percentage_24h.toFixed(2)}%
              </span>
            )}
          />
          <Column
            title="Volume"
            dataIndex="total_volume"
            key="total_volume"
            render={(text, record) => (
              <span className="text-white py-2 px-4">
                ${record.total_volume.toLocaleString()}
              </span>
            )}
          />
        </Table>
      </div>
    </main>
  );
}

export default Exchanges;
