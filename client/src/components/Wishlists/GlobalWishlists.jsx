import { Badge, Box, Container, Text } from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const GlobalWishlists = () => {
  const [lists, setLists] = useState([
    {
      wishlistId: "add6f065-c92e-427a-8fa9-082d13196bd0",
      username: "dnofulla",
      name: "Dan's Wishlist",
      items: [],
      status: true,
    },
    {
      wishlistId: "add6f065-c92e-427a-8fa9-082d13196bd0",
      username: "dnofulla",
      name: "Dan's Wishlist",
      items: [],
      status: true,
    },
    {
      wishlistId: "add6f065-c92e-427a-8fa9-082d13196bd0",
      username: "dnofulla",
      name: "Dan's Wishlist",
      items: [],
      status: true,
    },
    {
      wishlistId: "add6f065-c92e-427a-8fa9-082d13196bd0",
      username: "dnofulla",
      name: "Dan's Wishlist",
      items: [],
      status: true,
    },
    {
      wishlistId: "add6f065-c92e-427a-8fa9-082d13196bd0",
      username: "dnofulla",
      name: "Dan's Wishlist",
      items: [],
      status: true,
    },
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

  const getData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      Axios.get("http://localhost:8080/wishlists/public/global")
        .then((res) => {
          setLists(res.data.globalWishlists);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };

  useEffect(() => {
    // getData();
  }, []);

  return (
    <>
      <Box as="section" w="100%">
        <Text color="white" marginBlock={5} align="center" fontSize={20}>
          Global Wishlists
        </Text>
        <Container
          maxW="full"
          display="flex"
          justifyContent="center"
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
            {lists.length > 0
              ? lists.map((data, index) => (
                  <Box
                    w="container.lg"
                    bg="#323232"
                    border="1px solid #13314f"
                    p={3}
                    borderRadius={5}
                    display="flex"
                    justifyContent="space-evenly"
                    _hover={{ cursor: "pointer", backgroundColor: "#212121" }}
                    mt={7}
                    onClick={() => {
                      history("/wishlists/" + data.wishlistId);
                    }}
                  >
                    <Text fontSize={25}>{data.name}</Text>
                    <Text fontSize={25}>Coins: {data.items.length}</Text>
                    <Text fontSize={25}>Created by {data.username}</Text>
                    <Text fontSize={25}>
                      <Badge>{data.status ? "Public" : "Private"}</Badge>
                    </Text>
                  </Box>
                ))
              : "No wishlists available..."}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default GlobalWishlists;
