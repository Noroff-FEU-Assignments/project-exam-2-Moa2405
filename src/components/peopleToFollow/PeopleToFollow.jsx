import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { useQuery, useMutation } from "react-query";
import { useAuth } from "../../context/authContext";
import { useTheme } from "@mui/system";
import url from "../../common/url";
import ErrorAlert from "../alert/ErrorAlert";
import { Link } from "react-router-dom";
import { stringAvatar } from "../../utils/avatarPlaceHolder";
import { useSnackBar } from "../../context/snackBarContext";
import { Avatar, Stack, Box, Button, CircularProgress, Hidden, Paper, Typography } from "@mui/material";
import PropTypes from "prop-types";

const PeopleToFollow = () => {

  const [profiles, setProfiles] = useState([]);
  const [profilesToFollow, setProfilesToFollow] = useState(null);
  const { user, updateUser } = useAuth();
  const axios = useAxios();
  const theme = useTheme();
  const { activateSnackBar } = useSnackBar();

  const fetchPeopleToFollow = async () => {
    const { data } = await axios.get(url.profiles.firstHundredUsers);
    return data;
  }

  const mutation = useMutation((name) =>
    axios.put(url.profiles.follow(name))
  );

  const { isLoading, isError } = useQuery("PeopleToFollow", fetchPeopleToFollow, {
    onSuccess: (data) => {
      setProfiles(data);
    },
  });

  useEffect(() => {
    let mounted = true;

    if (mounted && profiles.length !== 0) {
      //filtering through the data array and returning a new array were data.name !== user.following.name
      const filteredProfiles = profiles.filter(profile => {
        return !user.following.some(following => following.name === profile.name)
      });
      //filter through filteredProfiles array and return a new array were avatar !== null
      const filteredProfilesWithAvatar = filteredProfiles.filter(profile => {
        return profile.avatar !== null && profile.avatar !== "";
      });

      if (filteredProfilesWithAvatar.length > 5) {
        setProfilesToFollow(filteredProfilesWithAvatar.slice(0, 5));
      }
      else {
        setProfilesToFollow(filteredProfilesWithAvatar);
      }
    }

    return () => {
      mounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profiles, user.following]);

  const handleFollow = (profile) => {
    const { name } = profile;
    const newFollowing = [profile, ...user.following];
    updateUser({ ...user, following: newFollowing });
    mutation.mutate(name, {
      onSuccess: () => {
        activateSnackBar("You are now following " + profile.name, "success");
      },
      onError: () => {
        activateSnackBar("Something went wrong", "error");
      }
    });
  }

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress />
      </Box>
    )
  }

  if (isError) {
    return (
      <ErrorAlert />
    )
  }

  return (
    <>
      <Hidden mdDown>
        <Paper elevation={2} width="100%" sx={{ p: 2 }}>
          <Stack spacing={3}>
            <Typography color="textSecondary">
              People to follow
            </Typography>
            <Stack spacing={2}>
              {profilesToFollow && profilesToFollow.map((profile, index) => (
                <Stack key={index} direction="row" alignItems="center" justifyContent="space-between">
                  <Link to={`/user/${profile.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      {profile.avatar === null || profile.avatar === "" ?
                        <Avatar {...stringAvatar} sx={{ height: 25, width: 25 }} /> :
                        <Avatar src={profile.avatar} sx={{ height: 25, width: 25 }} />}
                      <Typography noWrap>
                        {profile.name}
                      </Typography>
                    </Stack>
                  </Link>
                  <Button
                    onClick={() => { handleFollow(profile) }}
                    variant="text"
                    color={theme.palette.mode === "dark" ? "secondary" : "secondaryLightTheme"}
                    size="small"
                    sx={{ textTransform: "none" }}>
                    Follow
                  </Button>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Hidden>
      <Hidden mdUp>
        <Stack sx={{ px: { xxs: "17px", xs: "0px" } }} spacing={1}>
          <Typography color="textSecondary">
            People to follow
          </Typography>
          <Stack direction="row" py={1} width="100%" spacing={2} sx={{ overflowX: "scroll" }}>
            {profilesToFollow && profilesToFollow.map((profile, index) => (
              <Paper elevation={1} key={index}>
                <Stack sx={{ borderRadius: "0.25rem" }} p={1} alignItems="center" spacing={1}>
                  <Link to={`/user/${profile.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Stack spacing={1} alignItems="center">
                      {profile.avatar === null || profile.avatar === "" ?
                        <Avatar {...stringAvatar} sx={{ height: 48, width: 48 }} /> :
                        <Avatar src={profile.avatar} sx={{ height: 48, width: 48 }} />
                      }
                      <Box width="100%">
                        <Typography noWrap={true} variant="body2" align="center">
                          {profile.name}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                  <Button
                    onClick={() => { handleFollow(profile) }}
                    variant="text"
                    color={theme.palette.mode === "dark" ? "secondary" : "secondaryLightTheme"}
                    size="small"
                  >
                    Follow
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Hidden>
    </>
  );
}

PeopleToFollow.propTypes = {
  profiles: PropTypes.array,
  profilesToFollow: PropTypes.array,
  user: PropTypes.object,
  updateUser: PropTypes.func,
  axios: PropTypes.object,
  theme: PropTypes.object,
  activateSnackBar: PropTypes.func,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  fetchPeopleToFollow: PropTypes.func,
  mutation: PropTypes.object,
  setProfiles: PropTypes.func,
  setProfilesToFollow: PropTypes.func,
};

export default PeopleToFollow;