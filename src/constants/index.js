import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  WoolworthsD,
  jbhifi,
  frontendSimplified,
  canvaLogo,
  applestore,
  discord,
  fullStack,
  twitter,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Engineer",
    icon: web,
  },
  {
    title: "Cloud Engineer",
    icon: mobile,
  },
  {
    title: "Backend Engineer",
    icon: backend,
  },
  {
    title: "Solutions Architect",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Software Engineer Internship",
    company_name: "Canva",
    icon: canvaLogo,
    iconBg: "#383E56",
    date: "December 2023 - February 2024",
    points: [
      "Developed tools to investigate optimisation techniques to boost service worker operation, leading to enhanced performance and user experience",
      "Provided better user experience by effectively redirecting requests to the cache or backend through the interception of network proxy requests by service workers",
      "Leveraged RxJS for asynchronous programming, particularly for coordinating and managing events from service workers and the browser",
      "Utilised React to create Chrome extensions and overlays for providing critical utilities and information to internal teams",
      "Identified limitations and challenges in service worker management within the extension and created strategies to mitigate restrictions and enable functionality expansion in future iterations",
    ],
  },
  {
    title: "Frontend Engineer Internship ",
    company_name: "Frontend Simplified",
    icon: frontendSimplified,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - April 2023",
    points: [
      "Transformed a completely static HTML, CSS, JavaScript and React single page application into an interactive user interface using animations, transitions and carousels",
      "Processed API requests with Axios to dynamically represent data from a cloud server and represented it through skeleton loading states, pagination and dynamic routing.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Utilized Git version control and the GitHub interface to work and thrive in a virtual and collaborative team environment",
    ],
  },
  {
    title: "Merchandising Team Member",
    company_name: "JB HI-FI",
    icon: jbhifi,
    iconBg: "#E6DEDD",
    date: "Jan 2022 - Present",
    points: [
      "Communicating with customers and recommending relevant IT solutions.",
      "Responded to customer requests and direct them to relevant departments both on and off prem.",
      "Directly instigated the transfer of high value products to clients.",
      "Cleverly positioned products to enable customer procurement.",
    ],
  },
  {
    title: "Store Team Member",
    company_name: "Woolworths",
    icon: WoolworthsD,
    iconBg: "#383E56",
    date: "Jan 2022 - Present",
    points: [
      "Coordinated restocking of sales floor with current merchandise and accurate signage for current promotions.",
      "Approached browsing customers to initiate conversations to determine buying preferences.",
      "Circulated assigned areas of sales floor to identify customer service opportunities and coordinate display maintenance.",
      "Approached each problem with analytical strategies to quickly resolve concerns.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Azhar proved me wrong.",
    name: "Mom",
    designation: "CFO",
    company: "Moms Company",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Azhar does.",
    name: "Chris Brown",
    designation: "COO",
    company: "His Company",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Azhar optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "My aunty",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "FullStack JWT ",
    description:
      "Developed a full-stack application emulating a secure, dynamic user experience, incorporating Spring Boot for robust backend services, and Next.js with TypeScript for a responsive frontend. Integrated JWTs for authentication, PostgreSQL for data persistence, and Docker for seamless deployment and scalability, crafting a comprehensive and reliable system architecture.",
    tags: [
      {
        name: "NextJS",
        color: "blue-text-gradient",
      },
      {
        name: "SpringBoot",
        color: "green-text-gradient",
      },
      {
        name: "Docker",
        color: "pink-text-gradient",
      },
      {
        name: "PostgresQl",
        color: "orange-text-gradient",
      },
    ],
    image: fullStack,
    source_code_link: "https://github.com/AzharH1/AzSecurity",
  },
  {
    name: "Apple Store",
    description:
      "Created an e-commerce platform mirroring the Apple Store experience, showcasing product catalogues using Sanity, shopping cart functionality, and a secure checkout process using Stripe. Implemented responsive design and smooth navigation, utilizing React, Tailwind and Typescript to create an intuitively appealing experience.",
    tags: [
      {
        name: "NextJs",
        color: "blue-text-gradient",
      },
      {
        name: "Stripe",
        color: "green-text-gradient",
      },
      {
        name: "Redux",
        color: "pink-text-gradient",
      },
    ],
    image: applestore,
    source_code_link: "https://github.com/AzharH1/AppleWebsite",
  },
  {
    name: "Twitter Clone",
    description:
      "Created a microblogging platform replicating core Twitter features such as tweet composition, retweeting, commenting, following, authentication through the integration with firebase, redux, react and typescript.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
      {
        name: "TypeScipt",
        color: "pink-text-gradient",
      },
    ],
    image: twitter,
    source_code_link: "https://github.com/AzharH1/Twitter-Clone",
  },
];

export { services, technologies, experiences, testimonials, projects };
