import React, { useState } from "react";
import "./nav.css";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
} from "reactstrap";

const AppNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href="/">PathVisualizer</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem id={"Tooltip-" + 6}>
                            <NavLink href="https://github.com/Sethuram52001/Path-Finding-Visualizer">
                                GitHub
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle id={"Tooltip-" + 5} nav caret>
                                Algorithms
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Button
                                        onClick={() => {
                                            props.handleDijkstra();
                                            props.handleVisualization();
                                        }}
                                    >
                                        Dijkstra
                                    </Button>
                                </DropdownItem>
                                <DropdownItem>
                                    <Button
                                        onClick={() => {
                                            props.handleBFS();
                                            props.handleVisualization();
                                        }}
                                    >
                                        BFS
                                    </Button>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default AppNavbar;
