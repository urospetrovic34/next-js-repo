import "/styles/globals.css";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useRef } from "react";
import type { AppProps } from "next/app";

import Layout from "src/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = useRef(new QueryClient());

    return (
        <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Hydrate>
        </QueryClientProvider>
    );
}
