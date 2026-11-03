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
    title: "Software Engineering",
    icon: web,
  },
  {
    title: "AI Engineering",
    icon: mobile,
  },
  {
    title: "Security & Reliability",
    icon: backend,
  },
  {
    title: "Technical Leadership",
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
    title: "Performance Engineer",
    company_name: "Canva",
    icon: canvaLogo,
    iconBg: "#383E56",
    date: "January 2025 - Present",
    points: [
      "Led technical delivery of web pages and onboarding experiences, including reusable components, offline states, localisation, analytics and staged releases.",
      "Improved page startup, reducing the time to display designs from 5.4 seconds to 1.0 second.",
      "Improved analytics accuracy by reducing duplicated tracking identifiers from approximately 34% of measured page loads to under 1%.",
      "Built an AI-powered testing tool that checks software changes, investigates failures and helps generate code fixes.",
      "Led technical scoping for platform storage monitoring and coordinated dependencies across engineering, product and design teams.",
      "Remediated an application vulnerability with Application Security, authored offline privacy guidance, and led production incident responses and investigations.",
      "Onboarded engineers, supported mentoring and code reviews, and developed AI agent skills for bug triage and technical documentation.",
    ],
  },
  {
    title: "Software Engineer Intern",
    company_name: "Canva",
    icon: canvaLogo,
    iconBg: "#383E56",
    date: "December 2023 - February 2024",
    description: "Worked with Canva’s Offline team to build developer tooling for inspecting and testing service workers, browser caches and offline behaviour.",
    points: [
      "Built a Chrome extension using TypeScript, React and Vite, giving engineers visibility into service worker registration, cache contents and page-cache behaviour.",
      "Implemented communication between the webpage, service worker and extension through content scripts and shared message types.",
      "Used RxJS to visualise page-cache events, helping engineers understand asynchronous behaviour and investigate offline issues.",
      "Added controls for testing service worker updates, including triggering activation of a waiting worker.",
      "Delivered more than 20 merged pull requests, incorporating feedback through code review and collaborating with the team on debugging and testing workflows.",
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
    date: "June 2022 - January 2025",
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
    date: "January 2022 - June 2026",
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
    last_updated: "2024-03-20T00:58:12Z",
    latest_commit_link: "https://github.com/AzharH1/AzSecurity/commit/cdef8fccfceee5d7c7026f2baea25eb5f5a00be4",
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
    last_updated: "2023-04-12T16:05:57Z",
    latest_commit_link: "https://github.com/AzharH1/AppleWebsite/commit/5f8e0e5bdf5d67dc112f5c00c25fb4476e016524",
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
    last_updated: "2023-04-07T15:01:55Z",
    latest_commit_link: "https://github.com/AzharH1/Twitter-Clone/commit/ed1a2f6f5bb7083fc71920b9467742d92703c937",
  },
];

export { services, technologies, experiences, testimonials, projects };
