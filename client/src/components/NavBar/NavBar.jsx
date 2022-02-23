import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";

import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";
import { useAuthState, useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { state, setState } = useAuthState();
  const { logout } = useAuth();
  const history = useNavigate();

  return (
    <Box
      as="nav"
      w="100%"
      zIndex={1}
      borderBottom="1px solid #ccc"
      minH="6vh"
      maxHeight="15vh"
      color="white"
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={3}>
          <Link to="/">
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              Crypto Dashboard
            </Heading>
          </Link>
        </Flex>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 2 }}
        >
          <a href="/wishlists/global" rel="noreferrer">
            Global Wishlists
          </a>
          {state.isAuth ? (
            <a pt={2} pl={2} href="/wishlists/myWishlists" rel="noreferrer">
              My Wishlists
            </a>
          ) : null}

          <a
            target="_blank"
            href="https://github.com/DNofulla/crypto-dashboard"
            rel="noreferrer"
            style={{ gap: 4, display: "inline-flex", alignItems: "center" }}
            pt={2}
            pl={2}
          >
            <IoLogoGithub />
            Source
          </a>
        </Stack>

        <Box flex={1} align="right">
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: "none", md: "contents" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            {!state.isAuth ? (
              <>
                <Link pt={2} pl={2} to="/login">
                  <Button colorScheme="blue">Login</Button>
                </Link>
                <Link style={{ gap: 4 }} to="/signup" pt={2} pl={2}>
                  <Button colorScheme="purple">Sign Up</Button>
                </Link>{" "}
              </>
            ) : (
              <>
                <Link to="/">
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      e.preventDefault();
                      logout(history, setState);
                    }}
                    mt={2}
                  >
                    Log out
                  </Button>
                </Link>
              </>
            )}
          </Stack>
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu" colorScheme="red">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                color="whiteAlpha.900"
                _hover={{ backgroundColor: "#121212" }}
                _focus={{ backgroundColor: "#121212" }}
                _active={{ backgroundColor: "#121212" }}
              />
              <MenuList
                style={{
                  background: "#121212",
                  border: "1px solid #fff",
                }}
              >
                <a href="/wishlists/global" rel="noreferrer">
                  <MenuItem
                    _hover={{ background: "#323232" }}
                    _focus={{ backgroundColor: "#323232" }}
                    _active={{ backgroundColor: "#323232" }}
                    color="white"
                  >
                    Global Wishlists
                  </MenuItem>
                </a>
                {state.isAuth ? (
                  <a href="/wishlists/myWishlists" rel="noreferrer">
                    <MenuItem
                      _hover={{ background: "#323232" }}
                      _focus={{ backgroundColor: "#323232" }}
                      _active={{ backgroundColor: "#323232" }}
                      color="white"
                    >
                      My Wishlists
                    </MenuItem>
                  </a>
                ) : null}
                <a
                  href="https://github.com/DNofulla/crypto-dashboard"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MenuItem
                    _hover={{ background: "#323232" }}
                    _focus={{ backgroundColor: "#323232" }}
                    _active={{ backgroundColor: "#323232" }}
                    color="white"
                  >
                    <IoLogoGithub />
                    Source
                  </MenuItem>
                </a>

                {!state.isAuth ? (
                  <>
                    <a href="/login" rel="noreferrer">
                      <MenuItem
                        _hover={{ background: "#323232" }}
                        _focus={{ backgroundColor: "#323232" }}
                        _active={{ backgroundColor: "#323232" }}
                        color="white"
                      >
                        Login
                      </MenuItem>
                    </a>
                    <a href="/signup" rel="noreferrer">
                      <MenuItem
                        _hover={{ background: "#323232" }}
                        _focus={{ backgroundColor: "#323232" }}
                        _active={{ backgroundColor: "#323232" }}
                        color="white"
                      >
                        Sign Up
                      </MenuItem>
                    </a>
                  </>
                ) : (
                  <>
                    <a href="/" rel="noreferrer">
                      <MenuItem
                        _hover={{ background: "#323232" }}
                        _focus={{ backgroundColor: "#323232" }}
                        _active={{ backgroundColor: "#323232" }}
                        color="white"
                        onClick={(e) => {
                          e.preventDefault();
                          logout(history, setState);
                        }}
                      >
                        Log out
                      </MenuItem>
                    </a>
                  </>
                )}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;
