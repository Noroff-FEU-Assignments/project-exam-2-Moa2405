import { useRef, useState } from "react";
import url from "../../../common/url";
import useAxios from "../../../hooks/useAxios";
import { useMutation, useQueryClient } from 'react-query';
import { useSnackBar } from "../../../context/snackBarContext";
import { Box, InputAdornment, TextField, Button } from "@mui/material";

const ReplyToComment = ({ postId, commentId }) => {

  const queryClient = useQueryClient();
  const { activateSnackBar } = useSnackBar();
  const commentRef = useRef();
  const [disabled, setDisabled] = useState(true);
  const axios = useAxios();

  const postComment = async (data) => {
    const response = await axios.post(url.posts.comment(postId), data)
    return response;
  }

  const { mutate } = useMutation(postComment, {
    onSuccess: data => {
      const privPost = queryClient.getQueryData("singlePost");

      queryClient.setQueryData("singlePost", {
        ...privPost,
        comments: [data, ...privPost.comments]
      });
      activateSnackBar("Reply posted successfully", "success");
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

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          label="Reply..."
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
                  onClick={() => {
                    mutate({ body: commentRef.current.value, replyToId: commentId })
                  }}
                  sx={{ marginBottom: "16px" }}
                  variant="text"
                >
                  Post
                </Button>
              </InputAdornment>
            ),
          }}
          variant="filled"
        />
      </Box>
    </Box>
  );
}

export default ReplyToComment;