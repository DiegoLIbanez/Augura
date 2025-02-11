import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GET_COMPANY_ALL } from "../constant/constant";

export const getAllCompany = createAsyncThunk(GET_COMPANY_ALL, async () => {
  const res = await axios.get("http://localhost:5001/api/v1/company/");
  return res.data;
});
