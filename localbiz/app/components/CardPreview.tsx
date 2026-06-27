"use client";

import { forwardRef } from "react";
import { CardInner } from "./CardInner";
import { CardData } from "./types";

export type { CardData };
export type { Template } from "./types";

interface Props {
  data: CardData;
}

const CardPreview = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  return (
    <div ref={ref} style={{ width: 1080, height: 1080 }}>
      <CardInner data={data} />
    </div>
  );
});

CardPreview.displayName = "CardPreview";
export default CardPreview;
