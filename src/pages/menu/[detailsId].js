import { useRouter } from "next/router";

import DetailsPage from "@/components/template/DetailsPage";

function Details({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h3>Loading ...</h3>;
  }

  return <DetailsPage {...data} />;
}

export default Details;

export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const json = await res.json();
  const data = json.slice(0, 10);

  const paths = data.map((food) => ({
    params: { detailsId: food.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const {
    params: { detailsId },
  } = context;

  const res = await fetch(`${process.env.BASE_URL}/data/${detailsId}`);

  const data = await res.json();

  if (!data.id)
    return {
      notFound: true,
    };

  return {
    props: { data },
    revalidate: +process.env.REVALIDATE, //second
  };
}
