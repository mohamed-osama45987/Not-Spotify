import { getProviders, signIn } from "next-auth/react";

// @ts-ignore
function Login({ providers }) {
  return (
    <div
      className="flex flex-col items-center bg-black min-h-screen
     w-full justify-center text-center"
    >
      <img
        src="/images/logo.png"
        color="red"
        className="w-52 mb-5"
        alt="Logo"
      />

      {Object.values(providers).map((provider: any) => {
        return (
          <div
            className="bg-[#18D860] w-52 text-white p-5 rounded-full"
            key={provider.id}
          >
            <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
              Login with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
export default Login;
