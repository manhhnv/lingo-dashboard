import useStyles from "./useStyles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Add";
import AutoComplete from "@material-ui/lab/AutoComplete";
import TextField from "@material-ui/core/TextField";
import { useRef, useState, useEffect, useCallback } from "react";
import { searchMultipleWords } from "../../apis/Words/index";
import { useAdmin } from "../../AdminContext";
import { Redirect } from "react-router-dom";
import { SearchWord } from "../../types/Words";
import WordOption from "./WordOption";

export default function SearchingBox() {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [words, setWords] = useState<SearchWord[]>([]);

  const { admin } = useAdmin();

  const searchWords = useCallback(() => {
    if (admin?.token) {
      searchMultipleWords(admin.token, value).then((data) => {
        setWords(data);
      });
    }
  }, [value, admin?.token])

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (value) {
        searchWords()
      }
      else {
        setWords([]);
      }
    }, 1000);
  }, [searchWords, value,]);

  return (
    <>
      {!admin?.token ? (
        <Redirect to="/login" />
      ) : (
        <Paper component="form" className={classes.root}>
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
              />
            )}
            renderOption={(word) => <WordOption {...word}/>}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
          <Divider className={classes.divider} orientation="vertical" />
        </Paper>
      )}
    </>
  );
}