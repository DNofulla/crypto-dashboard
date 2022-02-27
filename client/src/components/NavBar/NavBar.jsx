import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";
import { useAuthState, useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import Axios from "axios";

const NavBar = () => {
  const { state, setState } = useAuthState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [newListName, setNewListName] = useState("");

  const { logout } = useAuth();
  const history = useNavigate();

  const createNewWishlist = async () => {
    Axios.post("http://localhost:8080/wishlists/new", {
      username: state.user.username,
      name: newListName,
    })
      .then((response) => {
        if (!response.data.error) {
          toast({
            title: "Success",
            description: "New wishlist has been created!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          history("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <a onClick={() => history("/")}>
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              Crypto Dashboard
            </Heading>
          </a>
        </Flex>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <a onClick={() => history("/wishlists/global")}>Global Wishlists</a>
          {state.isAuth ? (
            <>
              <a
                pt={2}
                pl={2}
                onClick={() => history("/wishlists/myWishlists")}
              >
                My Wishlists
              </a>
              <Button colorScheme={"green"} onClick={onOpen}>
                &#65291; New Wishlist
              </Button>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create new wishlist</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel htmlFor="wishlistName">
                        Wishlist name
                      </FormLabel>
                      <Input
                        id="wishlistName"
                        type="text"
                        placeholder="Enter wishlist name"
                        value={newListName}
                        defaultValue={newListName}
                        onChange={(e) => {
                          setNewListName(e.target.value);
                        }}
                      />
                      <FormHelperText>
                        The wishlist name doesn't have to be unique.
                      </FormHelperText>
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button colorScheme="blue" onClick={createNewWishlist}>
                      Create wishlist
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
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
                <a pt={2} pl={2} onClick={() => history("/login")}>
                  <Button colorScheme="blue">Login</Button>
                </a>
                <a
                  style={{ gap: 4 }}
                  onClick={() => history("/signup")}
                  pt={2}
                  pl={2}
                >
                  <Button colorScheme="purple">Sign Up</Button>
                </a>{" "}
              </>
            ) : (
              <>
                <a onClick={() => history("/")}>
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
                </a>
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
                <a onClick={() => history("/wishlists/global")}>
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
                  <>
                    <div onClick={onOpen}>
                      <MenuItem
                        _hover={{ background: "#323232" }}
                        _focus={{ backgroundColor: "#323232" }}
                        _active={{ backgroundColor: "#323232" }}
                        color="white"
                      >
                        &#65291; New Wishlist
                      </MenuItem>
                    </div>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Create new wishlist</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl>
                            <FormLabel htmlFor="wishlistName">
                              Wishlist name
                            </FormLabel>
                            <Input
                              id="wishlistName"
                              type="text"
                              placeholder="Enter wishlist name"
                              value={newListName}
                              defaultValue={newListName}
                              onChange={(e) => {
                                setNewListName(e.target.value);
                              }}
                            />
                            <FormHelperText>
                              The wishlist name doesn't have to be unique.
                            </FormHelperText>
                          </FormControl>
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button
                            colorScheme="blue"
                            onClick={createNewWishlist}
                          >
                            Create wishlist
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <a onClick={() => history("/wishlists/myWishlists")}>
                      <MenuItem
                        _hover={{ background: "#323232" }}
                        _focus={{ backgroundColor: "#323232" }}
                        _active={{ backgroundColor: "#323232" }}
                        color="white"
                      >
                        My Wishlists
                      </MenuItem>
                    </a>
                  </>
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
                    <a rel="noreferrer" onClick={() => history("/login")}>
                      <MenuItem
                        _hover={{ background: "#323232" }}
                        _focus={{ backgroundColor: "#323232" }}
                        _active={{ backgroundColor: "#323232" }}
                        color="white"
                      >
                        Login
                      </MenuItem>
                    </a>
                    <a rel="noreferrer" onClick={() => history("/signup")}>
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
                    <a onClick={() => history("/")}>
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
