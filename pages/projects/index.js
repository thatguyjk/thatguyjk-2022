import {useEffect } from 'react';
import { getAllProjects } from '../../lib/api';

function Projects({projects}) {

    useEffect(() => {
        console.log('projects:', projects);
    }, [projects]);

    return (
        <>
        <h1>Projects</h1>
        {/* <ul>
            {
                project.map((project, projectKey) => {
                    return (
                        <li key={projectKey}>
                            {project.fields.title}
                        </li>
                    );
                })
            }
        </ul> */}
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