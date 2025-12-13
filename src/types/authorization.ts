type header = {
  title: string;
  text: string;
};

type link = {
  text: string;
  linkText: string;
  href: string;
};

export type AuthorizationProps = {
  header?: header;
  link?: link;
};
