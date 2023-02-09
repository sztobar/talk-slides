interface CartItem {}
interface CartItemGroup {}
declare function sumShippingCosts(items: CartItem[]): number;
declare function sumShippingCostsForGroups(itemsGroups: CartItemGroup[]): number;

interface CartProps {
  items?: CartItem[];
  itemsGroups?: CartItemGroup[];
}

interface CartWithItemsProps {
  items: CartItem[];
}
const hasItems = (props: CartProps): props is CartWithItemsProps => !!props.items;

interface CartWithItemsGroupsProps {
  itemsGroups: CartItemGroup[];
}
const hasItemsGroups = (props: CartProps): props is CartWithItemsGroupsProps => !!props.itemsGroups;

function getShippingCostSum(props: CartProps) {
  if (hasItems(props)) {
    return sumShippingCosts(props.items);
  } else if (hasItemsGroups(props)) {
    return sumShippingCostsForGroups(props.itemsGroups);
  }
}