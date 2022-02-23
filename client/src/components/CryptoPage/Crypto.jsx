import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Image,
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
  Select,
  Spinner,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuthState } from "../../utils/AuthContext";

const Crypto = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { name } = useParams();

  const [coin, setCoin] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { isAuth, user } = useAuthState();
  const [listName, setListName] = useState();
  const [myLists, setMyLists] = useState([]);

  const getData = async (coin_name) => {
    setIsLoading(true);
    setTimeout(() => {
      Axios.get("http://localhost:8080/crypto/id/" + coin_name.toLowerCase())
        .then((res) => {
          setCoin(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };

  const getMyLists = async () => {
    if (isAuth) {
      Axios.get(
        "http://localhost:8080/wishlists/user/lists/all/" + user.username,
        { withCredentials: true },
      );
    }
  };

  useEffect(() => {
    getData(name);
    getMyLists();
  }, []);

  return (
    <>
      <Box as="section" w="100%">
        <Container
          maxW="full"
          display="flex"
          justifyContent="center"
          color="white"
        >
          <Box
            style={{
              height: "80vh",
              marginBottom: "0.5rem",
              marginTop: "3rem",
            }}
          >
            {isLoading === false ? (
              <>
                <Box
                  w="container.lg"
                  border="3px solid #0798a6"
                  h="40rem"
                  borderRadius={10}
                  display="flex"
                >
                  <Box
                    width="35%"
                    height="100%"
                    borderRight="3px solid #0798a6"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Image
                      src={coin.image.large}
                      width="225px"
                      height="225px"
                      alt="XD"
                    />
                    <Text color="#0798a6" mt={3} fontSize={20}>
                      {coin.name} - {coin.symbol.toUpperCase()}
                    </Text>
                    <Text color="#0798a6" mt={5} fontSize={20}>
                      Current Price: ${coin.current_price}
                    </Text>

                    <Text color="#0798a6" mt={5} fontSize={20}>
                      Market Cap: ${coin.market_cap}
                    </Text>
                    <Text color="#0798a6" mt={5} fontSize={20}>
                      Market Cap Rank: {coin.market_cap_rank}
                    </Text>
                  </Box>

                  <Box width="65%" height="100%">
                    <Grid
                      width="100%"
                      height="100%"
                      templateColumns="repeat(3, 1fr)"
                      gap={2}
                    >
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">All Time High</Text>
                        <Text>$ {coin.all_time_high}</Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <StatGroup>
                          <Stat>
                            <Text color="#0798a6">All Time High Change</Text>
                            <StatNumber>
                              <Text fontSize={16}>
                                <StatArrow
                                  type={
                                    Number(
                                      coin.all_time_high_change_percent.toString(),
                                    ) > 0
                                      ? "increase"
                                      : "decrease"
                                  }
                                />
                                {coin.all_time_high_change_percent} %
                              </Text>
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">All Time High Date</Text>
                        <Text>
                          {new Date(
                            Date.parse(coin.all_time_high_date),
                          ).toLocaleString()}
                        </Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">All Time Low</Text>
                        <Text>$ {coin.all_time_low}</Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <StatGroup>
                          <Stat>
                            <Text color="#0798a6">All Time Low Change</Text>
                            <StatNumber>
                              <Text fontSize={16}>
                                <StatArrow
                                  type={
                                    Number(
                                      coin.all_time_low_change_percent.toString(),
                                    ) > 0
                                      ? "increase"
                                      : "decrease"
                                  }
                                />
                                {coin.all_time_low_change_percent} %
                              </Text>
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">All Time Low Date</Text>
                        <Text>
                          {new Date(
                            Date.parse(coin.all_time_low_date),
                          ).toLocaleString()}
                        </Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">24-Hour High</Text>
                        <Text>$ {coin.high_24h}</Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">24-Hour Low</Text>
                        <Text>$ {coin.low_24h}</Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <StatGroup>
                          <Stat>
                            <Text color="#0798a6">24-Hour Price Change</Text>
                            <StatNumber>
                              <Text fontSize={16}>
                                <StatArrow
                                  type={
                                    Number(coin.price_change_24h.toString()) > 0
                                      ? "increase"
                                      : "decrease"
                                  }
                                />
                                {Number(coin.price_change_24h) < 0
                                  ? "-$ " + -1 * Number(coin.price_change_24h)
                                  : "$ " + coin.price_change_24h}
                              </Text>
                            </StatNumber>
                          </Stat>
                        </StatGroup>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">Total Volume</Text>
                        <Text>{coin.total_volume}</Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">Total Supply</Text>
                        <Text>{coin.total_supply}</Text>
                      </GridItem>
                      <GridItem
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Text color="#0798a6">Fully Diluted Valuation</Text>
                        <Text>
                          {coin.fully_diluted_valuation
                            ? "$ " + coin.fully_diluted_valuation
                            : "infinite"}
                        </Text>
                      </GridItem>
                    </Grid>
                  </Box>
                </Box>
                {!isAuth ? (
                  <Box
                    width="container.lg"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    mt={5}
                  >
                    <Button colorScheme="blue" onClick={onOpen}>
                      Add to wishlist
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay colorScheme="blue" />
                      <ModalContent>
                        <ModalHeader>Add {coin.name} to wishlist?</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Menu colorScheme="blue">
                            <MenuButton
                              as={Button}
                              rightIcon={<ChevronDownIcon />}
                            >
                              {listName ? listName : "Select a List"}
                            </MenuButton>
                            <MenuList>
                              {myLists.length > 0
                                ? myLists.map((data, index) => (
                                    <MenuItem
                                      key={index}
                                      onClick={() => {
                                        setListName(data.name);
                                      }}
                                    >
                                      {data.name}
                                    </MenuItem>
                                  ))
                                : null}
                            </MenuList>
                          </Menu>
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="red" mr={3} onClick={onClose}>
                            Close
                          </Button>
                          <Button colorScheme="blue">Add to list</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Box>
                ) : null}
              </>
            ) : (
              <div
                style={{
                  marginTop: "1rem",
                }}
              >
                <Spinner color="red.500" size="xl" />
              </div>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Crypto;
