import projects from '$lib/data/projects.json';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';


export const load: PageLoad = () => {
  const last5Projects = Object.entries(projects).slice(-5).reverse();
  
  const mapped = last5Projects.map(([slug, p]) => ({
    title: p.title,
    category: p.category,
    slug,
    mainImage: p.mainImage
  }));
  console.log(mapped);
  return { mapped };
};