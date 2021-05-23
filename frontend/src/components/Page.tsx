import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export interface Props {
  children: React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    page: {}
  })
);

export default function Page({ children }: Props) {
  const classes = useStyles();

  return <div className={classes.page}>{children}</div>;
}
