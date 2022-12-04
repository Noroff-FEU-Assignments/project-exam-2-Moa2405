import { Box, Paper, Skeleton, Stack } from "@mui/material";

const PostSkeleton = () => {
  return (
    <Box>
      {[...Array(10)].map((_, index) => (
        <Paper key={index}>
          <Stack spacing={1} width="100%" p={2}>
            <Stack direction="row" spacing={1}>
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
              <Skeleton animation="wave" variant="text" width={100} />
            </Stack>
            <Skeleton animation="wave" variant="text" width="50%" sx={{ fontSize: "2em" }} />
            <Skeleton animation="wave" variant="rounded" width="100%" height={200} />
          </Stack>
        </Paper>
      ))}
    </Box>
  );
}

export default PostSkeleton;