import React from "react";
import Footer from "../../components/Footer/Footer";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "../../components/Footer/FooterStyles"
import "./AboutStyle.css"

function About() {
    return(
    <div>
    <div className="col-md-12 text-center">
    <h1 className="main-heading">Our company</h1>
    <div className="underline mx-auto"></div>
    </div>

    <h3>
    Volunteer bodies support the elderly and people with reduced mobility,
    and provide them with food and medicine in times of distress. <br/> <br/>
    Our goal is to make an organized distribution on a daily basis.
    </h3> <br/>
    <h5>Don't hesitate to join us!</h5>
    <br/>
    <br/>
    <br/>
    <br/>
	<Container>
		<Row>
		<Column>
			<Heading>Quick Links</Heading>
			<FooterLink href="/">Home</FooterLink>
			<FooterLink href="/contactUs">Contact us</FooterLink>
			<FooterLink href="/about">About</FooterLink>
		</Column>
		<Column>
			<Heading>Contact Info</Heading>
			<FooterLink href="#">Yoel</FooterLink>
			<FooterLink href="#">0581234567</FooterLink>
			<FooterLink href="#">Jerusalem</FooterLink>
			<FooterLink href="#">Israel</FooterLink>
		</Column>
		<Column>
			<Heading>Social Media</Heading>
			<FooterLink href="#">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="#">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>


  </div>);
}

export default About