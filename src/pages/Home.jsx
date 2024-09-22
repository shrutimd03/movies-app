import { Container, Heading, Grid, Box, Flex, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchTrending } from "../services/api";
import CardComponent from "../components/CardComponent";

const Home = () => {
  const [data, setData] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchTrending(timeWindow).then((res) => {
      setData(res);
    })
    .catch((err) => {
      console.log(err, "err");
    }).finally(() => {
      setLoading(false);
    });
  }, [timeWindow]);

  console.log(data, "data");

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Trending
        </Heading>
        <Flex alignItems={"center"} gap={"2"} border={"1px solid gray"} borderRadius={"20px"}>
          <Box 
            as="button" 
            px="3" 
            py="0.5" 
            borderRadius={"20px"} 
            bg={`${timeWindow === 'day' ? "gray.800" : ""}`} 
            onClick = {() => setTimeWindow("day")}>
              Today
          </Box>
          <Box 
            as="button" 
            px="3" 
            py="0.5" 
            borderRadius={"20px"} 
            bg={`${timeWindow === 'week' ? "gray.800" : ""}`} 
            onClick = {() => setTimeWindow("week")}>
              This Week
          </Box>
        </Flex>
      </Flex>
 
      <Grid templateColumns={{
        base: "repeat(3, 1fr)",
        sm: "repeat(3, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)"
      }} gap={"4"}>
        {data && data?.map((item, i) => (
          loading ? (
            <Skeleton height={300} key={i} />
          ) : (
            <CardComponent 
              key={item?.id} 
              item={item} 
              type={item?.media_type} 
            />
          )
        ))}
      </Grid>
    </Container>
  );
};

export default Home;