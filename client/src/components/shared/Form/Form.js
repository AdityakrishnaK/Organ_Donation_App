import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="form-container soft-red-background shadow-lg p-4 rounded">
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website
            );
        }}
      >
        <h2 className="text-center mb-4">{formTitle}</h2>
        <hr />

        <div className="role-selection mb-4 d-flex justify-content-center">
          <div className="form-check me-3">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value="donar"
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              Donor
            </label>
          </div>
          <div className="form-check me-3">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check me-3">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value="hospital"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value="organisation"
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>

        {/* Input Fields based on formType */}
        {formType === "login" ? (
          <>
            <InputType
              labelText="Email"
              labelFor="forEmail"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        ) : (
          <>
            {(role === "admin" || role === "donar") && (
              <InputType
                labelText="Name"
                labelFor="forName"
                inputType="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {role === "organisation" && (
              <InputType
                labelText="Organisation Name"
                labelFor="forOrganisationName"
                inputType="text"
                name="organisationName"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            )}
            {role === "hospital" && (
              <InputType
                labelText="Hospital Name"
                labelFor="forHospitalName"
                inputType="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}
            <InputType
              labelText="Email"
              labelFor="forEmail"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputType
              labelText="Website"
              labelFor="forWebsite"
              inputType="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <InputType
              labelText="Address"
              labelFor="forAddress"
              inputType="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelText="Phone"
              labelFor="forPhone"
              inputType="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        <div className="d-flex justify-content-between mt-4">
          {formType === "login" ? (
            <p>
              Not registered yet? <Link to="/register">Register Here!</Link>
            </p>
          ) : (
            <p>
              Already a user? <Link to="/login">Login Here!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
