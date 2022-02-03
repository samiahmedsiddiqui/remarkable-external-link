import { Remarkable } from 'remarkable';

export default function remarkableExternalLink(md: Remarkable, options: configOptions): void;

export type configOptions = {
  hosts?: [];
  host?: string;
  target?: string;
  rel?: string;
  textExtOnly?: boolean;
  preOutside?: string;
  preInside?: string;
  postInside?: string;
  postOutside?: string;
};

export type defaultOptions = {
  rel: string;
  target: string;
};
