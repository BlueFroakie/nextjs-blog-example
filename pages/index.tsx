import { useState } from "react";
import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import Modal from "../components/modal";
import utilStyles from "../styles/utils.module.scss";
import Link from "next/link";
import Date from "../components/date";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({allPostsData}) {
  const [showModal, setShowModal] = useState(false)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>ExperimentOs</p>
      </section>

      {/* <button onClick={() => {setShowModal(true)}}> Show modal </button> */}
      <Modal onClose={() => setShowModal(false)} show={showModal} title="Put your modal title here">
        Eliwood
      </ Modal>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
