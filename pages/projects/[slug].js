import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from "../../lib/api";
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Project({project}) {
    const [createdAt, setCreatedAt] = useState("");
    const [description, setDescription] = useState(null);
    const [techStack, setTechStack] = useState([]);
    const [title, setTitle] = useState([]);
    const [url, setUrl] = useState("");
    const [projectImages, setImages] = useState([]);
    
    const Bold = ({children}) => <b>{children}</b>;
    const Text = ({children}) => <p>{children}</p>;
    const Italic = ({children}) => <em>{children}</em>
    const Code = ({children}) => <code>{children}</code>

    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{ text }</Bold>,
        [MARKS.ITALIC]: text => <Italic>{ text }</Italic>,
        [MARKS.CODE]: text => <Code>{ text }</Code>
      },
      renderNode: {
        [BLOCKS.PARAGRAPH]: (node, children) => <Text>{ children }</Text>,
        [INLINES.HYPERLINK]: ({data}, children) => <a href={data.uri} target="_blank" rel="noopener noreferrer">{children}</a>
      }
    }
    useEffect(() => {
      setCreatedAt(project.fields?.createdAt);
      setDescription(project.fields?.description);
      setTechStack(project.fields?.techStack);
      setTitle(project.fields?.title);
      setUrl(project.fields?.url);
      setImages(project.fields?.projectImages);
    }, [project]);

    return (
      <>
        <Head key='title'>
          <title>ThatGuyJK - Projects - {title}</title>
        </Head>
        <article className='translate-y-16 min-h-screen'>
          <section className='mb-6'>
            <h1 className='font-roboto text-4xl md:text-5xl'>{title}</h1>
          </section>

          <section className='grid gap-3 md:grid-cols-2'>
            <div className='font-nunito'>
            {documentToReactComponents(description, options)}
            </div>

            <div className='grid auto-rows-auto gap-4 font-nunito'>
              <div>
                <h6 className='underline underline-offset-4 text-xl font-bold'>Created At</h6>
                <p className='text-lg'>{createdAt}</p>
              </div>

              <div>
                <h6 className='underline underline-offset-4 text-xl font-bold'>Technology Used</h6>
                <ul>
                  {techStack.map((tech, id) => {
                    return <li key={id} className='text-sm font-semibold bg-olive p-1 rounded inline-block mr-2'>{tech}</li>;
                  })}
                </ul>
              </div>

              <div>
                <h6 className='underline underline-offset-4 text-xl font-bold'>Project URL</h6>
                <a href={url} target='_blank' rel='noreferrer'>
                  {url}
                </a>
              </div>
            </div>
          </section>
          
          <section className='grid grid-cols-1 gap-2 md:grid-cols-2'>
          {projectImages.map((prjImg, imgId) => {
              return (
                <figure key={imgId}>
                  <Image
                    src={"/" + prjImg.fields?.file.fileName}
                    alt={prjImg.fields?.title}
                    layout='intrinsic'
                    width={prjImg.fields?.file?.details?.image?.width}
                    height={prjImg.fields?.file?.details?.image?.height}
                  />
                </figure>
              );
            })}
          </section>          
        </article>

      </>
    );
}

export async function getStaticPaths() {
    const allProjects = await getAllProjects();

    allProjects.items.forEach((project) => {
      delete project["sys"];
      delete project["metadata"];
    });

    const paths = allProjects.items.map((prj) => ({
        params: { slug: prj.fields.slug }
    }));

    return { 
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
  const allProjects = await getAllProjects();

  const portfolioItem = allProjects.items.filter((project) => {
    delete project['metadata'];
    delete project['sys'];

    return project['fields']['slug'] === params.slug;
  });

  return {
    props: {
      project: portfolioItem[0],
    },
  };
}