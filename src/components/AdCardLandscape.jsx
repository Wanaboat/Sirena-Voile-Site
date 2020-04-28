import React, { Component } from 'react';
import { Link as GatsbyLink } from "gatsby";

import {
  Badge,
  Box,
  Grid,
  Flex,
  Heading,
  Icon,
  Link,
  Text,
  PseudoBox
} from "@chakra-ui/core";

// import css from './ad-item.module.scss';
import NumberFormat from 'react-number-format';
// import logo from "../../assets/svg/logo.svg";

class AdCardLandscape extends Component {
  displayThumbnail(images, alt) {
    if (images === null || images === undefined) {
      return (
        <picture>
          {/* <img loading="lazy" src={logo} alt={alt} /> */}
        </picture>
      )
    }
    else if (images.url.length === 0) {
      return (
        <picture>
          {/* <img loading="lazy" src={logo} alt={alt} /> */}
        </picture>
      )
    }
    else {
      return (
        <Box
          position="relative"
        >
          <picture>
            <source
              srcSet={
                process.env.WB_PICTURES_URL
                + images.url[0]
                + '?quality=70&fit=cover&width=96&height=96&format=webp'
              }
              type="image/webp"
            />
            <source
              srcSet={
                process.env.WB_PICTURES_URL
                + images.url[0]
                + '?quality=70&fit=cover&width=96&height=96&format=jpeg'
              }
              type="image/jpeg"
            />
            <img
              src={
                process.env.WB_PICTURES_URL
                + images.url[0]
                + '?quality=70&fit=cover&width=96&height=96&format=jpg'
              }
              loading='lazy'
              alt={alt}
            />
          </picture>
          <Flex
            position="absolute" bottom="0" left="0" w={'100%'}
            justify="flex-end"
            borderRadius={'0 0 4px 4px'}
            p={1}
            alignItems="flex-end"
            background="linear-gradient(180deg, rgba(32, 32, 32, 0) 0%, rgba(26, 26, 26, 0.8) 100%)"
          >
            <Text
              as="span"
              fontSize="xs"
              color="white"
              pr={1}
            >
              {images.url.length}
            </Text>
            <Icon size="14px" name="camera" color="white" />
          </Flex>
        </Box>

      );
    }
  }

  render() {
    const { name, price, date, to, brand, images, publicationDate, isInIframe  } = this.props;
    // const cardClickHandle = (event) => {
    //   let relatedLink = event.target.closest('.ad-card').querySelector('a');
    //   if( !isInIframe ) {
    //     relatedLink.click();
    //   }
    // }
    return (
      <PseudoBox
        className="ad-card"
        display="block"
        p={{ xs: 2, lg:4 }}
        mb={5}
        background="white"
        shadow="xs"
        borderRadius={4}
        border="solid 2px white"
        borderBottomColor="brand.light2"
        _hover={{
          borderColor:"blue.200",
          cursor:"pointer"
        }}
        onClick={ this.props.openAction }
      >
        <Grid
          templateColumns={{ xs: "96px calc(95% - 96px)", lg: "96px calc(100% - 96px - 100px - 30px) 100px" }}
          gridGap={"15px"}>
          <Box>
            {this.displayThumbnail(images, name)}
          </Box>
          <Box>
            <Heading
              as="h5"
              w={'100%'}
              fontWeight="400"
              fontSize={{ xs: "lg" }}
              isTruncated>
              <Link
                as={ isInIframe ? Text : GatsbyLink }
                // onClick={ isInIframe ? openAction : cardClickHandle }
                to={`/${to}`}
              >
                {name}
              </Link>
            </Heading>
            <Flex mt={4}>
              <Box w={{ xs: '40%', md: "25%" }}>
                <Text
                  pr={5}
                  pb={1}
                  mb={1}
                  borderBottom="solid 1px"
                  borderBottomColor="gray.200"
                  fontSize="xs"
                >
                  Prix
                </Text>
                <Box pr={5}>
                  <Badge as="span" variantColor="green" fontSize="sm">
                    {(price > 0) ?
                      <NumberFormat
                        value={price}
                        thousandSeparator={" "}
                        suffix=" €"
                        displayType="text"
                      />
                      : "-"}
                  </Badge>
                </Box>
              </Box>
              <Box
                display={{ md: 'initial' }}
                w={{ xs: '50%', md: "25%" }}>
                <Text
                  pr={5}
                  pb={1}
                  mb={1}
                  borderBottom="solid 1px"
                  borderBottomColor="gray.200"
                  fontSize="xs"
                >
                  Marque
                </Text>
                <Text
                  pr={5}
                  fontWeight="600"
                  fontSize="sm"
                >
                  {brand ? brand : '-'}
                </Text>
              </Box>
              <Box
                display={{ xs: 'none', md: 'initial' }}
                w={{ xs: '50%', md: "25%" }}>
                <Text
                  pr={5}
                  pb={1}
                  mb={1}
                  borderBottom="solid 1px"
                  borderBottomColor="gray.200"
                  fontSize="xs"
                >
                  Année
                </Text>
                <Text
                  pr={5}
                  fontWeight="600"
                  fontSize="sm"
                >
                  {date ? date : '-'}
                </Text>
              </Box>
            </Flex>
          </Box>
          <Flex
            display={{ xs: 'none', lg: 'flex' }}
            justifyContent="flex-end"
            wrap="wrap"
          >
            <Text
              w={'100%'}
              textAlign="right"
            >
              {publicationDate}
            </Text>
            <PseudoBox
              alignSelf="flex-end"
              bg="blue.brand"
              borderRadius={3}
              padding={2}
              color="white"
              textTransform="uppercase"
              fontSize="sm"
              letterSpacing={1.2}
              _hover={{ borderColor: "gray.200", bg: "blue.400" }}

            >Voir →
              </PseudoBox>
          </Flex>
        </Grid>
      </PseudoBox>
    )
  }
}

export default AdCardLandscape