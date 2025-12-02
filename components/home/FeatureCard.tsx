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
    <Card className="border-border/50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-slate-900/80 transition-colors shadow-sm">
      <CardContent className="flex flex-col gap-4">
        <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 mb-2">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
export default FeatureCard;
