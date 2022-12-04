import { CircularProgress, ListItemIcon, MenuItem, Typography } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";
import { useAuth } from "../../context/authContext";
import ErrorIcon from '@mui/icons-material/Error';
import url from "../../common/url";
import { useSnackBar } from "../../context/snackBarContext";

const UnFollow = ({ post, setFollows, closeMenu }) => {

  const { user, updateUser } = useAuth();
  const axios = useAxios();
  const { activateSnackBar } = useSnackBar();

  const unFollow = async () => {
    const { data } = await axios.put(url.profiles.unFollow(post.author.name));
    return data;
  }

  const { mutate, isLoading, isError } = useMutation(unFollow, {
    onSuccess: () => {
      //update the user object in context
      const updatedUser = { ...user, following: user.following.filter(following => following.name !== post.author.name) };
      updateUser(updatedUser);

      //this is a function that updates the state of the parent component
      setFollows("notFollowing");
      closeMenu();
      activateSnackBar("You stopped following " + post.author.name, "success");;
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleUnFollow = () => {
    mutate();
  };

  return (
    <MenuItem onClick={handleUnFollow}>
      <ListItemIcon>
        {isError && <ErrorIcon />}
        {isLoading && <CircularProgress size={20} />}
        <Typography variant="body1" component="p">Un follow</Typography>
        {isError && <Typography variant="body1" color="error" component="p">Some thing went wrong</Typography>}
      </ListItemIcon>
    </MenuItem>
  );
}

export default UnFollow;