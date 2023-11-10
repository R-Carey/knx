import { type GetServerSideProps } from "next";
import { getProviders, signIn } from "next-auth/react";

// Define a custom interface for a provider
interface AuthProvider {
  id: string;
  name: string;
  type: string;
  // Add other fields as per your requirement
}

// Update your SignIn component to use the custom interface
const SignIn = ({ providers }: { providers: Record<string, AuthProvider> }) => {
  return (
    <>
      <h1>Sign In</h1>
      <div>
        {Object.values(providers).map((provider) => (
          <button
            key={provider.id}
            onClick={() => signIn(provider.id, { callbackUrl: `${window.location.origin}` })}
          >
            Sign in with {provider.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};
