'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface SelectOption {
  value: string;
  label: string;
  subLabel?: string;
  meta?: string;
}

interface SelectElementProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
}

export function SelectElement({
  id,
  label,
  placeholder = 'Select an option',
  value,
  onChange,
  options,
}: SelectElementProps) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      <Label htmlFor="surah" className="text-base font-medium text-slate-700">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="focus:ring-primary/50 w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className='flex items-center'>
                <div className='space-x-1'>
                  <span className="font-medium text-foreground">{option.label}</span>
              {option.subLabel && (
                <span className="text-xs text-muted-foreground">({option.subLabel})</span>
              )}
                </div>
                {option.meta && (
                  <span className="font-serif text-lg text-primary/80 pl-2">
                    {option.meta}
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
