import styled from "vue3-styled-components";

const props = { bestRevenue: Boolean, isTotal: Boolean };

export const ItemContent = styled("div", props)`
  background-color: ${({ bestRevenue, isTotal }) =>
    isTotal ? "#f2f2f2" : bestRevenue ? "#0175ff" : "transparent"};
  border-radius: 5px;
  color: ${({ bestRevenue }) => (bestRevenue ? "#fff" : "initial")};
  display: flex;
  font-weight: ${({ bestRevenue }) => (bestRevenue ? "bolder" : "normal")};
  padding: 5px 7px;
`;
