/*
 * Copyright (c) 2019, Digital Asset (Switzerland) GmbH and/or its affiliates. All rights reserved.
 */
import { DamlLfValue } from '@da/ui-core';

export const version = {
    schema: 'navigator-config',
    major: 2,
    minor: 0
};

// --- Creating views --------------------------------------------------------------------

const sellerRelationshipView = createTab("Seller Relationships", ":BuyerSellerRelationship@", [
    createIdCol(),
    createCol("seller", "Seller"),
    createCol("buyerAddress", "Buyer Address")
]);

const quoteRequestView = createTab("Quote Requests", ":QuoteRequest@", [
    createIdCol(),
    createCol("buyer"),
    createCol("seller"),
    createCol("products", "Products", 80, r => r.products.map(p => p.quantity + " " + p.productName).join(', '))
])

const quoteRequestAccepted = createTab("Accepted Quote Request", ":QuoteRequestAccepted@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("seller"),
    createCol("products", "Products", 80, r => r.products.map(p => p.quantity + " " + p.productName).join(', '))
])

const quoteRequestSupplyInvitation = createTab("Supply Invitation", ":QuoteRequestSupplyInvitation@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("products", "Products", 80, r => r.products.map(p => p.quantity + " " + p.productName).join(', '))
])

const supplyRequestView = createTab("Supply Request", ":SupplyRequest@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("products", "Products", 80, r => r.products.map(p => p.quantity + " " + p.productName).join(', '))
])

const inventoryView = createTab("Inventory", ":InventoryItem@", [
    createIdCol(),
    createCol("warehouse"),
    createCol("productName"),
    createCol("quantity"),
    createCol("unitPrice")
])

const inventoryQuoteRequestView = createTab("Inventory Quote Reqest", ":InventoryQuoteRequest@", [
    createCol("workflowId"),
    createCol("warehouse"),
    createCol("supplier"),
    createCol("productName", "Product Name", 80, r => r.product.productName),
    createCol("quantity", "Quantity", 80, r => r.product.quantity),
    createCol("deliveryFrom", "Delivery From", 40, r => r.product.deliveryFrom),
    createCol("deliveryTo", "Delvery To", 40, r => r.product.deliveryTo)
])

const transportQuoteRequestView = createTab("Transport Quote Request", ":TransportQuoteRequest@", [
    createCol("workflowId"),
    createCol("supplier"),
    createCol("transportCompany"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("productName", "Product Name", 80, r => r.item.allocation.productName),
    createCol("quantity", "Quantity", 80, r => r.item.allocation.quantity),
    createCol("warehouse", "Warehouse", 80, r => r.item.allocation.warehouse),
    createCol("deliveryFrom", "Delivery From", 40, r => r.item.deliveryFrom),
    createCol("deliveryTo", "Delvery To", 40, r => r.item.deliveryTo)
])

const transportQuoteRequestPendingView = createTab("Pending Quote Request", ":TransportQuoteRequestPending@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("products", "Products", 80, r => r.products.map(p => p.quantity + " " + p.productName).join(', '))
])

const lockedInventoryItemView = createTab("Locked Inventory", ":LockedInventoryItem@", [
    createCol("workflowId"),
    createCol("warehouse"),
    createCol("supplier"),
    createCol("productName"),
    createCol("quantity"),
    createCol("unitPrice")
])

const lockedTransportCapacityView = createTab("Locked Transport Capacity", ":LockedTransportCapacity@", [
    createCol("workflowId"),
    createCol("supplier"),
    createCol("productName", "Product Name", 80, r => r.item.productName),
    createCol("quantity", "Quantity", 80, r => r.item.quantity),
    createCol("warehouse", "Warehouse", 80, r => r.item.warehouse),
    createCol("deliveryDate"),
])

const aggregatedQuotePendingView = createTab("Aggregated Pending Quote", ":AggregatedQuotePending@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("items", "Items", 80, r => r.items.length + " items"),
])

const aggregatedQuoteView = createTab("Aggregated Quote", ":AggregatedQuote@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("items", "Items", 80, r => r.items.length + " items"),
])

const quoteView = createTab("Quote", ":Quote@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("totalPrice"),
    createCol("items", "Items", 80, r => r.items.length + " items"),
])

const orderView = createTab("Order", ":Order@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("seller"),
])

const deliveryInstructionView = createTab("Delivery Instruction", ":DeliveryInstruction@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("productName"),
    createCol("warehouse"),
    createCol("quantity"),
    createCol("pickUpDate"),
    createCol("deliveryDate")
])

const pickUpRequestView = createTab("Pickup Request", ":PickUpRequest@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("productName"),
    createCol("warehouse"),
    createCol("quantity"),
    createCol("deliveryDate")
])

const deliveryView = createTab("Delivery", ":Delivery@", [
    createCol("workflowId"),
    createCol("buyer"),
    createCol("buyerAddress"),
    createCol("seller"),
    createCol("productName"),
    createCol("warehouse"),
    createCol("quantity"),
])

const deliveryPaymentView = createTab("Delivery Payment", ":DeliveryPayment@", [
    createCol("workflowId"),
    createCol("seller"),
    createCol("supplier"),
])

const deliverySupplierPaymentView = createTab("Supplier Payment", ":DeliverySupplierPayment@", [
    createCol("workflowId"),
    createCol("supplier"),
    createCol("transportCompany"),
])

const paymentObligationView = createTab("Payment Obligation", ":PaymentObligation@", [
    createCol("payer"),
    createCol("payee"),
    createCol("price")
])

// --- Assigning vievs to parties --------------------------------------------------------------------

export const customViews = (userId, party, role) => {
    if (party == 'Buyer') {
        return {
            sellerRelationshipView,
            quoteRequestView,
            quoteView,
            orderView,
            deliveryView,
            paymentObligationView,
        };
    } else if (party == 'Seller') {
        return {
            quoteRequestView,
            quoteRequestAccepted,
            aggregatedQuoteView,
            quoteView,
            orderView,
            paymentObligationView,
        }
    } else if (party == 'Supplier') {
        return {
            inventoryView,
            lockedInventoryItemView,
            quoteRequestSupplyInvitation,
            supplyRequestView,
            transportQuoteRequestPendingView,
            aggregatedQuotePendingView,
            deliveryPaymentView,
            deliverySupplierPaymentView,
            paymentObligationView,
        }
    } else if (party == "Warehouse1" || party == "Warehouse2") {
        return {
            inventoryView,
            lockedInventoryItemView,
            inventoryQuoteRequestView,
            pickUpRequestView,
            paymentObligationView,
        }
    } else if (party == "TransportCompany1" || party == "TransportCompany2") {
        return {
            transportQuoteRequestView,
            lockedTransportCapacityView,
            deliveryInstructionView,
            paymentObligationView,
        }
    } else {
        return {
        };
    }
}

// --- Helpers --------------------------------------------------------------------

/**
 title, width and proj are optional
 if proj is null and key is "id" then it will default to the contract id
 if proj is null and key is not "id" then it will default to stringified single or array value of rowData.key
*/
function createCol(key, title = toTitle(key), width = 80, proj) {
    return {
        key: key,
        title: title,
        createCell: ({ rowData }) => ({
            type: "text",
            value: valueFunction(rowData, key, proj)
        }),
        sortable: true,
        width: width,
        weight: 0,
        alignment: "left"
    };
}

function createIdCol() {
    return createCol("id", "Contract ID", 60);
}

function createTab(name, templateId, columns, additionalFilter) {
    var filter;
    if (additionalFilter == null) {
        filter =
        [
            {
                field: "template.id",
                value: templateId
            }
        ]
    } else {
        filter =
        [
            {
                field: "template.id",
                value: templateId
            },
            additionalFilter
        ]
    }
    return {
        type: "table-view",
        title: name,
        source: {
            type: "contracts",
            filter: filter,
            search: "",
            sort: [
                {
                    field: "id",
                    direction: "ASCENDING"
                }
            ]
        },
        columns: columns
    };
}


function formatIfNum(val) {
    var n = Number(val);
    if (Number.isNaN(n)) return val;
    else return n.toLocaleString();
}

function valueFunction(rowData, key, proj) {
    return (
        proj == null
        ?
        (
            Array.isArray(DamlLfValue.toJSON(rowData.argument)[key])
            ?
            DamlLfValue.toJSON(rowData.argument)[key].join(", ")
            :
            (
                key == "id"
                ?
                rowData.id
                :
                formatIfNum(DamlLfValue.toJSON(rowData.argument)[key])
            )
        )
        :
        formatIfNum(proj(DamlLfValue.toJSON(rowData.argument))));
}

// inserts spaces into the usually camel-case key
// e.g. "assetISINCode" -> "Asset ISIN Code"
function toTitle(key) {
    var spaced = key.replace(/([^A-Z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][^A-Z])/g, '$1 $2');
    return spaced[0].toUpperCase() + spaced.substr(1)
}
