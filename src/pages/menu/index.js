import MenuPage from "@/components/template/MenuPage";
import { revalidatePath } from "next/cache";

function Menu({ data }) {
  return <MenuPage data={data} />;
}

export default Menu;

export async function getStaticProps() {
  const res = await fetch("http://localhost:4000/data");
  const data = await res.json();

  return {
    props: { data },
    revalidate: 10, //seconds
  };
}
