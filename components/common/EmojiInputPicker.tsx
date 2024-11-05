import React, { useState } from 'react';
import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface EmojiPickerInputProps {
    value: string;
    onChange: (emoji: string) => void;
    theme?: Theme;
}

const EmojiPickerInput: React.FC<EmojiPickerInputProps> = ({
    value,
    onChange,
    theme = 'light'
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleEmojiClick = (emojiData: EmojiClickData): void => {
        onChange(emojiData.emoji);
        setIsOpen(false);
    };

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="w-12 h-12 text-3xl rounded-full"
                    onClick={() => setIsOpen(true)}
                >
                    {value || '👻'}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[352px] p-0">
                <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    width="100%"
                    height={400}

                />
            </PopoverContent>
        </Popover>
    );
};

export default EmojiPickerInput;