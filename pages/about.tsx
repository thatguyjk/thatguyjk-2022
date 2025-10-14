import Head from "next/head";
import Bold from "@/components/BoldText";
import Italic from "@/components/ItalicText";
import Text from "@/components/Text";
import Code from "@/components/CodeText";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getAboutContent } from "@/lib/api";

import { nunito } from "@/styles/fonts";

function About({ aboutContent }) {
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <Bold classes=''>{text}</Bold>,
      [MARKS.ITALIC]: (text) => <Italic classes=''>{text}</Italic>,
      [MARKS.CODE]: (text) => <Code classes=''>{text}</Code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => (
        <Text classes='text-lg mb-4'>{children}</Text>
      ),
      [INLINES.HYPERLINK]: ({ data }, children) => (
        <a
          className='text-red'
          href={data.uri}
          target='_blank'
          rel='noopener noreferrer'
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <>
      <Head>
        <title>ThatGuyJK - About</title>
      </Head>
      <article className='py-16 pb-0 min-h-[calc(100vh-3.5rem)]'>
        <h5 className={`${nunito.className} mb-8 text-4xl`}>About Me</h5>

        <section className='grid'>
          <div className={`${nunito.className}`}>
            {documentToReactComponents(aboutContent, options)}
          </div>
        </section>
      </article>
    </>
  );
}

export async function getStaticProps() {
  const aboutData = await getAboutContent();

  return {
    props: {
      aboutContent: aboutData,
    },
  };
}

export default About;
