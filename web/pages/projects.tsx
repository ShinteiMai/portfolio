import Layout from "../components/Layout";

const Projects = () => {
  return (
    <Layout>
      <div>
        <h1>Projects</h1>
        <p>All the projects that I've built</p>
      </div>

      <div>
        <table>
          <thead>
            <tr>
              <td>Time</td>
              <td>Title</td>
              <td>Tech Stacks</td>
              <td>Link</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>August, 2020</td>
              <td>Portfolio</td>
              <td>
                <ul>
                  <li>Next.js</li>
                  <li>TypeGraphQL</li>
                  <li>Styled Components</li>
                </ul>
              </td>
              <td>
                <ul>
                  <li>
                    <a href="https://github.com">github</a>
                  </li>
                  <li>
                    <a href="https://stevenhansel.com">external</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Projects;
