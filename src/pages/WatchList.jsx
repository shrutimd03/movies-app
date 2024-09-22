import { useState, useEffect } from "react"
import { useFirestore } from "../services/firestore"
import { useAuth } from "../context/useAuth"
import { Container, Flex, Grid, Heading, Spinner } from "@chakra-ui/react";
import WatchlistCard from "../components/WatchlistCard";

const WatchList = () => {
    const { getWatchlist } = useFirestore();
    const { user } = useAuth();
    const [watchList, setWatchList] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      if (user?.uid) {
        getWatchlist(user?.uid).then((data) => {
            setWatchList(data);
            console.log(data, "data")
        }).catch((err) => {
            console.log(err, "Error")
        }).finally(() => {
            setIsLoading(false);
        })
      }
    }, [user?.uid, getWatchlist])
    

    return (
        <Container maxW={"container.xl"}>
            <Flex alignItems={"baseline"} gap={"4"} my={"10"}>
                <Heading as="h2" fontSize={"md"} textTransform={"uppercase"}>
                    My Watchlist
                </Heading>
            </Flex>
            {isLoading && (
                <Flex justify={"center"}>
                    <Spinner size={"xl"} color="grey.900" thickness="6px" />
                </Flex>
            )}
            {!isLoading && watchList?.length === 0 && (
                <Flex justify={"center"}>
                    <Heading as={"h2"} fontSize={"md"}>
                        Watchlist is empty . . . Discover more great content and come back!
                    </Heading>
                </Flex>
            )}
            {!isLoading && watchList?.length > 0 && (
                <Grid templateColumns={{
                    base: "1fr",
                }}
                gap={"4"}
                >
                    {watchList?.map((item) => (
                        <WatchlistCard 
                        key={item?.id}
                        item={item}
                        type={item?.type}
                        setWatchlist={setWatchList}
                        />
                    ))}
                </Grid>
            )} 
        </Container>
    )
}

export default WatchList