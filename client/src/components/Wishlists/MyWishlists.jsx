import React, { useState, useEffect } from "react";
import { Box, Text, Badge, Divider, Container } from "@chakra-ui/react";
import Axios from "axios";
import { useAuthState } from "../../utils/AuthContext";
import { useNavigate } from "react-router";

const MyWishlists = () => {
  const { state, setState } = useAuthState();

  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useNavigate();

  const toggleStatus = async (wishlistId) => {
    Axios.post("http://localhost:8080/wishlists/toggleStatus", {
      wishlistId,
    })
      .then((response) => {
        console.log(response);
        getData();
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const getData = async () => {
    setTimeout(() => {
      Axios.get(
        "http://localhost:8080/wishlists/all/user/" + state.user.username,
      )
        .then((res) => {
          console.log(res.data.wishlists);
          setLists(res.data.wishlists);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 2000);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box as="section" w="100%">
        <Text color="white" marginBlock={5} align="center" fontSize={20}>
          My Wishlists
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
                    key={index}
                    onClick={() => {
                      history("/wishlists/" + data.wishlistId);
                    }}
                  >
                    <Text fontSize={25}>{data.name}</Text>
                    <Text fontSize={25}>Coins: {data.items.length}</Text>
                    <Text fontSize={25}>Created by {data.username}</Text>
                    <Text fontSize={25}>
                      <Badge onClick={() => toggleStatus(data.wishlistId)}>
                        {data.status ? "Public" : "Private"}
                      </Badge>
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

export default MyWishlists;
