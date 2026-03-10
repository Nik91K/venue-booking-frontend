import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import type React from 'react';

type CardComponentProps = {
  title: string;
  subTitle: string;
  children: React.ReactNode;
};

const CardComponent = ({ title, subTitle, children }: CardComponentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{subTitle}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-6">{children}</CardContent>
    </Card>
  );
};

export default CardComponent;
