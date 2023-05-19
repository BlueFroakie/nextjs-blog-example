import Layout from "../../components/layout";
import Head from "next/head"
import Date from "../../components/date";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../styles/utils.module.scss";

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <Layout home={false}>
      <Head>
        {/* I want to make all of these dynamic */}
        <title>{postData.title}</title>
        <meta
          name="description"
          content="Todas las actualizaciones sobre cerdos"
          key="desc"
        />
        <meta
          property="og:title"
          content="La dulcería del panzon la está rompiendo en Reynosa"
        />
        <meta
          property="og:description"
          content="Entra a nuestro blog y averigua las ultimas noticias sobre la tienda del panzon"
        />
        <meta
          property="og:image"
          content="https://example.com/images/cool-page.jpg"
        />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
