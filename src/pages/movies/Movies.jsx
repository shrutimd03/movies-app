import { Container, Flex, Grid, Heading, Select, Skeleton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { fetchMovies } from "../../services/api";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [sortBy, setSortBy] = useState("popularity.desc");

  useEffect(() => {
    setIsLoading(true);
    fetchMovies(activePage, sortBy)
    .then((res) => {
      console.log(res, 'res')
      setMovies(res?.results);
      setActivePage(res?.page);
      setTotalPage(res?.total_pages);
    })
    .catch((err) => console.log(err, 'err'))
    .finally(() => setIsLoading(false));
  }, [activePage, sortBy]);

  return (
    <Container maxW={"container.xl"}>
      <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
        <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
          Discover Movies
        </Heading>

        <Select w={"130px"} onChange={(e) => {
          setActivePage(1);
          setSortBy(e.target.value);
        }}>
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc&vote_count.gte=1000 ">Top Rated</option>
        </Select>
      </Flex>
      <Grid templateColumns={{
        base: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)"
      }} gap={"4"}>
        {movies && movies?.map((item, i) => (
          isLoading ? (
            <Skeleton height={300} key={i} />
          ) : (
            <CardComponent 
              key={item?.id} 
              item={item} 
              type={"movie"} 
            />
          )
        ))}
      </Grid>
      {/* pagination */}
      <Flex justify={"right"}>
        <PaginationComponent activePage={activePage} totalPages={totalPages} setActivePage={setActivePage}></PaginationComponent>
      </Flex>
    </Container>
  )
}

export default Movies