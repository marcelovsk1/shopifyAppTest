import { useEffect } from "react";
import { json } from "@remix-run/node";
import { useFetcher, Link } from "@remix-run/react";
import { Page, Text, Card, Button } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const color = ["Red", "Orange", "Yellow", "Green"][
    Math.floor(Math.random() * 4)
  ];
  const response = await admin.graphql(
    `mutation populateProduct($product: ProductCreateInput!) {
      productCreate(product: $product) {
        product { id, title, variants(first: 1) { edges { node { id, price } } } }
      }
    }`,
    { variables: { product: { title: `${color} Snowboard` } } }
  );

  const responseJson = await response.json();
  return json({ product: responseJson.data.productCreate.product });
};

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();
  const isLoading = ["loading", "submitting"].includes(fetcher.state);

  const generateProduct = () => fetcher.submit({}, { method: "POST" });

  useEffect(() => {
    if (fetcher.data?.product) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data, shopify]);

  return (
    <Page
      title="Home"
      primaryAction={
        <Link to="/cdn" prefetch="intent">
          <Button primary>CDN</Button>
        </Link>
      }
    >
      <Card sectioned>
        <p>Welcome to the home page!</p>
      </Card>
    </Page>
  );
};

