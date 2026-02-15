import groq from "groq";

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

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && defined(slug.current)] { "slug": slug.current }
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
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink
  }
`;

// ============ ETAPAS DE ENSINO (HOME) ============
export const educationalStagesSectionQuery = groq`
  *[_type == "educationalStagesSection"][0] {
    _id,
    eyebrow,
    title,
    background,
    "backgroundUrl": background.asset->url,
    stages[] {
      name,
      image,
      "imageUrl": image.asset->url
    }
  }
`;

// ============ SEÇÃO DE CONTATO ============
export const contactSectionQuery = groq`
  *[_type == "contactSection"][0] {
    _id,
    background,
    "backgroundUrl": background.asset->url,
    manImage,
    "manImageUrl": manImage.asset->url
  }
`;

// ============ SEÇÃO ESPORTES (HOME) ============
export const sportsSectionQuery = groq`
  *[_type == "sportsSection"][0] {
    _id,
    background,
    "backgroundUrl": background.asset->url,
    athletesImage,
    "athletesImageUrl": athletesImage.asset->url,
    eyebrow,
    title,
    description,
    buttonText,
    buttonLink
  }
`;

// ============ SEÇÃO TESTEMUNHOS ============
export const testimonialsSectionQuery = groq`
  *[_type == "testimonialsSection"][0] {
    _id,
    background,
    "backgroundUrl": background.asset->url,
    womanImage,
    "womanImageUrl": womanImage.asset->url,
    eyebrow,
    title,
    testimonials[] {
      text,
      author,
      role,
      avatar
    }
  }
`;// ============ PÁGINA NOSSO GRUPO ============
export const nossoGrupoPageQuery = groq`
  *[_type == "nossoGrupoPage"][0] {
    _id,
    hero {
      backgroundImage,
      "backgroundImageUrl": backgroundImage.asset->url,
      eyebrow,
      title
    },
    historySection {
      eyebrow,
      title,
      content,
      timeline,
      sideImage,
      "sideImageUrl": sideImage.asset->url
    },
    valuesSection {
      backgroundImage,
      "backgroundImageUrl": backgroundImage.asset->url,
      contentImage,
      "contentImageUrl": contentImage.asset->url
    }
  }
`;// ============ PÁGINA ENSINO ============
export const ensinoPageQuery = groq`
  *[_type == "ensinoPage"][0] {
    _id,
    hero {
      backgroundImage,
      "backgroundImageUrl": backgroundImage.asset->url,
      eyebrow,
      title
    },
    stages[] {
      name,
      selectorImage,
      "selectorImageUrl": selectorImage.asset->url,
      title,
      subtitle,
      image,
      "imageUrl": image.asset->url,
      background,
      "backgroundUrl": background.asset->url,
      description,
      highlights,
      section1 {
        title,
        description,
        image,
        "imageUrl": image.asset->url
      },
      section2 {
        title,
        description,
        image,
        "imageUrl": image.asset->url
      }
    }
  }
`;