import {Typography, Divider, Container, Box} from "@mui/material";
import {useNews} from "@legion-hq/data-access/hooks/useNews";
import {NewsPost} from "@legion-hq/types/news";

function Post({title, date, body}: NewsPost) {
  return (
    <div>
      <Divider sx={{marginTop: "1em", marginBottom: "1em"}} />
      <Typography variant="h6">{title}</Typography>
      <Typography variant="caption" color="textSecondary">
        {date}
      </Typography>
      <Typography variant="body2">{body}</Typography>
    </div>
  );
}

function News() {
  const {newsPosts} = useNews();
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "stretch",
          padding: "2em 0",
        }}
      >
        <Typography variant="h4" style={{marginBottom: 8}}>
          Website Updates
        </Typography>
        {newsPosts.map((post, i) => (
          <Post
            key={`${post.title}_${i}`}
            title={post.title}
            date={post.date}
            body={post.body}
          />
        ))}
      </Box>
    </Container>
  );
}

/*
<div>
  <WidgetBot
    width={500}
    height={500}
    server="227631467532910602"
    channel="714567106620031076"
    shard="https://e.widgetbot.io"
  />
</div>
<div>
  <iframe
    width="350"
    height="500"
    frameBorder="0"
    title="Legion Discord"
    allowtransparency="true"
    src="https://discordapp.com/widget?id=227631467532910602&theme=dark&username="
  >
  </iframe>
</div>
*/

export default News;
