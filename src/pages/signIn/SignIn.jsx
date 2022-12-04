import { useEffect } from "react";
import PropTypes from "prop-types";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../context/authContext'
import url from "../../common/url";
import { Alert, Box, Divider, Stack, TextField, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAxiosHook } from "../../hooks/useAxiosHook";
import { useTheme } from "@mui/system";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("This field is required").email("Must be a valid email").matches(/stud.noroff.no$|noroff.no$/, "Must be a @stud.noroff.no or @noroff.no email"),
  password: yup.string().required("This field is required").min(8, "Must be at least 8 characters"),
});

const SignIn = () => {

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { loading, response, error, fetchData } = useAxiosHook();
  const { login } = useAuth();
  const theme = useTheme();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleAddFollowingAndFollowers = async (user) => {
    const options = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    }
    const res = await fetch(`${BASE_URL}${url.profiles.getFollowersAndFollowing(user.name)}`, options);
    if (res.status === 200) {
      const result = await res.json()
      const userObjectContext = { ...user, followers: result.followers, following: result.following };
      login(userObjectContext);
    }
  }

  const onSubmit = async (data) => {
    fetchData({
      method: "post",
      url: url.auth.login,
      data
    });
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && response.accessToken) {
      handleAddFollowingAndFollowers(response)
    }

    return () => {
      isMounted = false;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <Box
      width="100%"
      maxWidth="400px"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Stack spacing={3} justifyContent="center" width="100%">
        <Logo />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              variant="outlined"
              type="email"
              size="small"
              color="primary"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
          )}
        />
        <LoadingButton sx={{ mt: 2 }} type="submit" loading={loading} variant="contained" color="primary">
          Sign in
        </LoadingButton>
        {error && <Alert sx={{ mt: 2 }} severity="error">{error[0].message}</Alert>}
        <Divider>Or</Divider>
        <Stack direction="row" justifyContent="center" spacing={1}>
          <Typography variant="body2">
            Do not have an account?
          </Typography>
          <Link to="/register" style={{ color: theme.palette.primary.main, textDecoration: "none" }}>
            <Typography variant="body2">
              Register here
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
}

SignIn.propTypes = {
  history: PropTypes.object,
  handleAddFollowingAndFollowers: PropTypes.func,
  onSubmit: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.array,
  response: PropTypes.object,
};

export default SignIn;




