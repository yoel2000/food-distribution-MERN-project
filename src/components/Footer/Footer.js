import React from "react";
import {Box, Container, Row, Column, FooterLink, Heading,
} from "./FooterStyles";

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
			<Heading>About us</Heading>
		</Column>
		<Column>
			<Heading>Contact Us</Heading>
		</Column>
		</Row>
	</Container>
	</Box>
);
};
export default Footer;
