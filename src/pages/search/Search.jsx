import { useEffect, useState } from "react"
import { Container, Flex, Grid, Heading, Input, Skeleton, Spinner, StepIndicatorContent } from "@chakra-ui/react"
import { searchData } from "../../services/api";
import { use } from "framer-motion/client";
import CardComponent from "../../components/CardComponent";
import PaginationComponent from "../../components/PaginationComponent";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [tempSearchValue, setTempSearchValue] = useState("");

  useEffect(() => {
    setIsLoading(true);
    searchData(searchValue, activePage)
    .then((res) => {
      console.log(res, 'res');
      setData(res?.results);
      setActivePage(res?.page);
      setTotalPages(res?.total_pages);
    })
    .catch((err) => console.log(err, 'err'))
    .finally(() => setIsLoading(false));
  }, [searchValue, activePage])
  

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(tempSearchValue);
  };

  return (
    <Container maxW={"container.xl"}>
      <form onSubmit={handleSearch}>
        <Input placeholder="Search Movies, TV Shows ..." value={tempSearchValue} onChange={(e) => setTempSearchValue(e.target.value)} mb={"5"}/>
      </form>

      {isLoading && (
        <Flex justifyContent={"center"} mt={"10"}>
          <Spinner size={"xl"} color="grey.900" thickness="6px" />
        </Flex>
      )}

      {data?.length === 0 && !isLoading && (
        <Heading textAlign={"center"} as={"h3"} fontSize={"md"} mt={"10"} color={"gray.400"}>
          No Results Found
        </Heading>
      )}

      <Grid templateColumns={{
        base: "repeat(3, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        lg: "repeat(5, 1fr)"
      }} gap={"4"}>
        {data?.length > 0 && !isLoading && data?.map((item, i) => (
          isLoading ? (
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

      {data?.length > 0 && !isLoading && (
        <Flex justify={"right"}>
          <PaginationComponent activePage={activePage} totalPages={totalPages} setActivePage={setActivePage}></PaginationComponent>
        </Flex>
      )}
    </Container>
  )
}

export default Search;