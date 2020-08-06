import Link from "next/link";
import Layout from "../components/Layout";
// import { LoginComponent } from "../generated/apolloComponents";

const IndexPage = () => (
  <Layout title="Steven Hansel | Software Engineer">
    <div>
      <p>Hi, my name is</p>
      <h1>Steven Hansel</h1>
      <h2>Building software is my expertise</h2>
      <p>
        I'm a passionate software engineer based in Jakarta, Indonesia
        specializing in building softwares in varying platform such as website,
        mobile, and occasionally desktop.
      </p>
      <button>Get in Touch</button>
    </div>

    <div>
      <h3>About Me</h3>
      <div>
        <p>Hi! I'm Steven, a software engineer based in Jakarta, Indonesia.</p>
        <p>
          Building software applications always has been a huge part in my life,
          whether that be website, mobile applications, or even desktop
          applications, I'm passionate and enjoy building varying kind of
          software applications. My goal is to build a robust software that
          people can enjoy.
        </p>
        <p>
          Currently, I'm still a sophomore studying in <a>BINUS University</a>,
          majoring in <a>Computer Engineering</a>. On my free-time, i always do
          side-projects and keep up-to-date with the latest technologies and
          I've worked on a wide variety of interesting and fun projects.
        </p>
        <p>The technologies/tech stack that I've been working recently:</p>
        <ul>
          <li>
            <a>TypeScript</a>
          </li>
          <li>
            <a>React</a>
          </li>
          <li>
            <a>React Native</a>
          </li>
          <li>
            <a>GraphQL Apollo</a>
          </li>
          <li>
            <a>Node.js</a>
          </li>
          <li>
            <a>Express</a>
          </li>
          <li>
            <a>TypeGraphQL</a>
          </li>
          <li>
            <a>Python</a>
          </li>
          <li>
            <a>Flask</a>
          </li>
        </ul>
      </div>
      <div>
        <p>Profile picture goes here</p>
        <img />
      </div>
    </div>

    <div>
      <div>
        <div>background image of the portfolio project</div>
        <div>
          <h2>Portfolio</h2>
          <div>
            <p>
              A personal website to showcase all the projects that i've built
              and also to share my personal thoughts to the world through the
              mini-blog.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h1>Other projects that i've built</h1>
      <Link href="/projects">
        <a>Show all projects</a>
      </Link>
      <div />
    </div>

    <div>
      <h1>Get in Touch</h1>
      <p>
        Currently, I'm open for all opportunities and my inbox is always open to
        everyone! If you have any questions just hit the button below and I'll
        try my best to reply to you!
      </p>
      <button>Greet me</button>
    </div>
  </Layout>
);

export default IndexPage;
