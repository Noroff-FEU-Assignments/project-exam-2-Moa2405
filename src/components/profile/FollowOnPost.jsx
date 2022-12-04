import { CircularProgress, ListItemIcon, MenuItem, Stack, Typography } from "@mui/material"
import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";
import { useAuth } from "../../context/authContext";
import ErrorIcon from '@mui/icons-material/Error';
import url from "../../common/url";
import { useSnackBar } from "../../context/snackBarContext";

const Follow = ({ post, setFollows, closeMenu }) => {

  const { user, updateUser } = useAuth();
  const axios = useAxios();
  const { activateSnackBar } = useSnackBar();

  const follow = async () => {
    const { data } = await axios.put(url.profiles.follow(post.author.name));
    return data;
  }

  const { mutate, isLoading, isError } = useMutation(follow, {
    onSuccess: () => {
      const updatedUser = { ...user, following: [...user.following, { name: post.author.name, avatar: post.author.avatar }] };
      updateUser(updatedUser);

      //this is a function that updates the state of the parent component
      setFollows("following");
      closeMenu();
      activateSnackBar("You are now following " + post.author.name, "success");
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleFollow = () => {
    mutate();
  };

  return (
    <MenuItem onClick={handleFollow}>
      <ListItemIcon>
        <Stack spacing={2} direction="row">
          {isError && <ErrorIcon color="error" />}
          {isLoading && <CircularProgress size={20} />}
          <Stack spacing={1}>
            <Typography variant="body1" component="p">Follow</Typography>
            {isError && <Typography variant="body1" color="error">Some thing went wrong</Typography>}
          </Stack>
        </Stack>
      </ListItemIcon>
    </MenuItem>
  );
}

export default Follow;