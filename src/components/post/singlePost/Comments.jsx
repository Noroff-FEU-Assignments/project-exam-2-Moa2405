import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { TransitionGroup } from "react-transition-group";
import ReplyToComment from "./ReplayToComment";
import { formatDistance } from "../../../utils/formatData";
import { Box, Collapse, Paper, Typography, Stack } from "@mui/material";
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const Comments = () => {

  const queryClient = useQueryClient();
  const [commentsState, setCommentsState] = useState([]);
  const comments = queryClient.getQueryData("singlePost").comments;

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const commentsWithReply = comments.filter(comment => comment.replyToId === null);
      const replies = comments.filter(comment => comment.replyToId !== null);
      commentsWithReply.forEach(comment => {
        comment.replies = replies.filter(reply => reply.replyToId === comment.id);
      });

      setCommentsState(commentsWithReply);
    }
    return () => {
      mounted = false;
    }
  }, [comments]);

  return (
    <Stack spacing={3} pt={5}>
      <Box sx={{ px: { xxs: "17px", xs: "0px" } }}>
        <Typography variant="h5" component="h2">Comments</Typography>
      </Box>
      <TransitionGroup>
        {commentsState && commentsState.map(comment => (
          <Collapse key={comment.id} timeout={500}>
            <Paper elevation={1} sx={{ p: 1, mb: 3 }}>
              <Timeline sx={{
                [`& .${timelineItemClasses.root}:before`]: {
                  flex: 0,
                  padding: 0,
                }, padding: 0
              }}
              >
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent pl={0}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                      <Stack direction="column">
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Link to={`/user/${comment.owner}`} style={{ textDecoration: "none" }}>
                            <Typography color="primary" variant="body2" fontWeight="bold">
                              {comment.owner.replace("_", " ")}
                            </Typography>
                          </Link>
                          <Typography color="textSecondary" variant="body2">{formatDistance(comment.created)}</Typography>
                        </Stack>
                        <Box>
                          <Typography fontSize="1rem">
                            {comment.body}
                          </Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </TimelineContent>
                </TimelineItem>
                {comment.replies.map(reply => (
                  <TimelineItem key={reply.id}>
                    <TimelineSeparator>
                      <TimelineDot />
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Stack direction="column" sx={{ borderRadius: "0.25rem" }}>
                        <Stack spacing={1} direction="row" alignItems="center">
                          <Link to={`/user/${reply.owner}`} style={{ textDecoration: "none" }}>
                            <Typography color="primary" variant="body2" fontWeight="bold" component="p">
                              {reply.owner.replace("_", " ")}
                            </Typography>
                          </Link>
                          <Typography color="textSecondary" variant="body2">{`Replied ${formatDistance(reply.created)}`}</Typography>
                        </Stack>
                        <Box>
                          <Typography fontSize="1rem">
                            {reply.body}
                          </Typography>
                        </Box>
                      </Stack>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
              <ReplyToComment postId={comment.postId} commentId={comment.id} />
            </Paper>
          </Collapse>
        ))}
      </TransitionGroup>
    </Stack>
  );
}

export default Comments;