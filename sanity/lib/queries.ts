import { groq } from "next-sanity";

// ============ DOCUMENTOS ============
export const documentsQuery = groq`
  *[_type == "siteDocument"] | order(order asc) {
    _id,
    title,
    description,
    "fileUrl": file.asset->url
  }
`;

// ============ VAGAS DE EMPREGO ============
export const jobVacanciesQuery = groq`
  *[_type == "jobVacancy" && isActive == true] | order(publishedAt desc) {
    _id,
    title,
    location,
    type,
    description,
    requirements,
    publishedAt
  }
`;

export const jobVacancyByIdQuery = groq`
  *[_type == "jobVacancy" && _id == $id][0] {
    _id,
    title,
    location,
    type,
    description,
    requirements,
    publishedAt
  }
`;

// ============ BLOG POSTS ============
export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "author": author->name,
    "authorImage": author->image,
    mainImage,
    "categories": categories[]->title,
    tags,
    publishedAt,
    excerpt
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    "author": author->name,
    "authorImage": author->image,
    mainImage,
    "categories": categories[]->title,
    tags,
    publishedAt,
    excerpt,
    body
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    "author": author->name,
    mainImage
  }
`;

export const blogPostsByCategorySlugQuery = groq`
  *[_type == "blogPost" && references(*[_type == "category" && slug.current == $categorySlug][0]._id)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "author": author->name,
    "authorImage": author->image,
    mainImage,
    "imageUrl": mainImage.asset->url,
    "categories": categories[]->title,
    publishedAt,
    excerpt
  }
`;

// ============ CATEGORIAS ============
export const categoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    slug,
    "count": count(*[_type == "blogPost" && references(^._id)])
  }
`;

// ============ AUTORES ============
export const authorsQuery = groq`
  *[_type == "author"] {
    _id,
    name,
    image,
    bio
  }
`;

// ============ HERO CARROSSEL ============
export const heroSlidesQuery = groq`
  *[_type == "heroSlide"] | order(order asc) {
    _id,
    image,
    "imageUrl": image.asset->url,
    alt,
    title,
    titleHighlight,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink
  }
`;

