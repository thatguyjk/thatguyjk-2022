import { useState, useEffect } from 'react';
import Head from 'next/head';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
   getAboutContent } from '../lib/api';

function About({aboutContent}) {
  const Bold = ({classes, children}) => <b className={classes}>{children}</b>;
  const Text = ({classes, children}) => <p className={classes}>{children}</p>;
  const Italic = ({classes, children}) => <em className={classes}>{children}</em>;
  const Code = ({classes, children}) => <code className={classes}>{children}</code>;

  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold classes="">{ text }</Bold>,
      [MARKS.ITALIC]: text => <Italic classes="">{ text }</Italic>,
      [MARKS.CODE]: text => <Code classes="">{ text }</Code>
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text classes="text-2xl mb-4">{ children }</Text>,
      [INLINES.HYPERLINK]: ({data}, children) => <a className="text-red" href={data.uri} target="_blank" rel="noopener noreferrer">{children}</a>
    }
  }

  return (
    <>
      <Head>
        <title>ThatGuyJK - About</title>
      </Head>
      <article className='py-16 pb-0 min-h-[calc(100vh-3.5rem)]'>
          <h5 className='mb-8 font-nunito text-4xl'>About Me</h5>

          <section className='grid'>
            <div className='font-nunito'>
            {documentToReactComponents(aboutContent, options)}
            </div>
          </section>
      </article>
    </>
  );
}

export async function getStaticProps() {
  const aboutData = await getAboutContent();

  console.log(aboutData);

  return {
      props: {
          aboutContent: aboutData
      },
  }
}

export default About;