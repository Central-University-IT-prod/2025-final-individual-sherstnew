import { Layout } from "../components/Layout";
import { Link } from "react-router-dom";
import { Catalog } from '../components/Catalog';

export function Home() {
  return (
    <Layout>
      <Link
        to="/create_exercise"
        className="rounded-xl cursor-pointer p-5 py-3 bg-gray-200"
      >
        Создать упражнение
      </Link>
      <Catalog selectable={false} />
    </Layout>
  );
}
