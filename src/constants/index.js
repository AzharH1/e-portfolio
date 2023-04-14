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
  frontend,
  applestore,
  discord,
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
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Cloud Engineer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
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
    title: "Frontend Developer Internship ",
    company_name: "Frontend Simplified",
    icon: frontend,
    iconBg: "#383E56",
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
    title: "Fruit & Veg Team Member",
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

  // {
  //   title: "Full stack Developer",
  //   company_name: "Meta",
  //   icon: meta,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
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
    name: "Discord Clone",
    description:
      "Developed a real-time communication platform inspired by Discord, offering text chat capabilities, server and channel management in a user-friendly interface, leveraging react, redux and JavaScript.",
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
        name: "TailWindCSS",
        color: "pink-text-gradient",
      },
    ],
    image: discord,
    source_code_link: "https://github.com/AzharH1/DiscordClone",
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
