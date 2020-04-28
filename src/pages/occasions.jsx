import React from "react"
import {
  Box,
  Heading,
  Flex,
  Link,
  Text,
  Stack,
  Spinner,
} from "@chakra-ui/core"
import { Radio, RadioGroup } from "@chakra-ui/core"
import Layout from "../components/Layout"
import AdCardLandscape from "../components/AdCardLandscape"
import AdCardPortraitLarge from "../components/AdCardPortraitLarge"

const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  environment: "master",
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

export default class AdsIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: null,
      adSingleID: null,
      isLoading: true,
      singleAdID: null,
      filter: 'all'
    }
  }

  getAds() {
    const { filter } = this.state;
    let universFilter = null;
    let _this = this;

    if (filter !== 'all') {
      universFilter = { "fields.refUnivers.sys.id": filter };
    }
    let query = {
      content_type: "ad",
      "fields.userId": 14,
      order: '-fields.publicationDate',
      limit: 100,
      ...universFilter
    };

    client.getEntries(query).then(function (results) {
      _this.setState({ ads: results.items });
      _this.setState({ isLoading: false });
    });
  }
  componentDidMount() {
    this.getAds();
  }

  render() {
    const { ads, adSingleID, isLoading } = this.state
    const FullDate = (props) => {
      const date = new Date(props.date);
      return (
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
      )
    }
    const DateYear = (props) => {
      const date = new Date(props.date);
      return (
        date.getFullYear()
      )
    }
    const openAd = (id) => {
      this.setState({ 'adSingleID': id })
    }
    const closeAd = () => {
      this.setState({ 'adSingleID': null })
    }
    const handleFilter = (value) => {
      this.setState({
        filter: value,
        isLoading: true,
        adSingleID: null,
        ads: null
      });
      setTimeout(() => { this.getAds(); }, 500);

    }
    return (
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
            Dériveur Services proposent également la reprise et un service
            d'achat/vente.
          </Text>
          <Box as="section">
            <Stack
              display={{ xs: "none", lg: "flex" }}
              borderBottom="solid 3px"
              px={2}
              py={4}
              borderColor="brand.light1"
              isInline
              spacing={8}>
              <Text>Filtrer :</Text>
              <RadioGroup defaultValue="all" name="filter" isInline spacing={8} onChange={(e) => { handleFilter(e.target.value) }}>
                <Radio value="all">Toutes les annonces</Radio>
                <Radio value="4zJDaRiNg9nlD69B9U6Ot">Dériveurs</Radio>
                <Radio value="4A30YD7j2K7y2ti3ZGxwwg">Catamarans</Radio>
                <Radio value="1YRU4xM28ZGl3GpLvUvrUj">Dayboats</Radio>
              </RadioGroup>
            </Stack>
          </Box>

          {isLoading ?
            <Flex align="center" justify="center" p={1}>
              <Spinner size="xs" color="brand.light1" mr={2} />
              <Text>Chargement en cours...</Text>
            </Flex>

            : null}
          <Box
            // maxW={"1000px"}
            ml={{ xs: "-1.5rem", lg: 0 }}
            mr={{ xs: "-1.5rem", lg: 0 }}
          >

            {adSingleID ?
              <Flex justify="center">
                <AdCardPortraitLarge
                  id={adSingleID}
                  backAction={closeAd}
                  context="export-whitelabel"
                />
              </Flex>
            : null}

            <Box p={{ xs:"1rem", lg:0 }}>
              {ads && !adSingleID ?
                ads.map((edge, i) =>
                  <AdCardLandscape
                    openAction={() => { openAd(edge.sys.id) }}
                    key={edge.sys.id}
                    isInIframe={true}
                    to={edge.fields.slug}
                    name={edge.fields.name}
                    price={edge.fields.price}
                    brand={(edge.fields.refBrand) ? edge.fields.refBrand.name : null}
                    date={edge.fields.date ? <DateYear date={edge.fields.date} /> : '-'}
                    place={edge.fields.department}
                    region={edge.fields.department}
                    images={edge.fields.images}
                    publicationDate={<FullDate date={edge.fields.publicationDate} />}
                  />)
                : null}
            </Box>

            {!isLoading && ads.length === 0 ?
              <Text>Pas d'annonce actuellement selon vos critères.</Text>
              : null}
          </Box>

          <Text
            textAlign="center"
            color="gray.500"
            fontSize={13}
          >Les annonces d'occasion Dériveur Services sont carénnées par Wanaboat.fr, <Link isExternal={true} target="_blank" href="https://www.wanaboat.fr/">la référence du bateaux d'occasion</Link>.</Text>
        </Stack>

      </Layout>
    )
  }
}