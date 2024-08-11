import { formatDateWithoutMonth } from "@/utils/formatUtils";
import Link from "next/link";

interface ToggleEntryProps {
    date: string;
    journalId: string;
    journal?: Journal;
}

interface Journal {
    _id: string;
    title?: string;
    emoji?: string;
    color?: string;
    date: string;
    groupCreated?: boolean;
}

const ToggleEntry: React.FC<ToggleEntryProps> = ({ date, journalId, journal }) => {
    const formattedDate = formatDateWithoutMonth(date);
    return (
        <Link href={`/journal/${journalId}`}>
            <article className="flex gap-8 h-6 items-center hover:bg-gray-300 list-disc w-full py-4">
                <p className="text-stone-600 text-sm ">{formattedDate}</p>

                <div className="flex basis-auto min-w-48 items-center gap-2">
                    <p className="text-md">{journal && journal.emoji}</p>
                    <p className="line-clamp-2 text-sm text-stone-700">
                        {journal && journal.title}
                    </p>
                </div>
            </article>
        </Link>
    );
};

export default ToggleEntry;