import React from "react"
import { Flex, Box } from "@chakra-ui/core";

const Hamburger = ({ isActive }) => (
    <Flex
        as="button"
        width="45px"
        height="45px"
        wrap="wrap"
        p={2}
        justifyContent="space-between"
    >
        <Box w="100%" h={"3px"} bg="brand.light1" />
        <Box w="100%" h={"3px"} bg="brand.light1" />
        <Box w="100%" h={"3px"} bg="brand.light1" />
    </Flex>
)

export default Hamburger