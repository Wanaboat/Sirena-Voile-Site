import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import ReactSwipe from "react-swipe";
// import DayJS from "react-dayjs";

// ReactGA.initialize(process.env.GA_ID);

import NumberFormat from "react-number-format";
import {
    Icon,
    Badge,
    Divider,
    Heading,
    Box,
    Flex,
    Text,
    Button,
    Link,
    Grid,
    SimpleGrid
} from "@chakra-ui/core";

// import ReactGA from "react-ga";
// ReactGA.initialize(process.env.GA_ID );

const contentful = require("contentful");
const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE,
  environment: "master",
  accessToken: process.env.REACT_APP_CONTENTFUL_TOKEN
});

export default class AdCardPortraitLarge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:this.props.id,
            ad:null,
            isLoading: true,
            isViewingPictures: false,
            context: this.props.context
        };
    }
    componentDidMount() {
        const { context} = this.state;
        var _this = this;
        client.getEntry(this.state.id).then(function(entry) {
            console.log( entry );
            _this.setState({ ad: entry.fields });
            _this.setState({ isLoading: false });
          });
        if( context === 'export-iframe'){
            // ReactGA.pageview( ad.slug );
        }
    }   

    render() {
        const { ad, isLoading, isViewingPictures } = this.state;
        const Carousel = () => {
            let reactSwipeEl;

            return (
                <Box
                    background={{}}
                >
                    <Flex
                        w={"100%"}
                        p={4}
                        zIndex={"modal"}
                        justify={"space-between"}
                        style={{
                            position: "absolute",
                            // top: "10rem",
                            left: 0,
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,.4) 0%, rgba(0,0,0,0) 100%)"
                        }}
                    >
                            <Button
                                opacity={(isViewingPictures) ? "0" : "1"}
                                transition="opacity .5s ease"
                                variant="outline"
                                color="white"
                                size="sm"
                                leftIcon="arrow-back"
                                onClick={this.props.backAction ? this.props.backAction : null}
                                _hover={{
                                    background:"blue.brand",
                                    color:"white"
                                }}
                                cursor="pointer"
                            >
                                Retour
                            </Button>
                        
                        {(ad.images) ? 
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isViewingPictures: isViewingPictures ? false : true
                                    });
                                    reactSwipeEl.slide(2, 500);
                                }}
                                variant="outline"
                                color="white"
                                size="sm"
                                rightIcon={isViewingPictures ? "small-close" : "arrow-forward"}
                            >
                                {isViewingPictures
                                    ? `Fermer le diaporama`
                                    :  (ad.images.url.length > 1) ? `${ad.images.url.length} photos` : "1 photo" }
                            </Button>
                        : null}
                    </Flex>
                    <ReactSwipe
                        className="carousel"
                        swipeOptions={{
                            continuous: true,
                            callback: () => {
                                if (!isViewingPictures) {
                                    this.setState({ isViewingPictures: true });
                                }
                            }
                        }}
                        ref={el => (reactSwipeEl = el)}
                    >
                        {(ad.images) ? 
                            ad.images.url.map(imageUrl => (
                                <Box
                                    key={imageUrl}
                                    minHeight={"300px"}
                                    bg={"gray.300"}
                                    w={"100%"}
                                    mt={ this.state.isViewingPictures ? "0" : "-200px" }

                                >
                                    <picture>
                                        <source
                                            type="image/webp"
                                            srcSet={`https://wanaboatimages-99dc.kxcdn.com/photos/${imageUrl}?fit=cover&width=750&height=750&format=webp`}
                                        />
                                        <img
                                            // minHeight={"300px"}
                                            // bg={"gray.300"}
                                            // mt={this.state.isViewingPictures ? 0 : -40}
                                            // transition="margin-top .3s ease"
                                            // w={"100%"}
                                            // objectFit={"cover"}
                                            style={{
                                                objectFit:"cover",
                                                transition:"margin-top .3s ease",
                                            }}
                                            alt={ad.name}
                                            // loading="lazy"
                                            src={`https://wanaboatimages-99dc.kxcdn.com/photos/${imageUrl}?fit=cover&width=750&height=750&format=jpg`}
                                        />
                                    </picture>
                                </Box>
                            ))
                        :
                            <Box>
                                {/* <Image src={logo} /> */}
                            </Box>
                        }
                    </ReactSwipe>
                    {isViewingPictures && ad.images.url.length > 1 ? (
                        <Flex
                            p={10}
                            w={"100%"}
                            justify="space-between"
                            bottom=" 0"
                            position="absolute"
                        >
                            <Button
                                leftIcon="arrow-back"
                                onClick={() => reactSwipeEl.next()}
                            ></Button>
                            <Button
                                rightIcon="arrow-forward"
                                onClick={() => reactSwipeEl.prev()}
                            ></Button>
                        </Flex>
                    ) : null}
                </Box>
            );
        };

        const CustomP = ({ children }) => <Text mb={1}>{children}</Text>;

        const options = {
            renderMark: {
                [MARKS.BOLD]: text => <Text as="em">{text}</Text>
            },
            renderNode: {
                [BLOCKS.PARAGRAPH]: (node, children) => <CustomP>{children}</CustomP>
            }
        };

        const document = ad
            ? ad.description
            : null;

        return (
            <Box
                zIndex={"sticky"}
                boxShadow="xs"
                backgroundColor="gray.50"
                w={{ xs: "100vw", sm: "100vw", md: "650px", xl: "700px" }}
                mb={0}
                borderRadius={{xs:0, md:"10px"}}
                overflow="hidden"
            
            >
                {isLoading ? (
                    "-"
                ) : (
                        <>
                            <Box position={"relative"}>
                                <Carousel />
                            </Box>
                            <Box>
                                <Grid
                                    p={[6, 4]}
                                    templateColumns={{ xs: "100%", lg: "45% 1fr" }}
                                    gap={[0, 0, 5, 15]}
                                    m={"0 auto"}
                                    pb={10}
                                    columns={[1, 1, 2]}
                                >
                                    <Box>
                                        <Box
                                            mx={0}
                                            position="relative"
                                            p={5}
                                            bg={"white"}
                                            mt={isViewingPictures ? 0 : -20}
                                            borderRadius={10}
                                            zIndex={"modal"}
                                            transition="margin-top .5s ease"
                                        >   
                                            <Box my={5} mb={0} color={"gray.600"}>
                                                <SimpleGrid columns={2}>
                                                    <Box>Prix</Box>
                                                    <Box fontWeight={"600"} textAlign="right">
                                                        <Badge as="span" variantColor="green" fontSize="md">
                                                            <NumberFormat
                                                                value={ad.price}
                                                                thousandSeparator={" "}
                                                                suffix=" €"
                                                                displayType="text"
                                                            />
                                                        </Badge>
                                                    </Box>
                                                </SimpleGrid>
                                                <Divider  borderColor="gray.100" />
                                                <SimpleGrid columns={2}>
                                                    <Box>Publication</Box>
                                                    <Box fontWeight={"600"} style={{ textAlign: "right" }}>
                                                            {ad.publicationDate}
                                                    </Box>
                                                </SimpleGrid>
                                                <Divider  borderColor="gray.100" />
                                                {ad.year ? (
                                                    <>
                                                        <SimpleGrid columns={2}>
                                                            <Box>Année</Box>
                                                            <Box textAlign="right">
                                                                <Text fontWeight={"600"}>{ad.year}</Text>
                                                            </Box>
                                                        </SimpleGrid>
                                                        <Divider  borderColor="gray.100" />
                                                    </>
                                                ) : null}

                                                {ad.refBrand ? (
                                                    <>
                                                        <SimpleGrid columns={2}>
                                                            <Box>Constructeur</Box>
                                                            <Box textAlign="right">
                                                                <Link
                                                                    fontWeight="600"
                                                                    color="blue.500"
                                                                    textDecoration="underline"
                                                                    as={GatsbyLink}
                                                                    onClick={() => {
                                                                        this.props.close();
                                                                    }}
                                                                    to={`/${ad.refBrand.slug}`}
                                                                >
                                                                    {ad.refBrand.name}
                                                                </Link>
                                                            </Box>
                                                        </SimpleGrid>
                                                        <Divider  borderColor="gray.100" />
                                                    </>
                                                ) : null}

                                                <SimpleGrid columns={2}>
                                                    <Box>Département</Box>
                                                    <Box textAlign="right">
                                                        <Text fontWeight={"600"}>{ad.department}</Text>
                                                    </Box>
                                                </SimpleGrid>
                                                <Divider  borderColor="gray.100" />

                                                
                                                { ad.documents ? 
                                                    <SimpleGrid columns={2}>
                                                        <Box>Inventaire</Box>
                                                        <Box textAlign="right">
                                                            <Link
                                                                as={GatsbyLink}
                                                                target="_blank"
                                                                to={`/documents${ad.documents}`}>
                                                                <Icon name="attachment" size="12px" mr={1} />
                                                                Télécharger
                                                            </Link>
                                                        </Box>
                                                    </SimpleGrid>
                                                :null}



                                                {(ad.location) ? 
                                                    <Box mt={10}>
                                                        <Text>Localisation</Text>
                                                        <img
                                                            width="319"
                                                            alt="Localisation de votre annonce"
                                                            height="150"
                                                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${ad.location.lat},${ad.location.lon}&zoom=7&autoscale=1&size=319x150&maptype=roadmap&key=AIzaSyC7O1XSp3BY1qkSUWKhR0hl4mOHcCIxi_U&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:1%7C${ad.location.lat},${ad.location.lon}`}
                                                        />
                                                    </Box>
                                                : null}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box p={[2, 4, 6]} mt={[5, 5, 0]}>
                                        <Heading mb={5} as="h1" size="md" color={"gray.700"}>
                                            {ad.name}
                                        </Heading>
                                         {documentToReactComponents(document, options)}
                                        {/* <div dangerouslySetInnerHTML={ injectMarkup( documentToHtmlString( document, options ) )} /> */}
                                        
                                        
                                    </Box>
                                </Grid>                    
                                        
                            </Box>
                        </>
                    )}
            </Box>
        );
    }
}
