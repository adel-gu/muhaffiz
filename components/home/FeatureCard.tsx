import { Card, CardContent } from '../ui/card';

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="border-border bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-colors shadow-sm">
      <CardContent className="flex flex-col gap-4">
        <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shrink-0 mb-2">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-card-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
};
export default FeatureCard;
