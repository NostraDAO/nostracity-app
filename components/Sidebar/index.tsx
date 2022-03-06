import React from "react";
import { Drawer } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../Logo";
import { makeStyles } from "@material-ui/core";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiPaper-root": {
        backgroundColor: "transparent",
      },
      "& .MuiDrawer-paperAnchorDockedLeft": {
        borderRight: '0px solid black',
      },
      "& .MuiDrawer-paperAnchorLeft":{
        left: "unset",
      }
    }
  }));

export default function Sidebar() {
    const classes = useStyles();

  return (
      <div className={classes.root}>
        
      <Drawer  variant="permanent" anchor="left">
        <Logo />
        <List>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="http://bit.ly/NostraCity"
              target="_blank"
            >
              <ListItemText primary="Documentation" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="#"
              target="_blank"
            >
              <ListItemText primary="Buy DAI" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              <ListItemText primary="Socials" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      </div>
  );
}
