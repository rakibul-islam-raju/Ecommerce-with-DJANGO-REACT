import { FC, ReactElement, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LeftSidebar, { DrawerHeader } from "./LeftSidebar";
import { Outlet } from "react-router-dom";
import { drawerWidth } from "../../config/dashboardConfigs";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

interface ComponentProps {}

const Dashboard: FC<ComponentProps> = (): ReactElement => {
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Mini variant drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<>
				<LeftSidebar open={open} handleDrawerClose={handleDrawerClose} />
			</>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<DrawerHeader />
				<>
					<Outlet />
				</>
			</Box>
		</Box>
	);
};

export default Dashboard;
