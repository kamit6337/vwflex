"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { useRouter } from "next/navigation";

const ChangeSeason = ({ season, showId, totalSeasons }) => {
  const router = useRouter();

  const handleSeasonSelect = (value) => {
    const createRoute = `/tv?id=${showId}&season=${value}`;
    router.push(createRoute);
  };

  return (
    <Select onValueChange={(value) => handleSeasonSelect(value)} className="">
      <SelectTrigger className="w-64 text-foreground">
        <SelectValue placeholder={`Season ${season}`} className="w-full" />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {Array.from({ length: totalSeasons }).map((_, i) => {
          return (
            <SelectItem key={i} value={i + 1}>
              Season {i + 1}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ChangeSeason;
