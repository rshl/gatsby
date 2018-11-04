import React from "react"
import Img from "gatsby-image"
import styled from "react-emotion"
import numeral from "numeral"

import presets from "../utils/presets"
import { options, scale } from "../utils/typography"

const OuterContainer = styled(`div`)`
  background: #fff;

  ${presets.Tablet} {
    margin: 0;
    margin-left: calc(-${presets.offset} - ${presets.gutter.tablet});
    padding: 100px;
    padding-right: 0;
  }

  ${presets.Desktop} {
    margin-left: calc(-${presets.offset} - ${presets.gutter.desktop});
  }

  ${presets.Xl} {
    margin-right: -${presets.gutter.desktop};
  }

  ${presets.Xxl} {
    margin-left: calc(-${presets.offsetXxl} - ${presets.gutter.desktop});
  }
`

const Grid = styled(`div`)`
  column-count: 1;
  column-gap: ${presets.gutter.default};

  ${presets.Mobile} {
    column-count: 2;
  }

  ${presets.Tablet} {
    column-count: 3;
  }

  ${presets.Xl} {
    column-gap: ${presets.gutter.tablet};
  }
`

const GridItem = styled(`div`)`
  break-inside: avoid;
  position: relative;
  margin-bottom: ${presets.gutter.default};

  ${presets.Xl} {
    margin-bottom: ${presets.gutter.tablet};
  }
`

const GridItemImage = styled(Img)`
  &:hover {
    div + img {
      opacity: 1 !important;
      transition: none !important;
    }

    img + picture > img {
      opacity: 0 !important;
    }

    span: {
      opacity: 1 !important;
    }
  }
`

const Badge = styled(`span`)`
  background: #fff;
  bottom: 10px;
  border-radius: 2px;
  color: ${options.bodyColor};
  font-family: ${options.monospaceFontFamily.join(`,`)};
  font-size: ${scale(-1).fontSize};
  line-height: 1;
  padding: 0.25rem;
  pointer-events: none;
  position: absolute;
  opacity: 0.5;
  right: 10px;
`

const ImageGallery = edges => (
  <OuterContainer>
    <Grid>
      {edges.images.map((image, index) => (
        <GridItem key={index}>
          <GridItemImage
            fluid={image.node.localFile.childImageSharp.fluid}
            title={`“${image.node.title}” by ${
              image.node.credit
            } (via unsplash.com)`}
          />
          <Badge>
            SVG
            {` `}
            {numeral(
              Buffer.byteLength(
                image.node.localFile.childImageSharp.fluid.tracedSVG,
                `utf8`
              )
            ).format()}
            {` `}B
          </Badge>
        </GridItem>
      ))}
    </Grid>
  </OuterContainer>
)

export default ImageGallery
