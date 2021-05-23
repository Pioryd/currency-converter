import { Grid, Box, Typography } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Converter from "./Converter";
import History from "./History";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center"
    },
    content: {
      marginTop: 50,
      maxWidth: 600
    },
    title: {
      textAlign: "center",
      marginBottom: 20
    }
  })
);

export default function Currency() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.content}>
        <Grid container direction="column">
          <Grid item>
            <Typography className={classes.title} variant="h5" component="h2">
              Currency Converter
            </Typography>
          </Grid>

          <Grid item>
            <Converter />
          </Grid>

          <Grid item>
            <History />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
