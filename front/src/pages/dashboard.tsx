import CardList from "@/components/contacts";
import Header from "@/components/header";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import nookies from "nookies";

interface IUserName {
  name: string;
}

const Dashboard = ({ name }: IUserName) => {
  return (
    <>
      <Header name={name} isLogged />
      <CardList />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  console.log(cookies);
  const session = await getSession(ctx);

  if (!cookies["phonetools.token"] && !session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      name: cookies["phonetools.user"] || session?.user?.name,
    },
  };
};

export default Dashboard;
