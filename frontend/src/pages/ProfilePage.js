import React from "react";
import { Row, Col } from "react-bootstrap";
import MyOrdersList from "../components/Profile/MyOrdersList";
import ProfileEditForm from "../components/Profile/ProfileEditForm";

const ProfilePage = () => {
	return (
		<Row>
			<Col md={5}>
				<ProfileEditForm />
			</Col>
			<Col md={7}>
				<MyOrdersList />
			</Col>
		</Row>
	);
};

export default ProfilePage;
