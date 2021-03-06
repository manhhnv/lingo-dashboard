import useStyles from "./useStyles";
import Paper from "@material-ui/core/Paper";
import AutoComplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { useRef, useState, useEffect, useCallback } from "react";
import { searchMultipleWords } from "../../apis/Words";
import { useAdmin } from "../../AdminContext";
import { Redirect } from "react-router-dom";
import { SearchWord } from "../../types/Words";
import WordOption from "./WordOption";
import { Button, Grid } from "@material-ui/core";

type SearchingBoxProps = {
  callback?: any;
  isOnlineSearch: boolean;
};

export default function SearchingBox(props: SearchingBoxProps) {
  const { callback, isOnlineSearch } = props;
  const classes = useStyles();
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [words, setWords] = useState<SearchWord[]>([]);

  const { admin } = useAdmin();

  const searchWords = useCallback(() => {
    if (admin?.token && isOnlineSearch) {
      searchMultipleWords(admin.token, value).then((data) => {
        setWords(data);
      });
    }
  }, [value, admin?.token, isOnlineSearch]);

  const contentOnChange = (text: string) => {
    setContent(text);
  }

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (value) {
        searchWords();
      } else {
        setWords([]);
      }
    }, 1000);
  }, [searchWords, value]);

  return (
    <>
      {!admin?.token ? (
        <Redirect to="/login" />
      ) : (
        <Paper component="form" className={classes.root}>
          {isOnlineSearch ? (
            <AutoComplete
              className={classes.input}
              placeholder="Thêm từ có sẵn"
              fullWidth
              options={words}
              getOptionLabel={(option) => option.content}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Tìm kiếm"
                  variant="outlined"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={() => setValue("")}
                />
              )}
              renderOption={(word) => <WordOption {...word} />}
              onChange={(_, value) => {
                if (callback) {
                  callback(value);
                }
              }}
            />
          ) : (
            <Grid container={true}>
              <Grid item={true} xs={9}>
                <TextField
                  fullWidth
                  placeholder="Thêm từ"
                  value={content}
                  onChange={(e) => contentOnChange(e.target.value)}
                  required
                />
              </Grid>
              <Grid item={true} xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    callback(content);
                    setContent("");
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          )}
        </Paper>
      )}
    </>
  );
}
