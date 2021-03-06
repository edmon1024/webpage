import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Link from './Link';
import LeftMenu from './LeftMenu';
import Hidden from '@material-ui/core/Hidden';
import { withRouter } from 'next/router'

import { formatMessage } from '../utils'
import { the_event } from '../data/settings.json'
import { menus } from '../data'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function MenuTop ({ router }) {
  const classes = useStyles();

  const [auth, setAuth] = React.useState(true);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDrawer = event => {
    setOpenDrawer(!openDrawer);
  };

  const closeDrawer = event => {
    setOpenDrawer(false);
  };
  
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
 
   setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Hidden mdUp>
            <IconButton 
              edge="start" 
              className={classes.menuButton} 
              onClick={handleDrawer} 
              color="inherit" 
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Typography variant="h6" className={classes.title}>
            {router.pathname !== '/' ? the_event.short_name : " "}
          </Typography>

          <Hidden only={['xs','sm']}>
            {menus.map((x, i) => 
              x.enable ? 
                <Button 
                  key={i} 
                  color="inherit" 
                  component={Link} 
                  naked 
                  href={x.url}
                >
                  {formatMessage(`menu.${x.name}`)}
                </Button>
              :null
            )}

            {/**<Button variant="contained">Signup</Button>**/}
          </Hidden>

          {/**auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )**/}
        </Toolbar>
      </AppBar>

      <LeftMenu onOpen={() => {}} open={openDrawer} onClose={closeDrawer} />
    </div>
  );
}

export default withRouter(MenuTop)
