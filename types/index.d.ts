import { Remarkable } from 'remarkable';

export default function remarkableExternalLink(md: Remarkable, options: configOptions): void;

export type configOptions = {
  hosts?: [];
  host?: string;
  target?: string;
  rel?: string;
  externalOnly?: boolean;
  beforeLink?: string;
  beforeLinkText?: string;
  afterLinkText?: string;
  afterLink?: string;
};

export type defaultOptions = {
  rel: string;
  target: string;
};
