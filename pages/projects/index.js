import { useEffect } from 'react';
import Link from 'next/link';
import { getAllProjects } from '../../lib/api';

function Projects({projects}) {
    useEffect(() => {
        console.log(projects);
    }, [projects]);

    return (
        <>
        <h1>Projects</h1>
        <ul>
            {
                projects && projects.map((project, index) => {
                    return (
                      <li key={index}>
                        <Link href={`/projects/${project.fields.slug}`}>
                          {project.fields.title}
                        </Link>
                      </li>
                    );
                })
            }
        </ul>
        </>
    );
}

export async function getStaticProps() {
    const allProjects = await getAllProjects();
    
    allProjects.items.forEach(project => {
        delete project['sys'];
        delete project['metadata'];
    });

    return {
        props: {
            projects: allProjects.items,
        },
    }
}

export default Projects;