import { useState, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useAuth } from "../context/authContext";

export const useAxiosHook = () => {
  const { user } = useAuth();

  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
  axios.defaults.headers.common["Authorization"] = user ? `Bearer ${user.accessToken}` : "";

  const [response, setResponse] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const controllerRef = useRef(new AbortController());
  const cancel = () => {
    controllerRef.current.abort();
  };

  const fetchData = async (axiosParams) => {
    try {
      setLoading(true);
      const result = await axios.request({
        ...axiosParams,
        signal: controllerRef.current.signal,
      });

      if (!result.statusText === "OK") {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      if (result.data === undefined || result.data === null) {
        setResponse(result);
      } else {
        setResponse(result.data);
      }
    }
    catch (error) {
      console.log(error);
      setError(error.response.data.errors);
      console.error(error.response.data.errors);
    }
    finally {
      setLoading(false);
    }
  };

  return { response, error, loading, cancel, fetchData };
};

useAxiosHook.propTypes = {
  children: PropTypes.node,
};

