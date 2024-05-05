import DetailsPage from "@/components/template/DetailsPage";

import { useRouter } from "next/router";

function Details({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    <h3>Loading ...</h3>;
  }

  return <DetailsPage {...data} />;
}

export default Details;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:4000/data");
  const json = await res.json();
  const data = json.slice(0, 10);

  const paths = data.map((food) => ({
    params: { id: food.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  try {
    const { params } = context;

    const res = await fetch(`http://localhost:4000/data/${params.id}`);
    const data = await res.json();

    if (!data)
      return {
        notFound: true,
      };

    return {
      props: { data },
      revalidate: 60 * 60, //second
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
