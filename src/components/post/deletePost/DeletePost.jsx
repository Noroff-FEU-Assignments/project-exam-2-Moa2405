import PropTypes from "prop-types";
import { CircularProgress, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import ErrorIcon from '@mui/icons-material/Error';
import url from "../../../common/url";
import { useSnackBar } from "../../../context/snackBarContext";
import { useEffect } from "react";
import { usePostsContext } from "../../../context/postContext";

const DeletePost = ({ post, closeMenu }) => {

  const { activateSnackBar } = useSnackBar()
  const { response, error, loading, fetchData } = useAxiosHook()
  const { deletePost } = usePostsContext()

  const handleDelete = () => {
    fetchData({
      method: "DELETE",
      url: url.posts.deletePost(post.id),
    });
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (response === 204) {
        deletePost(post.id);
        activateSnackBar("Post deleted successfully", "success");
        closeMenu();
      }
    }
    return () => mounted = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  return (
    <>
      <MenuItem onClick={handleDelete}>
        <ListItemIcon>
          {error && <ErrorIcon color="error" />}
          {loading && <CircularProgress size={20} />}
          <DeleteForeverOutlinedIcon color="error" />
        </ListItemIcon>
        <Typography variant="body1" color="error" component="p">Delete</Typography>
      </MenuItem>
      {error && <MenuItem><Typography variant="body1" color="error" component="p">Some thing went wrong</Typography></MenuItem>}
    </>
  );
}

DeletePost.propTypes = {
  post: PropTypes.object.isRequired,
  closeMenu: PropTypes.func.isRequired,
};


export default DeletePost;