import React from "react";
import {Box, Container, Row, Column, FooterLink, Heading,
} from "./FooterStyles";
import { NavLink } from "react-router-dom";

const Footer = () => {
return (
	<Box>
	<h1 style={{ color: "MediumAquaMarine",
				textAlign: "center",
				marginTop: "-50px" }}>
		Food distribution
	</h1>
	<Container>
		<Row>
		<Column>
			<FooterLink href="/about">About</FooterLink>
		</Column>
		<Column>
			<FooterLink	href="/contactUs">Contact Us</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
