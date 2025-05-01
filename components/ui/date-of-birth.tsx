"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, dateFormatter } from "@/lib/utils";
import { isAtLeastAge } from "@/lib/validationSchema/client";
import { useEffect, useState } from "react";

export interface DateOfBirthProps {
  onChange: (date: Date | null) => void;
  minYear?: number;
  maxYear?: number;
  defaultValue?: Date;
  className?: string;
  label?: string;
  required?: boolean;
  id?: string;
  error?: string;
}

export function DateOfBirth({
  onChange,
  minYear = new Date().getFullYear() - 120,
  maxYear = new Date().getFullYear(),
  defaultValue,
  className,
  label = "Date of Birth",
  required = false,
  id = "date-of-birth",
  error: externalError,
}: DateOfBirthProps) {
  const [day, setDay] = useState(
    defaultValue ? String(defaultValue.getDate()).padStart(2, "0") : ""
  );
  const [month, setMonth] = useState(
    defaultValue ? String(defaultValue.getMonth() + 1).padStart(2, "0") : ""
  );
  const [year, setYear] = useState(
    defaultValue ? String(defaultValue.getFullYear()) : ""
  );
  const [error, setError] = useState("");

  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) =>
    String(maxYear - i)
  );

  const getDaysInMonth = (m: number, y: number) => new Date(y, m, 0).getDate();

  const availableDays = () => {
    if (!month || !year) return days;
    const numMonth = parseInt(month, 10);
    const numYear = parseInt(year, 10);
    const count = getDaysInMonth(numMonth, numYear);
    return days.slice(0, count);
  };

  useEffect(() => {
    setError("");

    if (!day || !month || !year) {
      onChange(null);
      return;
    }

    const numDay = parseInt(day, 10);
    const numMonth = parseInt(month, 10);
    const numYear = parseInt(year, 10);
    const daysInMonth = getDaysInMonth(numMonth, numYear);

    if (numDay > daysInMonth) {
      setError(
        `Invalid date: ${
          months.find((m) => m.value === month)?.label
        } ${numYear} has only ${daysInMonth} days`
      );
      onChange(null);
      return;
    }

    const selectedDate = new Date(numYear, numMonth - 1, numDay);

    if (selectedDate > new Date()) {
      setError("Date cannot be in the future");
      onChange(null);
      return;
    }

    if (!isAtLeastAge(18)(selectedDate)) {
      setError("You must be at least 18 years old");
      onChange(null);
      return;
    }

    const formatted = dateFormatter.format(selectedDate).replace(/\//g, "-");

    onChange(selectedDate);
  }, [day, month, year]);

  return (
    <div className={cn("relative space-y-3", className)}>
      <div className="space-y-1">
        <Label htmlFor={id} className="text-base">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger id={`${id}-day`} aria-label="Day">
              <SelectValue placeholder="Day" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {availableDays().map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger id={`${id}-month`} aria-label="Month">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id={`${id}-year`} aria-label="Year">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="max-h-72">
              {years.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(error || externalError) && (
        <div className="absolute left-0 -bottom-3">
          <p className="text-sm text-destructive">{externalError || error}</p>
        </div>
      )}
    </div>
  );
}
