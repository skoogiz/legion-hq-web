import {Typography, Card, CardContent, Container} from "@mui/material";
import {useNews} from "@legion-hq/data-access/hooks/useNews";
import {NewsPost} from "@legion-hq/types/news";
import {PageColumn, PageTitle} from "@legion-hq/components/PageLayout";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

function Post({title, date, body}: NewsPost) {
  return (
    <Grid xxs={12}>
      <Card>
        <CardContent>
          <Typography variant="h6">{title}</Typography>
          <Typography variant="caption" color="textSecondary">
            {date}
          </Typography>
          <Typography variant="body2">{body}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

function News() {
  const {newsPosts} = useNews();
  return (
    <Container maxWidth="lg">
      <PageColumn>
        <PageTitle>Website Updates</PageTitle>
        <Grid container flexDirection="column" xxs={12} gap={2}>
          {newsPosts.map((post, i) => (
            <Post
              key={`${post.title}_${i}`}
              title={post.title}
              date={post.date}
              body={post.body}
            />
          ))}
        </Grid>
      </PageColumn>
    </Container>
  );
}

export default News;
