import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#884A39",
    "#C38154",
    "#FFC26F",
    "#4F709C",
    "#4942E4",
    "#0079FF",
    "#FF0060",
    "#22A699",
  ];

  // GET ORGAN DATA
  const getOrganData = async () => {
    try {
      const { data } = await API.get("/analytics/organ-data");
      if (data?.success) {
        setData(data?.organData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle method for fetching organ data
  useEffect(() => {
    getOrganData();
  }, []);

  // GET RECENT ORGAN DONATION RECORDS
  const getOrganRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-organ-records");
      if (data?.success) {
        setInventoryData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-row flex-wrap">
        {data?.map((record, i) => (
          <div
            className="card m-2 p-1"
            key={i}
            style={{ width: "18rem", backgroundColor: `${colors[i % colors.length]}` }}
          >
            <div className="card-body">
              <h1 className="card-title bg-light text-dark text-center mb-3">
                {record.organ}
              </h1>
              <p className="card-text">
                Total Donations In: <b>{record.totalIn}</b>
              </p>
              <p className="card-text">
                Total Donations Out: <b>{record.totalOut}</b>
              </p>
            </div>
            <div className="card-footer text-light bg-dark text-center">
              Total Available: <b>{record.availableOrgans}</b>
            </div>
          </div>
        ))}
      </div>
      <div className="container my-3">
        <h1 className="my-3">Recent Organ Donations</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Organ</th>
              <th scope="col">Donation Type</th>
              <th scope="col">Quantity</th>
              <th scope="col">Donor Email</th>
              <th scope="col">Time & Date</th>
            </tr>
          </thead>
          <tbody>
            {inventoryData?.map((record) => (
              <tr key={record._id}>
                <td>{record.organ}</td>
                <td>{record.donationType}</td>
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Analytics;
