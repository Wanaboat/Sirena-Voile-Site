import React from "react";
// import PreviewCompatibleImage from "./PreviewCompatibleImage";

// import Excerpt from "../components/content/excerpt";
// import Img from "gatsby-image"
import AdCardLandscape from "../components/AdCardLandscape"
import AdCardPortraitLarge from "../components/AdCardPortraitLarge"
import {
  Box,
  Heading,
  Text,
  Flex
} from "@chakra-ui/core"
const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  environment: "master",
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});


class AdsRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ads: null,
      modelID: this.props.modelID,
      adSingleID: null
    }
  }

  componentDidMount() {
    const { modelID } = this.state;
    console.log('modelID', modelID)
    let _this = this;
    let query = {
      content_type: "ad",
      "fields.userId": 14,
      "fields.refModel.sys.id": modelID,
      order: '-fields.publicationDate',
      limit: 100,
      // skip: 10 * (filteredPageNum - 1)
    }
    client.getEntries(query).then(function (results) {
      _this.setState({ ads: results.items });
      _this.setState({ isLoading: false });
    });
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
    const closeAd = () => {
      this.setState({ 'adSingleID': null })
    }
    const openAd = (id) => {
      console.log('open ad');
      this.setState({ 'adSingleID': id })
    }
    // const closeAd = () => {
    //   this.setState({ 'adSingleID' : null })
    // }

    return (
      <Box>
        {!ads ? <Text>Pas d'occasion pour ce modèle actuellement.</Text> : null}

        {adSingleID ?
            <Flex justify="center">
              <AdCardPortraitLarge
                id={adSingleID}
                backAction={closeAd}
                context="export-whitelabel"
              />
            </Flex>
          : null}


        {ads && !adSingleID ?
          <Box
            maxW={"1000px"}
            px={{ xs:"2rem", lg:"4rem" }}
            mx="auto"
          >
            <Heading
              as="h5"
              fontSize="16px"
              mb={2}
            >
              Nos occasions du moment:
          </Heading>

         
            {ads.map((edge, i) =>
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
              />)}
          </Box>
          : null}
        {!isLoading && !ads === 0 ?
          <Text>Pas d'occasion de ce bateau actuellement.</Text>
          : null}
      </Box>
    );
  }
}

export default AdsRoll