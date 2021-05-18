import React from "react";
import {
  CircularProgress,
  Box,
  TextField,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Button
} from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import { useApi } from "../providers/Api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { minWidth: 300 },
    title: {
      textAlign: "center",
      marginBottom: 20
    },
    content: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      flexDirection: "column"
    },
    inputsRowBox: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around"
    },
    numberInputBox: {
      width: "50%",
      padding: 10
    },
    selectBox: {
      width: "50%",
      padding: 10
    },
    formControl: {
      width: "100%"
    },
    selectFormControl: {
      width: "100%"
    },
    buttonBox: {
      width: "100%",
      marginTop: 20,
      display: "flex",
      justifyContent: "space-around"
    },
    progressBox: {
      width: "100%",
      height: 50,
      marginTop: 20,
      display: "flex",
      justifyContent: "space-around"
    }
  })
);

export default function Currency() {
  const classes = useStyles();

  const {
    symbols,
    convertedCurrency,
    loading,
    convertCurrency,
    reloadSymbols
  } = useApi();

  const [currencyFrom, setCurrencyFrom] = React.useState("");
  const [valueFrom, setValueFrom] = React.useState(0);

  const [currencyTo, setCurrencyTo] = React.useState("");
  const [valueTo, setValueTo] = React.useState(0);

  const disabled = symbols.length === 0;

  React.useEffect(() => {
    setCurrencyFrom(convertedCurrency.currencyFrom || "");
    setCurrencyTo(convertedCurrency.currencyTo || "");
    setValueFrom(convertedCurrency.valueFrom || 0);
    setValueTo(convertedCurrency.valueTo || 0);
  }, [convertedCurrency]);

  React.useEffect(() => reloadSymbols(), []);

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} variant="h5" component="h2">
        Currency Converter
      </Typography>

      <Box className={classes.content}>
        <Box className={classes.inputsRowBox}>
          <Box className={classes.numberInputBox}>
            <TextField
              id="from-number"
              type="number"
              variant="outlined"
              disabled={disabled}
              value={valueFrom}
              onChange={(e) => setValueFrom(Number(e.target.value))}
            />
          </Box>

          <Box className={classes.selectBox}>
            <FormControl
              className={classes.formControl}
              disabled={disabled}
              variant="outlined"
            >
              <InputLabel id="from-currency-label">from</InputLabel>
              <Select
                id="from-currency"
                labelId="from-currency-label"
                label="from"
                value={currencyFrom}
                onChange={(e) => setCurrencyFrom(e.target.value as string)}
              >
                {symbols.map((symbol, index) => (
                  <MenuItem key={"from" + symbol + index} value={symbol}>
                    {symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={classes.inputsRowBox}>
          <Box className={classes.numberInputBox}>
            <TextField
              id="to-number"
              type="number"
              variant="outlined"
              disabled={disabled}
              value={valueTo}
            />
          </Box>

          <Box className={classes.selectBox}>
            <FormControl
              className={classes.formControl}
              disabled={disabled}
              variant="outlined"
            >
              <InputLabel id="to-currency-label">to</InputLabel>
              <Select
                id="to-currency"
                labelId="to-currency-label"
                label="to"
                value={currencyTo}
                onChange={(e) => setCurrencyTo(e.target.value as string)}
              >
                {symbols.map((symbol, index) => (
                  <MenuItem key={"to" + symbol + index} value={symbol}>
                    {symbol}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={classes.buttonBox}>
          {symbols.length > 0 ? (
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                convertCurrency({ currencyFrom, currencyTo, valueFrom })
              }
              disabled={loading}
            >
              convert
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => reloadSymbols()}
              disabled={loading}
            >
              Reload
            </Button>
          )}
        </Box>

        <Box className={classes.progressBox}>
          {loading ? (
            <CircularProgress />
          ) : (
            <>
              {symbols.length === 0 && (
                <Typography color="error">No data. Reload.</Typography>
              )}
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
