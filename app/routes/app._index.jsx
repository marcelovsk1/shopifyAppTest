import { useEffect } from "react";
import { useFetcher, Link } from "@remix-run/react";
import { Page, Card, Button, DataTable, Text } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";

export default function Index() {
  const fetcher = useFetcher();
  const shopify = useAppBridge();

  useEffect(() => {
    if (fetcher.data?.product) {
      shopify.toast.show("Product created");
    }
  }, [fetcher.data, shopify]);

  // Dados hardcoded para teste
  const refunds = [
    { id: "12345", customerName: "Alice", items: ["Item A", "Item B"] },
    { id: "67890", customerName: "Bob", items: ["Item C", "Item D"] },
    { id: "11223", customerName: "Charlie", items: ["Item E"] },
    { id: "44556", customerName: "Daisy", items: ["Item F"] },
    { id: "77889", customerName: "Edward", items: ["Item G"] },
    { id: "99001", customerName: "Fiona", items: ["Item H", "Item I"] },
    { id: "22334", customerName: "George", items: ["Item J"] },
    { id: "55667", customerName: "Hannah", items: ["Item K", "Item L"] },
  ];

  return (
    <Page
      title="Refund Dashboard"
      primaryAction={
        <Link to="/cdn" prefetch="intent">
          <Button primary>CDN</Button>
        </Link>
      }
    >
      <Card title="Refunds" sectioned>
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <DataTable
            columnContentTypes={["text", "text", "text"]}
            headings={["Order ID", "Customer Name", "Refunded Items"]}
            rows={refunds.map((refund) => [
              refund.id,
              refund.customerName,
              refund.items.join(", "),
            ])}
          />
        </div>
      </Card>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Button primary onClick={() => console.log("Refund All clicked")}>Refund All</Button>
      </div>
    </Page>
  );
}
