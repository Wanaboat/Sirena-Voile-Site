import React from 'react'
import { Link } from 'gatsby'
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <span>{children}</span>,
    [BLOCKS.UL_LIST]: (node, children) => <span>{children}</span>,
    [BLOCKS.LIST_ITEM]: (node, children) => <span>{children}</span>,
    
    // [INLINES.EMBEDDED_ENTRY]: ({ data: { target: { fields }}}) =>
    // { 
    //   return(
    //     <Link to={fields.slug.fr}>{fields.name.fr}</Link> 
    //   )
    // },
    // [BLOCKS.EMBEDDED_ASSET]: ({ data: { target: { fields }}}) =>
    // {
    //   return (
    //     <picture style={ { display:'block', width:'100%', margin: '0 0 30px 0' } }>
    //       <source srcSet={fields.file.fr.url + '?w=600&h=400&q=70&fit=pad&fm=webp'} type="image/webp" />
    //       <source srcSet={fields.file.fr.url + '?w=600&h=400&q=70&fit=pad&fm=png'} type="image/png" />
    //       <img style={ { width:'100%' } } loading="lazy" src={fields.file.fr.url + '?w=120&h=120&q=90&fit=fill'} alt={fields.description.fr} />
    //     </picture>
    //   )
    // },
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
  },
}

let Excerpt = ({ data, appearance }) => {
  let text = documentToReactComponents(data, richTextOptions);
  // console.log( text );

  const rawText = text.map((item, index) => item.props.children[0] );
  const stringRawText = rawText.join(' ').substr(0,120);
    
  console.log( stringRawText )
  return(
    <>{stringRawText}...</>
  )
}


export default Excerpt