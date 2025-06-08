import './App.css';
import React from "react";

// country and city data
const countries = {
  India: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata"],
  USA: ["New York", "San Francisco", "Chicago", "Los Angeles", "Houston", "Seattle"],
  UK: ["London", "Manchester", "Liverpool", "Birmingham", "Leeds"],
  Canada: ["Toronto", "Vancouver", "Montreal", "Calgary", "Ottawa"],
  Australia: ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"],
  Germany: ["Berlin", "Munich", "Frankfurt", "Hamburg", "Cologne"],
  France: ["Paris", "Lyon", "Marseille", "Toulouse", "Nice"],
  Japan: ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Nagoya"],
  Brazil: ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Salvador", "Fortaleza"],
  SouthAfrica: ["Johannesburg", "Cape Town", "Durban", "Pretoria", "Port Elizabeth"]
};

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
const panValidator = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const aadharValidator = /^\d{12}$/;
const phoneValidator = /^\d{10}$/;

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
      showPassword: false,
      countryCode: "",
      phone: "",
      country: "",
      city: "",
      pan: "",
      aadhar: "",
      // Error states
      firstNameError: "",
      lastNameError: "",
      usernameError: "",
      emailAddressError: "",
      passwordError: "",
      countryCodeError: "",
      phoneError: "",
      countryError: "",
      cityError: "",
      panError: "",
      aadharError: "",
      isFormSubmitted: false,
      submittedData: null
    };
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    this.setState({
      [name]: type === "checkbox" ? checked : value,
      ...(name === "country" ? { city: "" } : {}),
    }, () => {
      // Validate on change for instant feedback
      this.validateField(name);
    });
  };

  handleBlur = (event) => {
    const { name } = event.target;
    this.validateField(name);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fields = [
      "firstName", "lastName", "username", "emailAddress", "password",
      "countryCode", "phone", "country", "city", "pan", "aadhar"
    ];
    let isValid = true;
    fields.forEach(field => {
      isValid = this.validateField(field) && isValid;
    });
    if (isValid) {
      this.setState({
        isFormSubmitted: true,
        submittedData: { ...this.state }
      });
    } else {
      this.setState({ isFormSubmitted: false });
    }
  };

  validateField = (name) => {
    let error = "";
    const value = this.state[name];
    switch (name) {
      case "firstName":
        if (!value.trim()) error = "First Name is required";
        this.setState({ firstNameError: error });
        return !error;
      case "lastName":
        if (!value.trim()) error = "Last Name is required";
        this.setState({ lastNameError: error });
        return !error;
      case "username":
        if (!value.trim()) error = "Username is required";
        this.setState({ usernameError: error });
        return !error;
      case "emailAddress":
        if (!value.trim()) error = "Email Address is required";
        else if (!emailValidator.test(value)) error = "Email is not valid";
        this.setState({ emailAddressError: error });
        return !error;
      case "password":
        if (!value.trim()) error = "Password is required";
        else if (!passwordValidator.test(value))
          error = "Password must be 8+ chars, 1 number, 1 upper, 1 lower";
        this.setState({ passwordError: error });
        return !error;
      case "countryCode":
        if (!value.trim()) error = "Country code required";
        this.setState({ countryCodeError: error });
        return !error;
      case "phone":
        if (!value.trim()) error = "Phone number required";
        else if (!phoneValidator.test(value)) error = "Phone must be 10 digits";
        this.setState({ phoneError: error });
        return !error;
      case "country":
        if (!value.trim()) error = "Country required";
        this.setState({ countryError: error });
        return !error;
      case "city":
        if (!value.trim()) error = "City required";
        this.setState({ cityError: error });
        return !error;
      case "pan":
        if (!value.trim()) error = "PAN required";
        else if (!panValidator.test(value)) error = "Invalid PAN";
        this.setState({ panError: error });
        return !error;
      case "aadhar":
        if (!value.trim()) error = "Aadhar required";
        else if (!aadharValidator.test(value)) error = "Aadhar must be 12 digits";
        this.setState({ aadharError: error });
        return !error;
      default:
        return true;
    }
  };

  isFormValid = () => {
    const {
      firstNameError, lastNameError, usernameError, emailAddressError, passwordError,
      countryCodeError, phoneError, countryError, cityError, panError, aadharError,
      firstName, lastName, username, emailAddress, password, countryCode, phone, country, city, pan, aadhar
    } = this.state;
    return (
      !firstNameError && !lastNameError && !usernameError && !emailAddressError && !passwordError &&
      !countryCodeError && !phoneError && !countryError && !cityError && !panError && !aadharError &&
      firstName && lastName && username && emailAddress && password &&
      countryCode && phone && country && city && pan && aadhar
    );
  };

  render() {
    if (this.state.isFormSubmitted && this.state.submittedData) {
      const data = this.state.submittedData;
      return (
        <div className="main">
          <h3>Thanks for signing up, find your details below:</h3>
          <div>First Name: {data.firstName}</div>
          <div>Last Name: {data.lastName}</div>
          <div>Username: {data.username}</div>
          <div>Email Address: {data.emailAddress}</div>
          <div>Phone: {data.countryCode} {data.phone}</div>
          <div>Country: {data.country}</div>
          <div>City: {data.city}</div>
          <div>PAN No.: {data.pan}</div>
          <div>Aadhar No.: {data.aadhar}</div>
        </div>
      );
    }

    return (
      <div className="main">
        <h2>SignUp Form</h2>
        <form onSubmit={this.handleSubmit} style={{ textAlign: "center" }}>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <br />
          {this.state.firstNameError && (
            <div className="errorMsg">{this.state.firstNameError}</div>
          )}

          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <br />
          {this.state.lastNameError && (
            <div className="errorMsg">{this.state.lastNameError}</div>
          )}

          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <br />
          {this.state.usernameError && (
            <div className="errorMsg">{this.state.usernameError}</div>
          )}

          <input
            type="email"
            placeholder="Email Address"
            name="emailAddress"
            value={this.state.emailAddress}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <br />
          {this.state.emailAddressError && (
            <div className="errorMsg">{this.state.emailAddressError}</div>
          )}

          <input
            type={this.state.showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
            style={{ width: 220 }}
          />
          <button
            type="button"
            onClick={() => this.setState({ showPassword: !this.state.showPassword })}
            style={{
              marginLeft: 8,
              border: "none",
              background: "none",
              cursor: "pointer",
              verticalAlign: "middle",
              padding: 0,
              width: 24,
              height: 24,
              borderRadius: "50%",
              outline: "none"
            }}
            tabIndex={-1}
            aria-label={this.state.showPassword ? "Hide password" : "Show password"}
          >
            <span
              style={{
                display: "inline-block",
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "2px solid #333",
                background: this.state.showPassword ? "#333" : "#fff",
                transition: "background 0.2s"
              }}
            />
          </button>
          <br />
          {this.state.passwordError && (
            <div className="errorMsg">{this.state.passwordError}</div>
          )}

          <input
            type="text"
            placeholder="Country Code (e.g. +91)"
            name="countryCode"
            value={this.state.countryCode}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={{ width: 80 }}
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={{ width: 140, marginLeft: 8 }}
            autoComplete="off"
          />
          <br />
          {this.state.countryCodeError && (
            <div className="errorMsg">{this.state.countryCodeError}</div>
          )}
          {this.state.phoneError && (
            <div className="errorMsg">{this.state.phoneError}</div>
          )}

          <select
            name="country"
            value={this.state.country}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={{ width: 230 }}
          >
            <option value="">Select Country</option>
            {Object.keys(countries).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <br />
          {this.state.countryError && (
            <div className="errorMsg">{this.state.countryError}</div>
          )}

          <select
            name="city"
            value={this.state.city}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            style={{ width: 230 }}
            disabled={!this.state.country}
          >
            <option value="">Select City</option>
            {this.state.country &&
              countries[this.state.country].map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
          </select>
          <br />
          {this.state.cityError && (
            <div className="errorMsg">{this.state.cityError}</div>
          )}

          <input
            type="text"
            placeholder="PAN No."
            name="pan"
            value={this.state.pan}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <br />
          {this.state.panError && (
            <div className="errorMsg">{this.state.panError}</div>
          )}

          <input
            type="text"
            placeholder="Aadhar No."
            name="aadhar"
            value={this.state.aadhar}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
          />
          <br />
          {this.state.aadharError && (
            <div className="errorMsg">{this.state.aadharError}</div>
          )}

          <button type="submit" disabled={!this.isFormValid()}>Signup</button>
        </form>
      </div>
    );
  }
}

export default FormComponent;

