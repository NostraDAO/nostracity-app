import React from "react";
import { Drawer } from "@material-ui/core";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Logo from "../Logo";
import { makeStyles } from "@material-ui/core";
import NoSsr from '@material-ui/core/NoSsr';




const useStyles = makeStyles(theme => ({
    root: {
      "& .MuiTypography-body1": {
        fontFamily: "DailyNews",
        fontSize: "2.5em",
      },
      "& .MuiPaper-root": {
        backgroundColor: "transparent",
      },
      "& .MuiDrawer-paperAnchorDockedLeft": {
        borderRight: '0px solid black',
      },
      "& .MuiDrawer-paperAnchorLeft":{
        left: "unset",
        marginLeft: "3%"
      }
    }
  }));

export default function Sidebar() {
  
    const classes = useStyles();

  return (
    <NoSsr>
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
              <ListItemText primary="Docs" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="https://traderjoexyz.com/trade?inputCurrency=AVAX&outputCurrency=0xd586e7f844cea2f87f50152665bcbc2c279d8d70"
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
    </NoSsr>
  );
}
