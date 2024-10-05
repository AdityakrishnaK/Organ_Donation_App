import moment from "moment";
import React, { useEffect, useState } from "react";
import Layout from "../components/shared/Layout/Layout";
import API from "../services/API";
import { useSelector } from "react-redux";

const Donation = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  // Fetch donor records
  const getDonations = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "in", // Ensure this reflects incoming donations
          donor: user?._id, // Make sure the variable name reflects the context
        },
      });
      if (data?.success) {
        setData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDonations();
  }, []);

  return (
    <Layout>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Your Organ Donations</h1> {/* Title for clarity */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Organ Type</th> {/* Changed from Blood Group to Organ Type */}
              <th scope="col">Donation Type</th> {/* Changed from Inventory Type to Donation Type */}
              <th scope="col">Quantity</th>
              <th scope="col">Email</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((record) => (
              <tr key={record._id}>
                <td>{record.organType}</td> {/* Changed from bloodGroup to organType */}
                <td>{record.donationType}</td> {/* Changed from inventoryType to donationType */}
                <td>{record.quantity}</td>
                <td>{record.email}</td>
                <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Donation;
