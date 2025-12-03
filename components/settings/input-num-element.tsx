'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InputNumElementProps {
  id: string;
  label: string;
  value: number;
  onValueChange: (val: number) => void;
}

export function InputNumElement({ id, label, value, onValueChange }: InputNumElementProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="start-ayah" className="text-base font-medium">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        min="1"
        placeholder="1"
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
        className="focus-visible:ring-primary/50 w-20"
      />
    </div>
  );
}
