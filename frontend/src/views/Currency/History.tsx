import React from "react";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { useApi, HistoryRecord } from "../../providers/Api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 300
    },
    center: {
      textAlign: "center"
    }
  })
);

export default function Currency() {
  const classes = useStyles();

  const { history, convertedCurrency, reloadHistory } = useApi();

  React.useEffect(() => reloadHistory({ force: true }), [convertedCurrency]);

  if (history.length === 0)
    return <Typography className={classes.center}>No history</Typography>;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table aria-label="currency conversion history">
          <TableHead>
            <TableRow>
              <TableCell className={classes.center}>Date</TableCell>
              <TableCell className={classes.center}>From</TableCell>
              <TableCell className={classes.center}>To</TableCell>
              <TableCell className={classes.center}>Value</TableCell>
              <TableCell className={classes.center}>Converted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((historyRecord: HistoryRecord) => (
              <TableRow key={historyRecord.createdAt}>
                <TableCell className={classes.center}>
                  {new Date(historyRecord.createdAt).toLocaleString()}
                </TableCell>
                <TableCell className={classes.center}>
                  {historyRecord.currencyFrom}
                </TableCell>
                <TableCell className={classes.center}>
                  {historyRecord.currencyTo}
                </TableCell>
                <TableCell className={classes.center}>
                  {historyRecord.valueFrom}
                </TableCell>
                <TableCell className={classes.center}>
                  {historyRecord.valueTo}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
