import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

interface SpinnerProps {
    color?: string | ""
}

export const Spinner = (props : SpinnerProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <CircularProgress/>
        </div>
    );
};


