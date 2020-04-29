import React from "react"
import Layout from "../components/Layout"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import WbAdsList from "../components/WbAdsList"
import {
    Heading,
    Text,
    Stack,
  } from "@chakra-ui/core"

const SecondHandPage = () => 
{
    const { wbUserID } = useSiteMetadata()
    return(
        <Layout>
            <Stack
            spacing={5}
            maxW={"1000px"}
            px={{ xs: "1.5rem", lg: "5rem" }}
            py={{ xs: "2rem", lg: "5rem" }}
            mx="auto"
            >
            <Heading as="h1">Nos bateaux d'occasion</Heading>
            <Text>
                Nous avons un grand stock d'occasion & dériveurs en particulier.
                Nous proposons également la reprise et un service
                d'achat/vente.
            </Text>
            <WbAdsList wbUserID={wbUserID} />
            </Stack>
        </Layout>
    )
}

export default SecondHandPage