import { useState, useEffect } from 'react';
import { getAllProjects } from "../../lib/api";
import { trailingSlash } from '../../next.config';

export default function Project({project}) {
    const [createdAt, setCreatedAt] = useState("");
    const [description, setDescription] = useState("");
    const [techStack, setTechStack] = useState([]);
    const [title, setTitle] = useState([]);
    const [url, setUrl] = useState("");

    useEffect(() => {
      console.log("project", project);
      setCreatedAt(project.fields?.createdAt);
      setDescription(project.fields?.description);
      setTechStack(project.fields?.techStack);
      setTitle(project.fields?.title);
      setUrl(project.fields?.url);
    }, [project]);

    return (
        <>
            <h1>{title}</h1>
            <p>{createdAt}</p>
            <p>{description}</p>
            <ul>
            {techStack.map((tech, id) => {
                return (
                    <li key={id}>{tech}</li>
                )
            })}
            </ul>
            <p>{url}</p>
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