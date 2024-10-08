import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import { GridColumnMenu } from '@mui/x-data-grid';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

function CustomUserItem(props) {
  const { myCustomHandler, myCustomValue } = props;
  return (
    <MenuItem onClick={myCustomHandler}>
      <ListItemIcon>
        <SettingsApplicationsIcon
          fontSize="small"
          sx={{ border: '1px solid red' }}
        />
      </ListItemIcon>
      <ListItemText>{myCustomValue}</ListItemText>
    </MenuItem>
  );
}
const DataGridCustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenu
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
      slots={{
        // Add new item
        columnMenuUserItem: CustomUserItem,
      }}
    ></GridColumnMenu>
  );
};

export default DataGridCustomColumnMenu;
