import { formatDate } from "@/utils/formatUtils";
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

const Entry: React.FC<ToggleEntryProps> = ({ date, journalId, journal }) => {
    const formattedDate = formatDate(date);

    return (
        <Link href={`/journal/${journalId}`}>
            <article className="flex gap-8 h-20 items-center">
                <div
                    className="w-16 h-16 rounded-lg basis-20 shrink-0 flexCenter"
                    style={{ backgroundColor: journal?.color }}
                >
                    <p className="text-2xl">{journal && journal.emoji}</p>
                </div>
                <div className="basis-auto min-w-48">
                    <p className="text-stone-300 font-semibold text-sm ">
                        {formattedDate}
                    </p>
                    <p className="line-clamp-2 text-sm pt-2 text-stone-700">
                        {journal && journal.title}
                    </p>
                </div>
            </article>
        </Link>
    );
};

export default Entry;