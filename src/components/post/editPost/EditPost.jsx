import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import url from "../../../common/url";
import { useSnackBar } from "../../../context/snackBarContext";
import { usePostsContext } from "../../../context/postContext";
import {
  Modal,
  Button,
  Chip,
  TextField,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  ListItemIcon,
  MenuItem,
  Paper
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import ErrorAlert from "../../alert/ErrorAlert";

const schema = yup.object().shape({
  title: yup.string().required("This field is required").max(280, "Title must be less than 280 characters"),
  body: yup.string().max(280, "Title must be less than 280 characters"),
  media: yup.string().url("Must be a valid url").matches(/^$|^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|tiff|tif|svg|svgz)(?:\?.*)?$/, "Must be a valid image url"),
});

const EditPost = ({ post, closeMenu }) => {

  // state for the modal
  const [openModal, setOpenModal] = useState(false);

  const { activateSnackBar } = useSnackBar();

  const { response, loading, error, fetchData } = useAxiosHook()
  const { updatePost } = usePostsContext();
  const theme = useTheme();

  // a reference to the tag input field
  const inputRefTags = useRef(null);

  // state for the tags
  const [tags, setTags] = useState(post.tags);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValue: {
      title: post.title,
      body: post.body ? post.body : "",
      media: post.media ? post.media : "",
    }
  });

  //onClick event to add tags to the state
  const handleAddTagToArray = () => {
    const tag = inputRefTags.current.value;
    if (tag) {
      const tagToAdd = "#" + tag.trim().toLowerCase().replaceAll(" ", "");
      setTags([...tags, tagToAdd]);
      inputRefTags.current.value = "";
    }
  }

  const handleSubmitPost = async (data) => {
    const postData = { ...data, tags };

    fetchData({
      method: "put",
      url: url.posts.editPost(post.id),
      data: postData,
    });
  }

  useEffect(() => {
    //check if the response is not empty array
    if (response.length !== 0) {
      console.log(response);
      updatePost(response);
      setOpenModal(false);
      closeMenu();
      activateSnackBar("Post updated successfully", "success");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response])

  //onClick event to remove tag from the state
  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  }

  const handleReset = () => {
    reset()
    setTags(post.tags)
  }

  const handleOpenEditModal = () => {
    setOpenModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenModal(false)
    closeMenu();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: "10px",
    border: "2px solid",
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[500],
    padding: "1rem",
  };

  return (
    <>
      <MenuItem onClick={handleOpenEditModal}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <Typography variant="body1" component="p">Edit</Typography>
      </MenuItem>
      <Modal
        sx={{ overflowY: "scroll", mx: "1rem" }}
        open={openModal}
        onClose={handleCloseEditModal}
        aria-labelledby="Edit Post"
        aria-describedby="Edit post"
      >
        <Paper elevation={1} style={style}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
              <IconButton sx={{ marginLeft: "-10px" }} fontSize="large" onClick={handleCloseEditModal}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h5">
                Edit post
              </Typography>
              <Button variant="contained" onClick={handleReset}>Reset</Button>
            </Stack>
            <Stack
              spacing={2}
              direction="column"
              component="form"
              noValidate
              autoComplete="off"
            >
              {/* mui textfield for title */}
              <Controller
                name="title"
                control={control}
                defaultValue={post.title}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title*"
                    size="small"
                    variant="standard"
                    type="text"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              {/* mui textfield for body */}
              <Controller
                name="body"
                control={control}
                defaultValue={post.body ? post.body : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    style={{ marginBottom: "2rem" }}
                    label="Wats on your mind..."
                    size="small"
                    variant="standard"
                    maxRows={10}
                    multiline
                    type="text"
                    InputProps={{ disableUnderline: true, }}
                    error={!!errors.body}
                    helperText={errors.body?.message}
                  />
                )}
              />
              {/* mui textfield for media */}
              <Controller
                name="media"
                control={control}
                defaultValue={post.media ? post.media : ""}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Image url"
                    size="small"
                    variant="outlined"
                    type="text"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <ImageOutlinedIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors.media}
                    helperText={errors.media?.message}
                  />
                )}
              />
            </Stack>
            {/* Tags */}
            <Stack
              direction="column"
              spacing={2}

            >
              <Stack
                mt={2}
                component="form"
                noValidate
                autoComplete="off"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                {/* mui textfield for tags */}
                <TextField
                  inputRef={inputRefTags}
                  label="Tag"
                  size="small"
                  variant="outlined"
                  type="text"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <StyleOutlinedIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  onClick={handleAddTagToArray}
                  variant="contained"
                  style={{ height: "39px" }}
                  disableElevation
                  sx={{
                    backgroundColor: theme.palette.mode === "light" ?
                      theme.palette.grey[300] :
                      theme.palette.grey[800],
                    color: theme.palette.mode === "light" ? "black" : "white",
                  }}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Stack>
              <Stack
                direction="row"
                spacing={1}

              >
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    onDelete={() => removeTag(tag)}

                  />
                ))}
              </Stack>
            </Stack>
            <LoadingButton
              onClick={handleSubmit(handleSubmitPost)}
              variant="contained"
              color="primary"
              loading={loading}
            >
              Edit post
            </LoadingButton>
            {error && <ErrorAlert />}
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  closeMenu: PropTypes.func.isRequired,
};


export default EditPost;