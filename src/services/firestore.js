import { useToast } from "@chakra-ui/react";
import { db } from "../services/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'
import { useCallback } from "react";

export const useFirestore = () => {
    const toast = useToast();
    const addDocument = async (collectionName, data) => {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document written with ID: ", docRef.id);
    };

    const addToWatchlist = async (userId, dataId, data) => {
        try {
            if (await checkIfInWatchlist(userId, dataId)) {
                toast({
                    description: "This item is already in your watchlist!",
                    status: "error",
                    duration: 9000,
                    isClosable: true
                });
                return false;
            }
            await setDoc(doc(db, "users", userId, "watchlist", dataId), data);
            toast({
                title: "Success!",
                description: "Added to watchlist.",
                status: "success",
                isClosable: true
            });
        } catch (error) {
            console.log(error, "error adding document"); 
            toast({
                title: "Error!",
                description: "An error occured.",
                status: "error",
                isClosable: true
            });
        }
    }

    const checkIfInWatchlist = async (userId, dataId) => {
        const docRef = doc(db, "users", userId?.toString(), "watchlist", dataId?.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return true;
        } else {
            return false;
        }
    };

    const removeFromWatchlist = async (userId, dataId) => {
        try {
            await deleteDoc(
                doc(db, "users", userId?.toString(), "watchlist", dataId?.toString())
            );
            toast({
                title: "Success!",
                description: "Removed from watchlist.",
                status: "success",
                isClosable: true
            });
        } catch (error) {
            toast({
                title: "Error!",
                description: "An error occured.",
                status: "error",
                isClosable: true
            });
            console.log(error, "Error while deleting doc");
        };
    };

    const getWatchlist = useCallback(async (userId) => {
        const querySnapshot = await getDocs(collection(db, "users", userId, "watchlist"));
        const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
        }));
        return data;
    }, []);

    return {
        addDocument,
        addToWatchlist,
        checkIfInWatchlist,
        removeFromWatchlist,
        getWatchlist,
    };
};


