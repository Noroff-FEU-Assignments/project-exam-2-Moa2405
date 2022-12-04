import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { useTheme } from "@emotion/react";
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useAxiosHook } from "../../../hooks/useAxiosHook";
import { usePostsContext } from "../../../context/postContext";
import url from "../../../common/url";
import { useSnackBar } from "../../../context/snackBarContext";
import {
  Modal,
  Button,
  Chip,
  TextField,
  Typography,
  IconButton,
  Stack,
  InputAdornment,
  Paper,
  Avatar
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from "@mui/lab";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import AddIcon from '@mui/icons-material/Add';
import ErrorAlert from "../../alert/ErrorAlert";

const schema = yup.object().shape({
  title: yup.string().required("This field is required").max(280, "Title must be less than 280 characters"),
  body: yup.string().max(280, "Message must be less than 280 characters"),
  media: yup.string().url("Must be a valid url").matches(/^$|^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|tiff|tif|svg|svgz)(?:\?.*)?$/, "Must be a valid image url"),
});

const CreatePost = () => {

  // a reference to the tag input field
  const inputRefTags = useRef(null);
  const [tags, setTags] = useState([]);
  // state for the modal
  const [openModal, setOpenModal] = useState(false);
  //create-post-btn disabled state
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { response, loading, error, fetchData } = useAxiosHook();
  const { addPost } = usePostsContext();
  const { activateSnackBar } = useSnackBar();
  const theme = useTheme();

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      body: "",
      media: ""
    }
  });

  const disableCreatePostBtn = (value) => {
    if (value === "") {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }

  //onClick event to add tags to the state
  const handleAddTagToArray = () => {
    const tag = inputRefTags.current.value;
    if (tag) {
      const tagToAdd = "#" + tag.trim().toLowerCase().replaceAll(" ", "");
      setTags([...tags, tagToAdd]);
      inputRefTags.current.value = "";
    }
  }

  //remove keys in object were value is empty string and remove keys in object if value is empty array
  const formatData = (obj) => {
    Object.keys(obj).forEach(key => {
      if (obj[key] && typeof obj[key] === "object") formatData(obj[key]);
      else if (obj[key] === "") delete obj[key];
    });
    return obj;
  };

  const handleSubmitPost = async (data) => {

    const postData = { ...data, tags };
    const newObject = formatData(postData);
    console.log(newObject);

    fetchData({
      method: "POST",
      url: url.posts.createPost,
      data: newObject,
    });
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (typeof response === 'object' &&
        response !== null && !Array.isArray(response)) {

        addPost(response);
        activateSnackBar("Post created successfully", "success");
        reset();
        setOpenModal(false);

      } else if (typeof response === 'string') {

        activateSnackBar("Something went wrong", "error");
      }
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  //onClick event to remove tag from the state
  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  }

  const handleOpenPostModal = () => setOpenModal(true);

  const handleClosePostModal = () => {
    reset();
    setOpenModal(false)
    setTags([]);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: "10px",
    border: "2px solid",
    borderColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[500],
    padding: "1rem",
    width: "100%",
    maxWidth: "500px",
  };

  return (
    <>
      <Avatar onClick={handleOpenPostModal}
        sx={{ height: 30, width: 30, cursor: "pointer", bgcolor: theme.palette.primary.main, [theme.breakpoints.up("md")]: { display: "none" } }}>
        <img src="/logo-black.svg" alt="Create a post" height="19" style={{ color: "#000", marginRight: "3px" }} />
      </Avatar>
      <Button
        variant="contained"
        onClick={handleOpenPostModal}
        sx={{
          display: "none",
          [theme.breakpoints.up("md")]: {
            display: "block",
          },
          width: "100%",
          borderRadius: "0.25rem",
          margin: ".5rem 0",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Post
      </Button>
      <Modal
        sx={{ overflowY: "scroll", mx: "1rem" }}
        open={openModal}
        onClose={handleClosePostModal}
        aria-labelledby="Create Post"
        aria-describedby="Create a new post"
      >
        <Paper elevation={1} sx={style}>
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" width="55%">
              <IconButton fontSize="large" onClick={handleClosePostModal}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h5">
                Post
              </Typography>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              component="form"
              noValidate
              sx={{ margin: "0px" }}
              autoComplete="off"
            >
              {/* mui textfield for title */}
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Title*"
                    size="small"
                    variant="standard"
                    type="text"
                    onChange={(e) => { field.onChange(e); disableCreatePostBtn(e.target.value) }}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                )}
              />
              {/* mui textfield for body */}
              <Controller
                name="body"
                control={control}
                defaultValue=""

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
                defaultValue=""
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
            {/*  */}
            <Stack
              direction="column"
              spacing={1}
              mt={2}
            >
              <Stack
                spacing={1}
                autoComplete="off"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <TextField
                  inputRef={inputRefTags}
                  label="Tag"
                  size="small"
                  variant="outlined"
                  type="text"
                  margin="normal"
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
                  style={{ marginTop: "10px" }}
                  disableElevation
                  sx={{
                    height: "39px",
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
              disabled={disabledBtn}
              onClick={handleSubmit(handleSubmitPost)}
              variant="contained"
              color="primary"
              loading={loading}
            >
              Create Post
            </LoadingButton>
            {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
          </Stack>
        </Paper>
      </Modal>
    </>
  );
}

CreatePost.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
};


export default CreatePost;