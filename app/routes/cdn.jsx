import {
    BlockStack, 
    Button,
    Card,
    InlineStack,
    InlineGrid,
    Layout,
    Page,
    Text,
    Box
} from "@shopify/polaris";
import { useNavigate } from "@remix-run/react";

const CDNPage = () => {
    const navigate = useNavigate(); 

    return (
        <Page 
            title="CDN" 
            primaryAction={{
                content: "Products",
                onAction: () => {
                    window.open("shopify://admin/products", "_blank");
                },
            }}
            backAction={{
                content: "Back",
                onAction: () => {
                    navigate("/app"); 
                },
            }}
        >
            <Layout>
                <Layout.Section>
                    <Card>
                        <BlockStack gap="200"> 
                             {/* { TOP Content } */}
                             <Box background="bg" padding="200" borderRadius="200">
                             <InlineGrid 
                             columns={{xs: 1, md: ["twoThirds", "oneThird"]}}>
                                {/* { LEFT Content } */}
                                <BlockStack gap="100">
                                    <Text variant="headingMd">Discover more of Shopify</Text>
                                    <Text>Browse features, apps, and sales channels to grow your business</Text>
                                    <InlineStack align="start">
                                    <Button>Explore now</Button>
                                    </InlineStack>
                                </BlockStack>
                                {/* { RIGHT Content } */}
                                <InlineStack align="end">
                                <img src="https://cdn.shopify.com/b/shopify-guidance-dashboard-public/gmpjlo09agcnc4royqt3yqaab6ef.png" 
                                style={{ maxWidth: "180px"}} alt="Shopify guidance dashboard" />
                              </InlineStack>
                             </InlineGrid>
                             </Box>
                             {/* { BOTTOM Content } */}
                             <InlineGrid columns={{ xs: 1, md: 3}} gap="200">
                                <BoxComponent
                                    title="Drive traffic"
                                    description="Use Shopify’s built-in SEO and blogging tools to drive traffic to your store."
                                />
                                <BoxComponent
                                    title="Improve conversion"
                                    description="Discover how to create a beautiful online store and improve your conversion rate."
                                />
                                <BoxComponent
                                    title="Increase order value"
                                    description="Learn how to increase your average order value and make more money."
                                />
                             </InlineGrid>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default CDNPage;

const BoxComponent = (props) => {
    return (
        <>
        <Box background="bg" padding="200" borderRadius="200">
            <Text variant="headingMd">{props.title}</Text>
            <Text>{props.description}</Text>
        </Box>
        </>
    );
};