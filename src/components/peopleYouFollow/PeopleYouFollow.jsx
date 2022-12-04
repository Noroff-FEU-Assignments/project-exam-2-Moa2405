import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { stringAvatar } from "../../utils/avatarPlaceHolder";
import { Avatar, Paper, Typography, Stack } from "@mui/material";

const PeopleYouFollow = () => {

  const [peopleYouFollow, setPeopleYouFollow] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const peopleYouFollow = user.following;
      if (peopleYouFollow.length > 5) {
        setPeopleYouFollow(peopleYouFollow.slice(0, 5));
      }
      else {
        setPeopleYouFollow(peopleYouFollow);
      }
    }

    return () => {
      mounted = false;
    }
  }, [user.following]);

  return (
    <>
      <Paper elevation={2} width="100%" sx={{ p: 2 }}>
        <Stack spacing={3}>
          <Typography color="textSecondary">
            People you follow
          </Typography>
          <Stack spacing={2}>
            {peopleYouFollow && peopleYouFollow.map((user, index) => (
              <Link key={index} to={`/user/${user.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  {user.avatar === null || user.avatar === "" ?
                    <Avatar {...stringAvatar} sx={{ height: 25, width: 25 }} /> :
                    <Avatar src={user.avatar} sx={{ height: 25, width: 25 }} />}
                  <Typography>
                    {user.name}
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </>
  );
}

PeopleYouFollow.propTypes = {
  peopleYouFollow: PropTypes.array
}

export default PeopleYouFollow;