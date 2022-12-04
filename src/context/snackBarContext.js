import PropTypes from "prop-types";
import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useMemo, useState } from "react";

const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  // call this function to activate the snackbar
  const activateSnackBar = (message, severity) => {
    setSnackBar({
      open: true,
      message: message,
      severity: severity,
    });
  }

  // call this function to close the snackbar
  const onClose = () => {
    setSnackBar({
      open: false,
      message: "",
      severity: "success",
    });
  };

  const value = useMemo(
    () => ({
      snackBar,
      activateSnackBar,
      onClose,
    }),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [snackBar]
  );

  return (
    <SnackBarContext.Provider value={value}>
      <Snackbar onClose={onClose} open={snackBar.open} autoHideDuration={6000}>
        <Alert onClose={onClose} severity={snackBar.severity} sx={{ width: '100%' }}>
          {snackBar.message}
        </Alert>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  return useContext(SnackBarContext);
};

SnackBarProvider.propTypes = {
  children: PropTypes.node,
  snackBar: PropTypes.object,
  activateSnackBar: PropTypes.func,
  onClose: PropTypes.func,
};