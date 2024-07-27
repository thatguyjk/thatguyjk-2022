import { useRouter } from 'next/router';
import Head from 'next/head';
import { getAllProjects } from "../../lib/api";
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import { gsap } from "gsap";

export default function Project({createdAt, projectYear, description, techStack, title, url, projectImages}) {
    const route = useRouter();

    const Bold = ({children}) => <b>{children}</b>;
    const Text = ({children}) => <p>{children}</p>;
    const Italic = ({children}) => <em>{children}</em>
    const Code = ({children}) => <code>{children}</code>

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
        <Head key='title'>
          <title>ThatGuyJK - Projects - {title ? title : null}</title>
        </Head>
        <article className='py-16 min-h-screen'>
          <section className='flex flex-row flex-wrap items-baseline justify-between mb-6'>
            <h1 className='font-roboto text-4xl md:text-5xl'>{title}</h1>
            <button type='button' className='font-nunito' onClick={() => route.push('/projects') }>
              Go Back
            </button>
          </section>

          <section className='grid gap-3 mb-8 md:grid-cols-2'>
            <div className='font-nunito'>
            {documentToReactComponents(description, options)}
            </div>

            <div className='grid auto-rows-auto gap-4 font-nunito md:border-l-2 md:border-l-black md:pl-3'>
              <div className='break-all'>
                <h6 className='underline underline-offset-4 text-xl font-bold'>Developed At</h6>
                <p className='text-lg'>{createdAt ? createdAt : null}&nbsp;{ projectYear ? '('+projectYear+')' : null}</p>
              </div>

              <div className='break-all'>
                <h6 className='underline underline-offset-4 text-xl font-bold'>Technology Used</h6>
                <ul>
                  {techStack && techStack.map((tech, id) => {
                    return <li key={id} className='text-sm font-semibold bg-carbon p-1 rounded-sm inline-block mr-2 mt-1'>{tech ? tech : null}</li>;
                  })}
                </ul>
              </div>

              <div className='break-all'>
                <h6 className='underline underline-offset-4 text-xl font-bold'>Project URL</h6>
                <a className="hover:text-red" href={url && url.includes("[offline]") ? '#' : url} target='_blank' rel='noreferrer'>
                  {url ? url : 'Not Available'}
                </a>
              </div>
            </div>
          </section>
          
          <section className='columns-1 md:columns-2 items-start'>
          {projectImages && projectImages.map((prjImg, imgId) => {
              return (
                <figure key={imgId} className="mb-4">
                  <img
                    src={"/" + prjImg.fields?.file.fileName}
                    alt={prjImg.fields?.title}
                    layout='intrinsic'
                    width={prjImg.fields?.file?.details?.image?.width}
                    height={prjImg.fields?.file?.details?.image?.height}
                    data-type="prjImage"
                    className='rounded'
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
        fallback: true,
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
      createdAt: portfolioItem[0].fields?.createdAt,
      projectYear: portfolioItem[0].fields?.projectYear,
      description: portfolioItem[0].fields?.description,
      techStack: portfolioItem[0].fields?.techStack,
      title: portfolioItem[0].fields?.title,
      url: portfolioItem[0].fields?.url,
      projectImages: portfolioItem[0].fields?.projectImages,
    },
  };
}