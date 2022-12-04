import { useRef, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import url from "../../../common/url";
import { useSnackBar } from "../../../context/snackBarContext";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQueryClient } from 'react-query';

const CommentOnPost = ({ postId }) => {

  const queryClient = useQueryClient();
  const { activateSnackBar } = useSnackBar();
  const commentRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const axios = useAxios();

  const postComment = async (comment) => {
    const { data } = await axios.post(url.posts.comment(postId), comment);
    return data;
  }

  const { mutate } = useMutation(postComment, {
    onSuccess: data => {
      const privPost = queryClient.getQueryData("singlePost");
      //add data to the privPost.comments array
      queryClient.setQueryData("singlePost", {
        ...privPost,
        comments: [data, ...privPost.comments]
      });
      activateSnackBar("Comment posted successfully", "success");
      commentRef.current.value = "";
      setDisabled(true);
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleOnChange = (e) => {
    e.target.value.length > 0 ? setDisabled(false) : setDisabled(true);
  }

  const handleComment = () => {
    mutate({ body: commentRef.current.value });
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label="Comment..."
          multiline
          fullWidth
          size="small"
          inputRef={commentRef}
          defaultValue=""
          onChange={(e) => { handleOnChange(e) }}
          InputProps={{
            disableUnderline: true,
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  disabled={disabled}
                  onClick={handleComment}
                  sx={{ marginBottom: "16px" }}
                  variant="text"
                >
                  Post
                </Button>
              </InputAdornment>
            )
          }}
          variant="filled"
        />
      </Box>
    </Box>
  );
}

export default CommentOnPost;