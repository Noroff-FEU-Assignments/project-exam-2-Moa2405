import { LoadingButton } from "@mui/lab";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";
import url from "../../common/url";
import { useSnackBar } from "../../context/snackBarContext";
import { useTheme } from "@mui/system"

const FollowOnProfilePage = ({ profile, handleUpdateFollowing }) => {

  const theme = useTheme();
  const axios = useAxios();
  const { activateSnackBar } = useSnackBar();

  const follow = async () => {
    const { data } = await axios.put(url.profiles.follow(profile.name));
    return data;
  }

  const { mutate, isLoading } = useMutation(follow, {
    onSuccess: () => {
      handleUpdateFollowing("follow");
      activateSnackBar(`You are now following ${profile.name}`, "success");
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleFollow = () => {
    mutate();
  };

  return (
    <>
      {theme.palette.mode === "dark"
        ?
        <LoadingButton loading={isLoading} size="small" onClick={handleFollow} variant="outlined" color="secondary">
          Follow
        </LoadingButton>
        :
        <LoadingButton
          sx={{
            borderColor: theme.palette.grey[900],
            color: theme.palette.grey[900],
          }}
          loading={isLoading}
          size="small"
          variant="outlined"
          onClick={handleFollow}
        >
          Follow
        </LoadingButton>
      }
    </>
  );
}

export default FollowOnProfilePage;