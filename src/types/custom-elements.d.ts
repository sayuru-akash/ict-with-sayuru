import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "tgs-player": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          autoplay?: boolean;
          loop?: boolean;
          mode?: string;
          src?: string;
        },
        HTMLElement
      >;
    }
  }
}
