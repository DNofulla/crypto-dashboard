import {
  Box,
  Container,
  Image,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";

const Welcome = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    setTimeout(() => {
      Axios.get("http://localhost:8080/crypto/list/top250")
        .then((res) => {
          setCoins(res.data);
          setIsLoading(false);
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
          Cryptocurrency Rankings
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
            {isLoading === false ? (
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
                  </Tr>
                </Thead>
                <Tbody>
                  {coins.length !== 0
                    ? coins.map((data, index) => (
                        <Tr key={index}>
                          <Td>{data.market_cap_rank}</Td>
                          <Td>
                            {
                              <Image
                                src={data.image}
                                width="30px"
                                alt="Image"
                              />
                            }
                          </Td>
                          <Td>{data.name}</Td>
                          <Td>$ {data.market_cap}</Td>
                          <Td>$ {data.current_price}</Td>
                        </Tr>
                      ))
                    : null}
                </Tbody>
              </Table>
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

export default Welcome;
