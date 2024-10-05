import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  
  return (
    <Layout>
      <div className="container">
        <div className="d-flex flex-column mt-4"> {/* Fixed typo: d-felx to d-flex */}
          <h1>
            Welcome Admin <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Organ Donation Bank App</h3>
          <hr />
          <p>
            Welcome to the Organ Donation App! Here you can manage all aspects of the organ donation process, including tracking donors, managing inventory, and ensuring the efficient operation of the donation bank.
          </p>
          <p>
            Feel free to navigate through the application to access various features and functionalities tailored to support your role.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
