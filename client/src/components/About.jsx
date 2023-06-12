import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Canvas from "./Canvas";
import { Container, Row, Col } from 'react-bootstrap';
import "../css/About.css"

function About() {

    return (
        <div>

            <Canvas />
            <NavBar />
            <Container>
                <Row className="justify-content-center about-body">
                    <Col lg={8}>
                        <h2>
                            <span role="img" aria-label="rocket">
                                🚀
                            </span>{' '}
                            About the Project
                        </h2>
                        <p>
                            Hello! I'm {' '}
                            <a href="https://twitter.com/Misash__" target="_blank" rel="noopener noreferrer">
                                Aaron Misash
                            </a> . My inspiration for this project comes from a personal experience I had as a computer science student. I had the incredible opportunity to collaborate on a project that aimed to create technological solutions in an underprivileged school.
                        </p>
                        <p>
                            During that project, I worked alongside university students from different parts of the world, such as Germany, Indonesia, and Namibia. Together, we shared ideas, skills, and unique perspectives to address educational challenges and improve conditions in the school. It was a transformative moment for me as I understood the power of global collaboration and technology to change lives and make the world a better place.
                        </p>
                        <p>
                            Motivated by this experience, I embarked on a personal mission to seek out and promote similar projects that have a significant social impact. That's how MakerPunks was born—a space where organizations and programmers from around the world can connect and collaborate on projects that tackle the most pressing challenges in our society.
                        </p>
                        <p>
                            I firmly believe in the human potential and the transformative capacity of technology. That's why my dedication is focused on building an inclusive and equitable community within MakerPunks. By bringing together people with diverse perspectives and skills, we aim to drive innovation and find more comprehensive and relevant solutions.
                        </p>
                        {/* <p>
                            I invite you to join me and the MakerPunks community on this exciting adventure of global collaboration and social transformation. Together, we can make the world a better place through projects that truly make a difference. Join us and be part of the change!
                        </p> */}
                    </Col>
                </Row>
                <Row className="justify-content-center about-body">
                    <Col lg={8}>
                        <h2>
                            <span role="img" aria-label="handshake">
                                🤝
                            </span>{' '}
                            About the Meaning of MakerPunks
                        </h2>
                        <p>
                            The term "MakerPunks" encapsulates the spirit and motivations behind my project of connecting organizations and programmers to collaborate on purpose-driven projects that have a significant impact on humanity. Let me explain the meaning:
                        </p>
                        <p>
                            "Maker" refers to the maker culture, where creation and innovation are fostered to develop tangible solutions. As "makers," we aim to utilize our technical skills and knowledge to build purpose-driven projects that benefit humanity and create a positive impact.
                        </p>
                        <p>
                            "Punks" represents our defiant and revolutionary attitude towards established norms. Just like punks challenge social paradigms and fight for freedom and authenticity, "MakerPunks" strive to overcome barriers and limits in society, driving meaningful change through innovative and purpose-driven projects.
                        </p>
                        <p>
                            The term "MakerPunks" merges the passion for creation, innovation, and social impact. It represents our commitment to using technology and collaboration to drive purpose-driven projects that address challenges in areas such as health, education, sustainability, and other significant aspects for humanity.
                        </p>
                        <p>
                            In summary, "MakerPunks" symbolizes the fusion of the creative and defiant mindset of makers with the pursuit of purpose-driven projects that generate a positive impact for humanity. We strive to build a better future using technology and collaboration as essential tools.
                        </p>
                    </Col>
                </Row>


            </Container>

        </div>
    )
}



export default About