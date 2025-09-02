import projects from '$lib/data/projects.json';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load: PageLoad = ({ params }) => {
  const project = projects[params.slug as "deprem-simulasyon-tiri"];
  if (!project) {
    throw error(404, 'Project not found');
  }
  const relatedProjects = project.relatedProjects.map(slug => {
    const p = projects[slug as "deprem-simulasyon-tiri"];
    return {
      title: p.title,
      description: p.description,
      slug: slug,
      mainImage: p.mainImage,
      category: p.category,
      tags: p.tags
    }
  }
  );
  return { project, relatedProjects };
};