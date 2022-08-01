import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAllProjects } from "../../lib/api";

export default function Project({project}) {
    const [createdAt, setCreatedAt] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState([]);
    const [title, setTitle] = useState([]);
    const [url, setUrl] = useState("");
    const [projectImages, setImages] = useState([]);

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
        <h1>{title}</h1>
        <p>{createdAt}</p>
        <p>{description}</p>
        <ul>
          {techStack.map((tech, id) => {
            return <li key={id}>{tech}</li>;
          })}
        </ul>

        <a href={url} target='_blank' rel='noreferrer'>
          {url}
        </a>

        <ul>
          {projectImages.map((prjImg, imgId) => {
            return (
              <li key={imgId}>
                <Image
                  src={"/" + prjImg.fields?.file.fileName}
                  alt={prjImg.fields?.title}
                  layout='intrinsic'
                  width={prjImg.fields?.file?.details?.image?.width}
                  height={prjImg.fields?.file?.details?.image?.height}
                />
              </li>
            );
          })}
        </ul>
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