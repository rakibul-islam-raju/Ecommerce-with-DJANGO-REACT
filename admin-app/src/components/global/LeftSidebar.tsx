import React, { FC, ReactElement } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import List from "@mui/material/List";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import { drawerWidth } from "../../config/dashboardConfigs";
import { Link, useNavigate } from "react-router-dom";

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface MenuType {
	id: number;
	text: string;
	path: string;
	icon: ReactElement;
}

const ShopMenus: MenuType[] = [
	{ id: 1, text: "Products", path: "/products", icon: <MailIcon /> },
	{ id: 1, text: "Categories", path: "/Categories", icon: <MailIcon /> },
	{ id: 1, text: "Sub Categories", path: "/Categories", icon: <MailIcon /> },
];

interface ComponentProps {
	open: boolean;
	handleDrawerClose: () => void;
}

const LeftSidebar: FC<ComponentProps> = ({
	open,
	handleDrawerClose,
}): ReactElement => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<Drawer variant="permanent" open={open}>
			<DrawerHeader>
				<Typography component={Link} to="/" variant="h6">
					Dashboard
				</Typography>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />

			<List>
				{ShopMenus.map((menu, index) => (
					<ListItem key={menu.id} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
							onClick={() => navigate(`${menu.path}`)}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText
								primary={menu.text}
								sx={{ opacity: open ? 1 : 0 }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<Divider />
			<List>
				{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
					<ListItem key={text} disablePadding sx={{ display: "block" }}>
						<ListItemButton
							sx={{
								minHeight: 48,
								justifyContent: open ? "initial" : "center",
								px: 2.5,
							}}
						>
							<ListItemIcon
								sx={{
									minWidth: 0,
									mr: open ? 3 : "auto",
									justifyContent: "center",
								}}
							>
								{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default LeftSidebar;
