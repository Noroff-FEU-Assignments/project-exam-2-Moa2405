import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useAuth } from "../../context/authContext";
import { useParams } from 'react-router-dom';
import url from "../../common/url";
import ProfileMedia from "../../components/profile/ProfileMedia";
import useAxios from "../../hooks/useAxios";
import UsersProfilePosts from "../../components/profile/UsersProfilesPosts";
import ErrorAlert from "../../components/alert/ErrorAlert";
import FollowOnProfilePage from "../../components/profile/FollowOnProfilePage";
import UnFollowOnProfilePage from "../../components/profile/UnFollowOnProfilePage";

const UsersProfile = () => {

  const { user, updateUser } = useAuth();
  const { name } = useParams();
  const axios = useAxios();
  const [userProfile, setUserProfile] = useState(null);
  const [profileMedia, setProfileMedia] = useState([]);
  const [isFollowing, setIsFollowing] = useState(null);

  const handleUpdateFollowing = (action) => {

    if (action === "follow") {
      const updatedUser = { ...user, following: [...user.following, { name: userProfile.name, avatar: userProfile.avatar }] };
      updateUser(updatedUser);
      setIsFollowing(true);
    }
    else if (action === "unfollow") {
      const updatedUser = { ...user, following: user.following.filter(following => following.name !== userProfile.name) };
      updateUser(updatedUser);
      setIsFollowing(false);
    }
  }

  const handelSetFollowing = () => {
    const isFollowing = user.following.find(following => following.name === userProfile.name);
    isFollowing === undefined ? setIsFollowing(false) : setIsFollowing(true);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted && userProfile !== null) {
      handelSetFollowing();
    }
    return () => { isMounted = false; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const fetchUsersProfile = async () => {
    const { data } = await axios.get(url.profiles.profile(name));
    return data;
  }

  const { isError, isLoading } = useQuery(["usersProfile", { name }], fetchUsersProfile, {
    onSuccess: (data) => {
      setUserProfile(data);
      setProfileMedia({
        banner: data.banner,
        avatar: data.avatar
      });
    },
  });

  if (isLoading) {
    return (
      <Stack width="100%" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    )
  }

  if (isError) {
    return <ErrorAlert />
  }

  return (
    <>
      {userProfile !== null && (
        <div>
          <ProfileMedia name={userProfile.name} media={profileMedia} />
          <Stack direction="row" px={2} alignItems="center" justifyContent="space-between">
            <Stack mt={6}>
              <Typography variant="h5" fontWeight="bold" component="h1">
                {userProfile.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.followers}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontWeight="bold" component="p">
                    Followers
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.following}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontWeight="bold" component="p">
                    Following
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing="5px">
                  <Typography variant="body2" fontWeight="bold" component="p">
                    {userProfile._count.posts}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontWeight="bold" component="p">
                    Posts
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            {!isFollowing ?
              <FollowOnProfilePage profile={userProfile} handleUpdateFollowing={handleUpdateFollowing} />
              : <UnFollowOnProfilePage profile={userProfile} handleUpdateFollowing={handleUpdateFollowing} />}
          </Stack>
        </div>
      )}
      <Box mt={2}>
        <UsersProfilePosts name={name} />
      </Box>
    </>
  );

}

UsersProfile.propTypes = {
  name: PropTypes.string,
  handelSetFollowing: PropTypes.func,
  handleUpdateFollowing: PropTypes.func,
  isFollowing: PropTypes.bool,
  profileMedia: PropTypes.object,
  userProfile: PropTypes.object,

};

export default UsersProfile;



