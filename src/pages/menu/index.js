import MenuPage from "@/components/template/MenuPage";

function Menu({ data }) {
  return <MenuPage data={data} />;
}

export default Menu;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/data");
  const data = await res.json();

  return {
    props: { data },
    revalidate: 60 * 60, //seconds
  };
}
