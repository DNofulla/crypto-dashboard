import {
  Box,
  Button,
  Container,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuthState } from "../../utils/AuthContext";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [coins, setCoins] = useState([
    {
      id: "bitcoin",
      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
    {
      id: "bitcoin",

      market_cap_rank: "1",
      image:
        "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
      name: "Bitcoin",
      market_cap: "716551817428",
      current_price: "37745",
    },
  ]);

  const { wishlistId } = useParams();
  const { isAuth, user } = useAuthState();
  const history = useNavigate();

  const getData = async () => {
    Axios.get("http://localhost:8080/wishlists/list/id/" + wishlistId)
      .then((res) => {
        setWishlist(res.data.wishlist);
        setCoins(res.data.wishlist.items);
      })
      .catch((err) => {
        console.log(err);
        // history("/");
      });
  };

  const toggleStatus = async () => {
    Axios.post("http://localhost:8080/wishlists/toggleStatus", {
      wishlistId: wishlist.wishlistId,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const removeItem = async (coinId) => {
    Axios.post(
      "http://localhost:8080/wishlists/remove/" + wishlistId + "/" + coinId,
    )
      .then((response) => {
        console.log(response);
        history("/wishlists/" + wishlistId);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box as="section" w="100%">
        <Text color="white" marginBlock={3} align="center" fontSize={20}>
          {wishlist.name ? wishlist.name : "Wishlist Name"}
        </Text>
        <Container
          maxW="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          color="white"
        >
          <Box
            style={{
              height: "80vh",
              overflowY: "auto",
              overflowX: "auto",
              marginBottom: "0.5rem",
            }}
          >
            <Table
              variant="simple"
              minW="container.sm"
              maxW="container.xl"
              w="container.xl"
            >
              <Thead>
                <Tr>
                  <Th color="gray">Rank</Th>
                  <Th color="gray">Icon</Th>
                  <Th color="gray">Name</Th>
                  <Th color="gray">Market Cap</Th>
                  <Th color="gray">Current Price</Th>
                  <Th color="gray"></Th>
                </Tr>
              </Thead>
              <Tbody>
                {coins.length > 0
                  ? coins.map((data, index) => (
                      <Tr key={index}>
                        <Td>{data.market_cap_rank}</Td>
                        <Td>
                          {<Image src={data.image} width="30px" alt="Image" />}
                        </Td>
                        <Td>{data.name}</Td>
                        <Td>$ {data.market_cap}</Td>
                        <Td>$ {data.current_price}</Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            onClick={() => removeItem(data.id)}
                          >
                            Remove Item
                          </Button>
                        </Td>
                      </Tr>
                    ))
                  : null}
              </Tbody>
            </Table>
          </Box>
          {(wishlist.username && !user.username === wishlist.username) ||
          true ? (
            <Box
              w="container.xl"
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
              mt={2}
            >
              <Button colorScheme="red">Delete Wishlist</Button>
              <Button colorScheme="blue" onClick={toggleStatus}>
                Make {wishlist.status ? "Private" : "Public"}
              </Button>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
};

export default Wishlist;
