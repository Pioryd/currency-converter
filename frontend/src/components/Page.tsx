import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {
      clear: "both",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: "none",
      fontFamily: "sans-serif",
      background: "white",
      height: "100vh",
      boxSizing: "border-box",
      overflow: "none"
    }
  })
);

export default function Page({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.page}>{children}</div>;
}
