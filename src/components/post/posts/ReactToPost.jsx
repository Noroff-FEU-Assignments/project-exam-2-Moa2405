import PropTypes from "prop-types";
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import useAxios from '../../../hooks/useAxios';
import { useMutation } from 'react-query';
import url from '../../../common/url';
import { useTheme } from '@mui/system';
import { useSnackBar } from '../../../context/snackBarContext';
import AddReactionOutlinedIcon from '@mui/icons-material/AddReactionOutlined'
import { Chip, Grid, IconButton, Popper, Stack } from "@mui/material";

const ReactToPost = ({ postId, reactions }) => {

  const theme = useTheme()
  const { activateSnackBar } = useSnackBar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [reactionsArray, setReactionsArray] = useState(reactions);
  const axios = useAxios();

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const mutationOnChipClick = useMutation((emojiObject) =>
    axios.put(url.posts.reactToPost(postId, emojiObject.symbol))
  );

  const mutationOnEmojiPicker = useMutation((emojiObject) =>
    axios.put(url.posts.reactToPost(postId, emojiObject.emoji))
  );

  const handleReactOnChip = async (emojiObject, index) => {
    mutationOnChipClick.mutate(emojiObject, {
      onSuccess: () => {
        const newReactionsArray = [...reactionsArray];
        newReactionsArray[index].count++;
        setReactionsArray(newReactionsArray);
      },
      onError: () => {
        activateSnackBar("Something went wrong", "error");
      }
    });
  }

  const handleReactOnPicker = async (emojiObject, event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    mutationOnEmojiPicker.mutate(emojiObject, {
      onSuccess: (data) => {
        const doseTheEmojiExists = reactionsArray.find(reaction => reaction.symbol === data.data.symbol);
        if (doseTheEmojiExists) {
          console.log('emoji exists');
          const index = reactionsArray.findIndex(reaction => reaction.symbol === data.data.symbol);
          const newReactionsArray = [...reactionsArray];
          newReactionsArray[index].count++;
          setReactionsArray(newReactionsArray);
        }
        else {
          setReactionsArray([...reactionsArray, data.data]);
        }
      },
      onError: () => {
        activateSnackBar("Something went wrong", "error");
      }
    });
  }

  const open = Boolean(anchorEl);
  const id = open ? 'emoji-picker-popper' : undefined;

  return (
    <>
      <Popper sx={{ zIndex: "1000" }} id={id} open={open} anchorEl={anchorEl} placement="top-start">
        <EmojiPicker width={250} searchDisabled lazyLoadEmojis={true} onEmojiClick={handleReactOnPicker} theme="dark" />
      </Popper>
      <Stack direction="row" alignItems="center" spacing={2} pr={2} pl={1} py={1}>
        <IconButton aria-label="React with emoji" onClick={handleClick}>
          <AddReactionOutlinedIcon
            fontSize="lg"
            sx={{ color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600] }}
          />
        </IconButton>
        <Grid container gap={1} direction="row" alignItems="center">
          {reactionsArray.length > 0 ? reactionsArray.map((reaction, index) => (
            <Chip
              key={index}
              size="small"
              variant="outlined"
              onClick={() =>
                handleReactOnChip(reaction, index)}
              label={reaction.symbol + " " + reaction.count}
              sx={{
                fontSize: "1em",
                color: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600],
                BorderColor: theme.palette.mode === "dark" ? theme.palette.grey[500] : theme.palette.grey[600]
              }}
            />
          )) : ""}
        </Grid>
      </Stack>
    </>
  );
}

ReactToPost.propTypes = {
  postId: PropTypes.number,
  reactions: PropTypes.array,
  handleReactOnPicker: PropTypes.func,
  handleReactOnChip: PropTypes.func,
  handleClick: PropTypes.func,
  open: PropTypes.bool,
  id: PropTypes.string,
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
  setReactionsArray: PropTypes.func,
  reactionsArray: PropTypes.array,
  mutationOnChipClick: PropTypes.object,
  mutationOnEmojiPicker: PropTypes.object,
  activateSnackBar: PropTypes.func,
  theme: PropTypes.object,
  axios: PropTypes.object,
};

export default ReactToPost;