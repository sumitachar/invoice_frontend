/**
=========================================================
* Material Dashboard 3 PRO React - v2.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import checkout from "layouts/pages/users/new-user/schemas/form";

const {
  formField: {
    firstName,
    lastName,
    company,
    email,
    password,
    repeatPassword,
    address1,
    address2,
    city,
    state,
    zip,
    twitter,
    facebook,
    instagram,
    publicEmail,
    bio,
  },
} = checkout;

const initialValues = {
  [firstName.name]: "",
  [lastName.name]: "",
  [company.name]: "",
  [email.name]: "",
  [password.name]: "",
  [repeatPassword.name]: "",
  [address1.name]: "",
  [address2.name]: "",
  [city.name]: "",
  [zip.name]: "",
  [state.name]: "",
  [twitter.name]: "",
  [facebook.name]: "",
  [instagram.name]: "",
  [publicEmail.name]: "",
  [bio.name]: "",
};

export default initialValues;
