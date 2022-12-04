import { LoadingButton } from "@mui/lab";
import useAxios from "../../hooks/useAxios";
import { useMutation } from "react-query";
import url from "../../common/url";
import { useSnackBar } from "../../context/snackBarContext";
import { useTheme } from "@mui/system";

const UnFollowOnProfilePage = ({ profile, handleUpdateFollowing }) => {

  const theme = useTheme();
  const axios = useAxios();
  const { activateSnackBar } = useSnackBar();

  const unFollow = async () => {
    const { data } = await axios.put(url.profiles.unFollow(profile.name));
    return data;
  }

  const { mutate, isLoading } = useMutation(unFollow, {
    onSuccess: () => {
      handleUpdateFollowing("unfollow");
      activateSnackBar(`You are no longer following ${profile.name}`, "success")
    },
    onError: () => {
      activateSnackBar("Something went wrong", "error");
    }
  });

  const handleUnFollow = () => {
    mutate();
  };

  return (
    <>
      {theme.palette.mode === "dark"
        ?
        <LoadingButton loading={isLoading} size="small" onClick={handleUnFollow} variant="outlined" color="secondary">
          Un follow
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
          onClick={handleUnFollow}
        >
          Un follow
        </LoadingButton>
      }

    </>
  );
}

export default UnFollowOnProfilePage;